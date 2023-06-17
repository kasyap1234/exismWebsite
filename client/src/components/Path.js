import React, { useState ,useContext} from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';
function Path() {
    const navigate = useNavigate();
    const { storePathFormData } = useContext(FormContext);
    const [formValues, setFormValues] = useState({
        tpad1: '',
        tpad2: '',
        delta_t: '',
        beta: '',
        rho: '',
        n_seg: '',
        q_min: '0.0',
        q_zero: '88',
        eta: '0.9',
        spread: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const splitName = name.split('-');

        if (splitName[0] === 'spread') {
            const spreadValues = [...formValues.spread];
            spreadValues[splitName[1]][splitName[2]] = value;
            setFormValues({ ...formValues, spread: spreadValues });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleAddSpread = () => {
        setFormValues(prevValues => ({
            ...prevValues,
            spread: [...prevValues.spread, { x: '', y: '' }]
        }));
    };

    const handleDeleteSpread = (indexToDelete) => {
        setFormValues(prevValues => ({
            ...prevValues,
            spread: prevValues.spread.filter((s, index) => index !== indexToDelete)
        }));
    };

    const handleNext = () => {
        storePathFormData(formValues);
        navigate('/Amplitude');
    };

    return (
        <div style={{textAlign: 'center'}}>
            <h2> Time Pads </h2>
            <Box marginBottom={2}>
                <TextField name="tpad1" value={formValues.tpad1} onChange={handleInputChange} id="outlined-basic" label="tpad1" variant="outlined" />
            </Box>
            <Box marginBottom={2}>
                <TextField name="tpad2" value={formValues.tpad2} onChange={handleInputChange} id="outlined-basic" label="tpad2" variant="outlined" />
            </Box>
            <Box marginBottom={2}>
                <TextField name="delta_t" value={formValues.delta_t} onChange={handleInputChange} id="outlined-basic" label="delta_t" variant="outlined" />
            </Box>

            <h2> Crust </h2>
            <Box marginBottom={2}>
                <TextField name="beta" value={formValues.beta} onChange={handleInputChange} id="outlined-basic" label="beta" variant="outlined" />
            </Box>
            <Box marginBottom={2}>
                <TextField name="rho" value={formValues.rho} onChange={handleInputChange} id="outlined-basic" label="rho" variant="outlined" />
            </Box>

            <h2> Geometric Spreading </h2>
            <Box marginBottom={2}>
                <TextField name="n_seg" value={formValues.n_seg} onChange={handleInputChange} id="outlined-basic" label="n_seg" variant="outlined" />
            </Box>
            {formValues.spread.map((item, index) => (
                <Box marginBottom={2}>
                    <TextField name={`spread-${index}-x`} value={item.x} onChange={handleInputChange} id={`outlined-basic-${index}-x`} label={`spread ${index + 1} x`} variant="outlined" />
                    <TextField name={`spread-${index}-y`} value={item.y} onChange={handleInputChange} id={`outlined-basic-${index}-y`} label={`spread ${index + 1} y`} variant="outlined" />
                    <Button onClick={() => handleDeleteSpread(index)}>Delete Spread</Button>
                </Box>
            ))}
            <Button onClick={handleAddSpread}>Add Spread</Button>

            <h2> Quality Factor </h2>
            <Box marginBottom={2}>
                <TextField name="q_min" value={formValues.q_min} onChange={handleInputChange} id="outlined-basic" label="q_min" variant="outlined" />
            </Box>
            <Box marginBottom={2}>
                <TextField name="q_zero" value={formValues.q_zero} onChange={handleInputChange} id="outlined-basic" label="q_zero" variant="outlined" />
            </Box>
            <Box marginBottom={2}>
                <TextField name="eta" value={formValues.eta} onChange={handleInputChange} id="outlined-basic" label="eta" variant="outlined" />
            </Box>

            <Button variant="contained" onClick={handleNext}>Next</Button>
        </div>
    )
}

export default Path;


