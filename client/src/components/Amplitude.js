import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function Amplitude() {
  const [siteList, setSiteList] = useState(["", "", "", "", ""]);
  const [ampsiteList, setAmpSiteList] = useState(["", "", "", "", ""]);
  const [crustList, setCrustList] = useState(["", "", "", "", "","","",""]);
  const [ampCrustList, setAmpCrustList] = useState(["", "", "", "", "","","",""]);

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

  const sendDataToServer = () => {
    axios.post('/your-endpoint', { siteList, ampsiteList, crustList, ampCrustList })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };


  return (
    <div>

        <h2> Site Amplitude</h2>
      {siteList.map((item, index) =>  (
        <TextField
          key={index}
          label={`Freq${index + 1}`}
          variant="outlined"
          value={item}
          onChange={(event) => handleChange(index, event)}
        />
      ))}
      <h3> Amp </h3> 
        {ampsiteList.map((item, index) => (
        <TextField
          key={index}
          label={`${index + 1}`}
          variant="outlined"
          value={item}
          onChange={(event) => handleAmpChange(index, event)}
        />
      ))}    
      <h2> Crust Amplitude </h2> 
      <p> Frequency </p> 
      {crustList.map((item, index) => (
        <TextField
          key={index}
          style={{width: '120px' ,margin: '10px'}}
          label={`Freq${index + 1}`}
          variant="outlined"
          value={item}
          onChange={(event) => handleCrustChange(index, event)}
        />
      ))}   
      <p> Amp </p> 
      {ampCrustList.map((item,index) =>(
        <TextField 
        key={index}
        style={{width: '120px' ,margin: '10px'}}
        label={`${index+1}`}
        variant="outlined"
        value={item}
        onChange={(event) => handleAmpCrustChange(index,event)}
        />
      ))
}


       

    </div>
  );
}

export default Amplitude;
