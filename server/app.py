from fastapi import FastAPI
from pydantic import BaseModel
from pyexsim12 import Source, SourceSpec, FaultGeom, Hypocenter, Rupture
from pyexsim12 import Path, TimePads, Crust, GeometricSpreading, QualityFactor, PathDuration,Amplification,simulation
import numpy as np

app = FastAPI()
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

@app.post("/createPath")
async def create_path(input: PathInput):
    time_pads = pyexsim12.TimePads(**input.time_pads.dict())
    crust = pyexsim12.Crust(**input.crust.dict())
    geometric_spreading = pyexsim12.GeometricSpreading(**input.geometric_spreading.dict())
    quality_factor = pyexsim12.QualityFactor(**input.quality_factor.dict())
    path_duration = pyexsim12.PathDuration(**input.path_duration.dict())
    path = pyexsim12.Path(time_pads, crust, geometric_spreading, quality_factor, path_duration)
    return {"path": str(path)}

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

@app.post("/createSource")
async def create_source(input: SourceInput):
    source_spec = pyexsim12.SourceSpec(**input.source_spec.dict())
    fault_geom = pyexsim12.FaultGeom(**input.fault_geom.dict())
    hypo = pyexsim12.Hypocenter(**input.hypo.dict())
    rupture = pyexsim12.Rupture(**input.rupture.dict())
    source = pyexsim12.Source(source_spec, fault_geom, hypo, rupture)
    return {"source": str(source)}
class AmpFileInput(BaseModel):
    freq: list
    amp: list
    filename: str
    header: str

class AmplificationInput(BaseModel):
    site_amp: AmpFileInput
    crustal_amp: AmpFileInput

@app.post("/createAmplification")
async def create_amplification(input: AmplificationInput):
    simulation.create_amp(**input.site_amp.dict())
    simulation.create_amp(**input.crustal_amp.dict())
    amplification = Amplification(site_amp=input.site_amp.filename, crustal_amp=input.crustal_amp.filename)
    return {"amplification": str(amplification)}
