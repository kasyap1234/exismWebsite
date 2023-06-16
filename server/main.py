from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pyexsim12 import Source, SourceSpec, FaultGeom, Hypocenter, Rupture
from pyexsim12 import Path, TimePads, Crust, GeometricSpreading, QualityFactor, PathDuration, Amplification, simulation,Misc,Sites
import numpy as np
import matplotlib.pyplot as plt
from fastapi.responses import FileResponse
import os

app = FastAPI()
misc=Misc()
origins = [
    "http://localhost:3000",
]

slip_matrix = np.array([[0.4, 0.6, 1.2, 1.35, 1.05, 1.2, 0.8, 1.2, 1.8, 1.7, 1.3, 0.9, 0.6],
                        [0.4, 0.9, 1.3, 1.4, 2.0, 1.8, 1.1, 1.8, 2.7, 2.6, 1.9, 1.3, 0.75],
                        [0.28, 0.55, 0.9, 1.2, 1.5, 1.7, 1.2, 2.1, 2.6, 2.4, 1.8, 1.2, 0.75],
                        [0.1, 0.25, 0.6, 0.7, 1.05, 1.35, 1.5, 1.95, 2.1, 1.6, 1.05, 0.75, 0.6],
                        [0.1, 0.1, 0.3, 0.45, 0.5, 0.7, 1.0, 1.2, 1.2, 0.6, 0.3, 0.2, 0.1]])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class SourceSpecInput(BaseModel):
    mw: float
    stress_drop: float
    kappa: float
    kappa_flag: int = 1


class FaultGeomInput(BaseModel):
    fault_edge: list
    angles: list
    fault_type: str
    len_width: list


class HypocenterInput(BaseModel):
    hypo_along_fault: float
    hypo_down_dip: float
    iters: int = 1


class RuptureInput(BaseModel):
    vrup_beta: float
    slip_weights: list = slip_matrix
    risetime: int = 1
    i_slip_weight: int = 0


class SourceInput(BaseModel):
    source_spec: SourceSpecInput
    fault_geom: FaultGeomInput
    hypo: HypocenterInput
    rupture: RuptureInput


class SiteInput(BaseModel):
    coordinates: list
    site_coord_flag: int = 2


class TimePadsInput(BaseModel):
    tpad1: float
    tpad2: float
    delta_t: float


class CrustInput(BaseModel):
    beta: float
    rho: float


class GeometricSpreadingInput(BaseModel):
    n_seg: int
    spread: list


class QualityFactorInput(BaseModel):
    q_min: float
    q_zero: int
    eta: float


class PathDurationInput(BaseModel):
    n_dur: int = 1
    r_dur: float = 1.0
    dur_slope: float = 0.0


class PathInput(BaseModel):
    time_pads: TimePadsInput
    crust: CrustInput
    geometric_spreading: GeometricSpreadingInput
    quality_factor: QualityFactorInput
    path_duration: PathDurationInput


class AmpFileInput(BaseModel):
    freq: list
    amp: list
    filename: str
    header: str


class AmplificationInput(BaseModel):
    site_amp: AmpFileInput
    crustal_amp: AmpFileInput


class SimulationInput(BaseModel):
    path: PathInput
    source: SourceInput
    amplification: AmplificationInput
    site: SiteInput


@app.post("/createSimulation")
async def create_simulation(input: SimulationInput = Body(...)):

    time_pads = TimePads(**input.path.time_pads.dict())
    crust = Crust(**input.path.crust.dict())
    geometric_spreading = GeometricSpreading(**input.path.geometric_spreading.dict())
    quality_factor = QualityFactor(**input.path.quality_factor.dict())
    path_duration = PathDuration(**input.path.path_duration.dict())
    path = Path(time_pads, crust, geometric_spreading, quality_factor, path_duration)

    # Create source
    source_spec = SourceSpec(**input.source.source_spec.dict())
    fault_geom = FaultGeom(**input.source.fault_geom.dict())
    hypo = Hypocenter(**input.source.hypo.dict())
    rupture = Rupture(**input.source.rupture.dict())
    source = Source(source_spec, fault_geom, hypo, rupture)

    # Create amplification
    amplification = Amplification(
        site_amp=AmpFileInput(**input.amplification.site_amp.dict()),
        crustal_amp=AmpFileInput(**input.amplification.crustal_amp.dict())
    )
   

    # Create Site
    site = Sites(input.site.coordinates, site_coord_flag=input.site.site_coord_flag)

    # Create Simulation
    sim = simulation.Simulation(source, path, amplification, site,misc)
    sim.create_input_file(save=True)  # Create the input file for EXSIM12
    sim.run()

    # Plot the results and save as an image file
    fig = sim.plot_acc(site=1)
    fig.set_size_inches(12, 6)
    image_path = "plot.png"
    plt.savefig(image_path)
    return {
        "path": str(path),
        "source": str(source),
        "amplification": str(amplification),
        "simulation": str(sim),
        "image_path": image_path
    }


@app.get("/getPlot")
async def get_plot():
    return FileResponse("plot.png", media_type="image/png")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
