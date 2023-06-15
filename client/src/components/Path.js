import React from 'react'
import {TextField} from '@mui/material'

function Path() {
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
<TextField id=""
    </div>
  )
}

export default Path