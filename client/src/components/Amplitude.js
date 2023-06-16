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
  const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");

const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
};

const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
};
  const { sourceFormData,  pathFormData } = useContext(FormContext);

 

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
  const filenameSite = `site-${siteList.join("-")}-${ampsiteList.join("-")}`;
const filenameCrust = `crust-${crustList.join("-")}-${ampCrustList.join("-")}`;

  
const handleSendData = async () => {
  if (!latitude || !longitude) {
      alert("Please provide both latitude and longitude");
      return;
  }

  const siteAmp = {
      freq: siteList,
      amp: ampsiteList,
      filename: filenameSite,
      header: "Site Amplitude",
  };

  const crustalAmp = {
      freq: crustList,
      amp: ampCrustList,
      filename: filenameCrust,
      header: "Crust Amplitude",
  };

  const data = {
      path: pathFormData,
      source: sourceFormData,
      amplification: { site_amp: siteAmp, crustal_amp: crustalAmp },
      site: {coordinates: [parseFloat(latitude), parseFloat(longitude)], site_coord_flag: 2},
  };

  try {
      const response = await axios.post('http://localhost:8000/createSimulation', data);
      console.log(response.data);
  } catch (error) {
      console.error('Error:', error);
  }
};


  return (
    <Box m={4}>
      <Grid container spacing={3} direction="column">
        {/* Site Amplitude Form */}
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

        {/* Crust Amplitude Form */}
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

            {/* Site Coordinates */}
            <Grid item>
            <TextField
    label="Latitude"
    variant="outlined"
    value={latitude}
    onChange={handleLatitudeChange}
/>
<TextField
    label="Longitude"
    variant="outlined"
    value={longitude}
    onChange={handleLongitudeChange}
/>
            </Grid>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={saveData}> Save Data </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSendData}>Send Data</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Amplitude;
