from fastapi import FastAPI
from pydantic import BaseModel
from pyexsim12 import Source, SourceSpec, FaultGeom, Hypocenter, Rupture
from pyexsim12 import Path, TimePads, Crust, GeometricSpreading, QualityFactor, PathDuration, Amplification, simulation
import numpy as np
import matplotlib.pyplot as plt 
from fastapi.responses import FileResponse
import os
app = FastAPI()
class SourceSpecInput(BaseModel):
    mw: float
    stress_drop: float
    kappa: float
    kappa_flag: int = 1

class FaultGeomInput(BaseModel):
    fault_edge: tuple
    angles: list
    fault_type: str
    len_width: list

class HypocenterInput(BaseModel):
    hypo_along_fault: float
    hypo_down_dip: float
    iters: int = 1

class RuptureInput(BaseModel):
    vrup_beta: float
    slip_weights: str = "slip_weights.txt"
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

@app.get("/createSimulation")
async def create_simulation(input: SimulationInput):
    
    time_pads = pyexsim12.TimePads(**input.path.time_pads.dict())
    crust = pyexsim12.Crust(**input.path.crust.dict())
    geometric_spreading = pyexsim12.GeometricSpreading(**input.path.geometric_spreading.dict())
    quality_factor = pyexsim12.QualityFactor(**input.path.quality_factor.dict())
    path_duration = pyexsim12.PathDuration(**input.path.path_duration.dict())
    path = pyexsim12.Path(time_pads, crust, geometric_spreading, quality_factor, path_duration)
     
    # Create source
    source_spec = pyexsim12.SourceSpec(**input.source.source_spec.dict())
    fault_geom = pyexsim12.FaultGeom(**input.source.fault_geom.dict())
    hypo = pyexsim12.Hypocenter(**input.source.hypo.dict())
    rupture = pyexsim12.Rupture(**input.source.rupture.dict())
    source = pyexsim12.Source(source_spec, fault_geom, hypo, rupture)
    
    # Create amplification
    simulation.create_amp(**input.amplification.site_amp.dict())
    simulation.create_amp(**input.amplification.crustal_amp.dict())
    amplification = Amplification(site_amp=input.amplification.site_amp.filename, crustal_amp=input.amplification.crustal_amp.filename)
    misc = Misc()
    sites = Sites(input.site.coordinates, site_coord_flag=input.site.site_coord_flag)

    # Create Simulation
    sim = Simulation(source, path, amplification, misc, sites)
    sim.create_input_file(save=True)  # Create the input file for EXSIM12
    sim.run()

    # Plot the results and save as an image file
    fig = sim.plot_acc(site=1)
    fig.set_size_inches(12, 6)
    image_path = "plot.png"
    plt.savefig(image_path)
    return {"path": str(path), "source": str(source), "amplification": str(amplification),"simulation": str(sim),"image_path": image_path}

@app.get("/getPlot")
async def get_plot():
    return FileResponse("plot.png", media_type="image/png")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

