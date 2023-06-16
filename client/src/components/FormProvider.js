import React, { useState } from 'react';
import { FormContext } from './FormContext';

export function FormProvider({ children }) {
  const [homeFormData, setHomeFormData] = useState({});
  const [pathFormData, setPathFormData] = useState({});
  const [amplitudeData, setAmplitudeData] = useState({});

  const storeHomeFormData = (data) => {
    setHomeFormData(data);
  };

  const storePathFormData = (data) => {
    setPathFormData(data);
  };

  const storeAmplitudeData = (data) => {
    setAmplitudeData(data);
  };

  return (
    <FormContext.Provider
      value={{
        homeFormData,
        storeHomeFormData,
        pathFormData,
        storePathFormData,
        amplitudeData,
        storeAmplitudeData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
