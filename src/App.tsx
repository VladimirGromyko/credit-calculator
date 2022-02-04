import React from 'react';
import './App.css';
import {LoanParameters} from "./containers/LoanParameters/LoanParameters";

function App() {
    return (
        <div className="container">
            <h2> Credit calculator</h2>
            <LoanParameters/>
        </div>
    );
}

export default App;
