# exismWebsite
This project uses Fast Api as a backend and React js as a frontend.

Assuming pyexsim12 files were complete

### `POST /createSimulation`
- Description: Creates a simulation based on the provided input parameters.
- Request Body:
  - `SimulationInput`: Input parameters for creating the simulation.
- Response:
  - JSON object containing information about the created simulation:
    - `path`: String representation of the `Path` object.
    - `source`: String representation of the `Source` object.
    - `amplification`: String representation of the `Amplification` object.
    - `simulation`: String representation of the created `Simulation` object.

### `POST /amplitude`
- Description: Creates an amplification object based on the provided input parameters.
- Request Body:
  - `AmplificationInput`: Input parameters for creating the amplification object.
- Response:
  - JSON object containing information about the created `Amplification` object:
    - `amplification`: String representation of the created `Amplification` object.

### `POST /qfactor`
- Description: Creates a quality factor object based on the provided input parameters.
- Request Body:
  - `QualityFactorInput`: Input parameters for creating the quality factor object.
- Response:
  - JSON object containing information about the created `QualityFactor` object:
    - `quality_factor`: String representation of the created `QualityFactor` object.

### `GET /runSimulation`
- Description: Runs the simulation created using the `/createSimulation` endpoint.
- Response:
  - JSON object containing the image file path of the generated plot:
    - `image_path`: String representing the path to the generated plot image file.

### `GET /getPlot`
- Description: Retrieves the generated plot image file.
- Response:
  - The plot image file in the response body.

