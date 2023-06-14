from fastapi import FastAPI
from pydantic import BaseModel
from pyexsim12 import Source, SourceSpec, FaultGeom, Hypocenter, Rupture
from pyexsim12 import Path, TimePads, Crust, GeometricSpreading, QualityFactor, PathDuration, Amplification, simulation
import numpy as np

app = FastAPI()

class SimulationInput(BaseModel):
    path: PathInput
    source: SourceInput
    amplification: AmplificationInput

@app.post("/createSimulation")
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

    return {"path": str(path), "source": str(source), "amplification": str(amplification)}
