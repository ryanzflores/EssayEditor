import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Menubar from "./components/menubar.component"
import EssaysList from "./components/essays-list.component";
import UpdateEssay from "./components/update-essay.component";
import CreateEssay from "./components/create-essay.component";
import CreateUser from "./components/create-user.component";

function App() {
    return (
        <Router>
            <div className="container">
                <Menubar />
                <br/>
                        <Route path="/" exact component={EssaysList} />
                        <Route path="/edit/:id" component={UpdateEssay} />
                        <Route path="/create" component={CreateEssay} />
                        <Route path="/user" component={CreateUser} />

            </div>
        </Router>
    );
}

export default App;
