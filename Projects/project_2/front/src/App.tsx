import React from 'react';
import Landing from './components/Landing';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import  Login  from './components/Login';

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Landing}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </div>
            </Router>
        )    
    }
}

export default App