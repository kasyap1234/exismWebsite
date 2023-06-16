import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        mw: '',
        stressDrop: '',
        kappa: '',
        kappaFlag: 1,
        faultEdge: '',
        angles: '',
        faultType: '',
        width: '',
        hypoAlongFault: '',
        hypoDownDip: '',
        vrupBeta: '',
        slipWeights: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8000/createSimulation', JSON.stringify(formData), {
            headers: {
              'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data);
                navigate('/Path');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            <h1>Exsim12</h1>
            <h3>A stochastic finite - fault computer program now available as a website</h3>
            <p>Enter the values in the input boxes and click on the button to calculate the result</p>
            <h2>Source</h2>
            <TextField id="outlined-basic" label="mw" variant="outlined" name="mw" value={formData.mw} onChange={handleChange} />
            <TextField id="outlined-basic" label="StressDrop" variant="outlined" name="stressDrop" value={formData.stressDrop} onChange={handleChange} />
            <TextField id="outlined-basic" label="kappa" variant="outlined" name="kappa" value={formData.kappa} onChange={handleChange} />
            <TextField id="outlined-basic" label="kappaFlag" variant="outlined" name="kappaFlag" value={formData.kappaFlag} onChange={handleChange} defaultValue="1" />
            <h2>Fault Geometry</h2>
            <TextField id="outlined-basic" label="Fault Edge" variant="outlined" name="faultEdge" value={formData.faultEdge} onChange={handleChange} />
            <TextField id="outlined-basic" label="Angles" variant="outlined" name="angles" value={formData.angles} onChange={handleChange} />
            <TextField id="outlined-basic" label="FaultType" variant="outlined" name="faultType" value={formData.faultType} onChange={handleChange} />
            <TextField id="outlined-basic" label="Width" variant="outlined" name="width" value={formData.width} onChange={handleChange} />
            <h2>Hypocenter</h2>
            <TextField id="outlined-basic" label="Hypo Along Fault" variant="outlined" name="hypoAlongFault" value={formData.hypoAlongFault} onChange={handleChange} />
            <TextField id="outlined-basic" label="Hypo Down Dip" variant="outlined" name="hypoDownDip" value={formData.hypoDownDip} onChange={handleChange} />
            <h2>Rupture</h2>
            <TextField id="outlined-basic" label="Vrup Beta" variant="outlined" name="vrupBeta" value={formData.vrupBeta} onChange={handleChange} />
            <TextField id="outlined-basic" label="Slip Weights" variant="outlined" name="slipWeights" value={formData.slipWeights} onChange={handleChange} />
            <br/>
            <Button variant="contained" onClick={handleSubmit}> Next </Button>
        </div>
    );
}

export default Home;
