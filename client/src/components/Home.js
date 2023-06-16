import React from 'react'
import { TextField,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate=useNavigate(); 
    const next=()=>{
        navigate('/Path');
    }
    return (
        <div>
            <h1>Exism12</h1>
            <h3> A stochastic finite - fault computer program now available as a website </h3>
            <p> Enter the values in the input boxes and click on the button to calculate the result </p>
            <h2>Source</h2>
            <TextField id="outlined-basic" label="mw" variant="outlined" />
            <TextField id="outlined-basic" label="StressDrop" variant="outlined" />
            <TextField id="outlined-basic" label="kappa" variant="outlined" />
            <TextField id="outlined-basic" label="kappaFlag" variant="outlined" defaultValue="1" />
            {/* source_spec - SourceSpec(mw, stress_drop, kappa, kappa_flag)
fault_geom - FaultGeom(fault_edge, angles, fault_type, len_width)
hypo - Hypocenter(hypo_along_fault, hypo_down_dip)
rupture - Rupture(vrup_beta, slip_weights) */}
            <h2> Fault Geometry </h2>
            <TextField id="outlined-basic" label="Fault Edge" variant="outlined" />
            <TextField id="outlined-basic" label="Angles" variant="outlined" />
            <TextField id="outlined-basic" label="FaultType" variant="outlined" />
            <TextField id="outlined-basic" label="Width" variant="outlined" />
            <h2> Hypocenter </h2>
            <TextField id="outlined-basic" label="Hypo Along Fault" variant="outlined" />
            <TextField id="outlined-basic" label="Hypo Down Dip" variant="outlined" />
            <h2> Rupture </h2>
            <TextField id="outlined-basic" label="Vrup Beta" variant="outlined" />
            <TextField id="outlined-basic" label="Slip Weights" variant="outlined" />
            <br/> 
            <Button variant="contained" onClick={next}> Next </Button>


        </div>
    )
}

export default Home