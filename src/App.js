import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";


import Forms from "./components/forms.component";
import Summary from "./components/summary.component";

function App() {
  return (
      <Router>
          <div className="main">
              <div className="container main-container">
                  <Route path="/" exact component={Forms} />
                  <Route path="/summary" component={Summary} />
              </div>
          </div>
      </Router>
  );
}

export default App;
