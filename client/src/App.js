import logo from './logo.svg';
import './App.css';
import RoutesPath from './components/RoutesPath'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
     
     <RoutesPath /> 
     
    </div>
  );
}

export default App;
