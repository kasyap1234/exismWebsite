import React, { useState, useContext } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { FormContext } from './FormContext';

function Home() {
  const navigate = useNavigate();
  const { storeHomeFormData } = useContext(FormContext);

  const [formData, setFormData] = useState({
    mw: '',
    stressDrop: '',
    kappa: '',
    kappaFlag: '1',
    faultEdge: '',
    angles: '',
    faultType: '',
    width: '',
    hypoAlongFault: '',
    hypoDownDip: '',
    vrupBeta: '',
    slipWeights: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const parsedFormData = {
      ...formData,
      faultEdge: formData.faultEdge.split(',').map((value) => value.trim()),
      angles: formData.angles.split(',').map((value) => value.trim()),
      width: formData.width.split(',').map((value) => value.trim()),
    };

    storeHomeFormData(parsedFormData);
    console.log(parsedFormData);

    navigate('/Path');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Exsim12</h1>
      <h3>A stochastic finite-fault computer program now available as a website</h3>
      <p>Enter the values in the input boxes and click on the button to calculate the result</p>
      <h2>Source</h2>
      <TextField
        id="mw"
        label="mw"
        variant="outlined"
        name="mw"
        value={formData.mw}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="stressDrop"
        label="StressDrop"
        variant="outlined"
        name="stressDrop"
        value={formData.stressDrop}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="kappa"
        label="kappa"
        variant="outlined"
        name="kappa"
        value={formData.kappa}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="kappaFlag"
        label="kappaFlag"
        variant="outlined"
        name="kappaFlag"
        value={formData.kappaFlag}
        onChange={handleChange}
        defaultValue="1"
        style={{ marginBottom: '10px' }}
      />
      <h2>Fault Geometry</h2>
      <TextField
        id="faultEdge"
        label="Fault Edge (Enter two comma-separated values)"
        variant="outlined"
        name="faultEdge"
        value={formData.faultEdge}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="angles"
        label="Angles (Enter comma-separated values)"
        variant="outlined"
        name="angles"
        value={formData.angles}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="faultType"
        label="FaultType"
        variant="outlined"
        name="faultType"
        value={formData.faultType}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="width"
        label="Width (Enter comma-separated values)"
        variant="outlined"
        name="width"
        value={formData.width}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <h2>Hypocenter</h2>
      <TextField
        id="hypoAlongFault"
        label="Hypo Along Fault"
        variant="outlined"
        name="hypoAlongFault"
        value={formData.hypoAlongFault}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="hypoDownDip"
        label="Hypo Down Dip"
        variant="outlined"
        name="hypoDownDip"
        value={formData.hypoDownDip}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <h2>Rupture</h2>
      <TextField
        id="vrupBeta"
        label="Vrup Beta"
        variant="outlined"
        name="vrupBeta"
        value={formData.vrupBeta}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <TextField
        id="slipWeights"
        label="Slip Weights"
        variant="outlined"
        name="slipWeights"
        value={formData.slipWeights}
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      <br />
      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Next
      </Button>
    </div>
  );
}

export default Home;


 