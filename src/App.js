import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {Main} from "./container/main";
import Switch from "react-bootstrap/Switch";

function App() {
    return (
        <Router>
            <div className="App">
                    <Route path='/:path?' component={Main}/>
            </div>
        </Router>
);
}

export default App;
