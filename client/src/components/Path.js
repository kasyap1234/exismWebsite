import React from 'react'
import {TextField,Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'


function Path() {
    const navigate=useNavigate(); 
    const handleNext=()=>{
        navigate('/Amplitude'); 
        }


  return (
    <div>
<h2> Time Pads </h2> 
<TextField id="outlined-basic" label="tpad1" variant="outlined" />
<TextField id="outlined-basic" label="tpad2" variant="outlined" />
<TextField id="outlined-basic" label="delta_t" variant="outlined" /> 
<h2> Crust </h2> 
<TextField id="outlined-basic" label="beta" variant="outlined" /> 
<TextField id="outlined-basic" label="rho" variant="outlined" />
<h2> Geometric Spreading </h2> 
<TextField id="outlined-basic" label="n_seg" variant="outlined" />
<h2> Quality Factor </h2> 
<TextField id="outlined-basic" label="q_min" variant="outlined" defaultValue="0.0"/> 
<TextField id="outlined-basic" label="q_zero" variant="outlined" defaultValue="88"/>
<TextField id="outlined-basic" label="eta" variant="outlined" defaultValue="0.9"/>

<Button variant="contained" onClick={handleNext}>Next </Button>

    </div>
  )
}

export default Path