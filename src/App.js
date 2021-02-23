import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {Main} from "./container/main";

function App() {
    return (
        <Router>
            <div className="App">
                <Route path='/:path?/:subcategory?' component={Main}/>
            </div>
        </Router>
    );
}

export default App;
