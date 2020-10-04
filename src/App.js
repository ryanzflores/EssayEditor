import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Menubar from "./components/menubar.component"
import EssaysList from "./components/essays-list.component";
import CreateEssay from "./components/create-essay.component";
import EditEssay from "./components/edit-essay.component";
import ViewEdits from "./components/view-edits.component";

function App() {
    return (
        <Router>
            <div className="container">
                <Menubar />
                <br/>
                        <Route path="/" exact component={EssaysList} />
                        <Route path="/create" component={CreateEssay} />
                        <Route path="/edit/:id" component={EditEssay} />
                        <Route path="/view/:id" component={ViewEdits} />
            </div>
        </Router>
    );
}

export default App;
