# exismWebsite
## Ground Level Simulation Readme

This readme file provides an overview of the ground level simulation code and its different components. The code is written in Python and requires the following libraries to be imported:

- `pyexsim12` for simulation code
- `matplotlib` for graph plotting
- `numpy` for mathematical calculations on inputs in array format

### Objects for Simulation

1. Source Object:
   - `source_spec` – SourceSpec(mw, stress_drop, kappa, kappa_flag)
     - `mw`: Moment unit, representing the magnitude or energy released by an earthquake.
     - `stress_drop`: The stress difference across the fault before and after the earthquake, indicating the energy release.
     - `kappa`: Measure of the radiation gradient of a seismic source.
     - `kappa_flag`: Binary flag indicating if kappa has been calculated or fixed in the seismic source model.

   - `fault_geom` – FaultGeom(fault_background, front, fault_type, path_width)
     - `fault_background`: Specifies the fault surface boundary.
     - `front`: Orientation or inclination of the fault plane with respect to the reference frame.
     - `fault_type`: Classification of the fault based on its motion deformation pattern.
     - `path_width`: Dimensions of the fault plane, specifying the length and width.

   - `hypo_hypocenter` – HypoHypocenter(hypo_along_fault, hypo_down_dip)
     - `hypo_along_fault`: Distance or location on the fault plane where the hypocenter is located.
     - `hypo_down_dip`: Depth of the hypocenter below the surface measured perpendicular to the fault plane.

   - `rupture` – Rupture(vrup_beta, slip_weights)
     - `vrup_beta`: Rupture velocity or earthquake propagation velocity.
     - `slip_weights`: Slip distribution on the fault as it ruptures.

2. Path Object:
   - `time_pads` – TimePads(tpad1, tpad2, delta_t)
     - `tpad1`: Padding time before the seismic wave.
     - `tpad2`: Duration of padding after the seismic wave.
     - `delta_t`: Time step of the seismic wave data.

   - `crust` – Crust(beta, rho)
     - `beta`: Compression wave velocity of the crust.
     - `rho`: Shell thickness representing how far the seismic wave has penetrated the surface.

   - `geometric_spreading` – GeometricSpreading(n_seg, spread)
     - `n_seg`: Number of segments considered when modeling the wave propagation path.
     - `spread`: Geometric velocity factor determining how seismic waves decrease in amplitude as they propagate.

   - `quality_factor` – QualityFactor(q_min, q_zero, eta)
     - `q_min`: Minimum value of the quality factor, representing the attenuation or strength experienced by seismic waves.
     - `q_zero`: Quality factor at the reference frequency or reference condition.
     - `eta`: Parameter associated with frequency dependence.

   - `path_duration` – PathDuration(n_dur, r_dur, dur_slope)
     - `n_dur`: Number of times or segments analyzed for the expansion process.
     - `r_dur`: Time reference used as a model for comparing time variation.
     - `dur_slope`: Slope or change over time along the path.

3. Amplification Object:
   - `amp_file_input` for `site_amp` (freq, amp, filename, header)
     - `freq`: Frequency values used to measure site amplification data.
     - `amp`: Amplitudes or amplification factors associated with each frequency value.
     - `filename`: Name of the file from which

 site amplification data is read.
     - `header`: Boolean indicating if the file contains a header or metadata.

   - `amp_file_input` for `crustal_amp` (freq, amp, filename, header)
     - `freq`: Frequency values used to measure crustal amplification data.
     - `amp`: Amplitudes or amplification factors associated with each frequency value.
     - `filename`: Name of the file from which crustal amplification data is read.
     - `header`: Boolean indicating if the file contains a header or metadata.

   - `site_input` (coordinates, site_coord_flag)
     - `coordinates`: Latitude, longitude, and elevation information for the location.
     - `site_coord_flag`: Pointer to the format of the given coordinates.

4. Misc Object:
   - No input arguments required. Default settings are used.

5. Sites Object:
   - `sites` along with `misc` object.
   - Only one site's coordinates are provided to this object.

Note: Each object represents a different component of the ground level simulation, allowing for the customization of various parameters and characteristics related to seismic events.

Please refer to the simulation code and the respective documentation for detailed usage instructions and examples.
