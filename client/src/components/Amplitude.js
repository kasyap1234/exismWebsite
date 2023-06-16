import React, { useState ,useContext} from 'react';
import { TextField, Button,Grid,Box} from '@mui/material';
import axios from 'axios';
import { FormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';


function Amplitude() {
  const { storeAmplitudeData } = useContext(FormContext);
  const [siteList, setSiteList] = useState(["", "", "", "", ""]);
  const [ampsiteList, setAmpSiteList] = useState(["", "", "", "", ""]);
  const [crustList, setCrustList] = useState(["", "", "", "", "","","",""]);
  const [ampCrustList, setAmpCrustList] = useState(["", "", "", "", "","","",""]);
  const { sourceFormData, faultFormData, pathFormData } = useContext(FormContext);
  const handleAmpChange = (index, event) => {
    let newList = [...ampsiteList];
    newList[index] = event.target.value;
    setAmpSiteList(newList);
  };

  const handleCrustChange = (index, event) => {
    let newList = [...crustList];
    newList[index] = event.target.value;
    setCrustList(newList);
  };

  const handleAmpCrustChange = (index, event) => {
    let newList = [...ampCrustList];
    newList[index] = event.target.value;
    setAmpCrustList(newList);
  };

  const handleChange = (index, event) => {
    let newList = [...siteList];
    newList[index] = event.target.value;
    setSiteList(newList);
  };

  const saveData = () => {
    const ampData={ siteList, ampsiteList, crustList, ampCrustList }
    storeAmplitudeData(ampData);
     console.log(ampData); 

  };
  
    
  const handleSendData = async () => {
      const data = {
          source: sourceFormData,
          fault: faultFormData,
          path: pathFormData,
         
      };
      
      try {
          const response = await axios.post('http://localhost:8000/createSimulation', data);

          console.log(response.data);
      } catch (error) {
          console.error('Error:', error);
      }
  };


  return (
    <div>
 <Box m={4}>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <h2>Site Amplitude</h2>
          <Grid container spacing={2}>
            {siteList.map((item, index) => (
              <Grid item key={index}>
                <TextField
                  label={`Freq${index + 1}`}
                  variant="outlined"
                  value={item}
                  onChange={(event) => handleChange(index, event)}
                />
              </Grid>
            ))}
          </Grid>
          <h3>Amp</h3>
          <Grid container spacing={2}>
            {ampsiteList.map((item, index) => (
              <Grid item key={index}>
                <TextField
                  label={`${index + 1}`}
                  variant="outlined"
                  value={item}
                  onChange={(event) => handleAmpChange(index, event)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item>
          <h2>Crust Amplitude</h2>
          <p>Frequency</p>
          <Grid container spacing={2}>
            {crustList.map((item, index) => (
              <Grid item key={index}>
                <TextField
                  label={`Freq${index + 1}`}
                  variant="outlined"
                  value={item}
                  onChange={(event) => handleCrustChange(index, event)}
                />
              </Grid>
            ))}
          </Grid>
          <p>Amp</p>
          <Grid container spacing={2}>
            {ampCrustList.map((item, index) => (
              <Grid item key={index}>
                <TextField
                  label={`${index + 1}`}
                  variant="outlined"
                  value={item}
                  onChange={(event) => handleAmpCrustChange(index, event)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item>
          <Button variant="contained" onClick={handleSendData}>Send Data</Button>
        </Grid>
      </Grid>
    </Box>
       

    </div>
  );
}

export default Amplitude;
