import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProjectList from './components/ProjectList';
import Employees from './components/Employees';
import ProjectDetails from './components/ProjectDetails';
import AddProject from './components/AddProject';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Clients from './components/Clients';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Header />
            <Register />
          </Route>
          <Route path='/projects'>
            <Header />
            <ProjectList />
          </Route>
          <Route path='/employees'>
            <Header />
            <Employees />
          </Route>
          <Route path='/clients'>
            <Header />
            <Clients />
          </Route>
          <Route path='/projectdetails/:project_id'>
            <Header />
            <ProjectDetails />
          </Route>
          <Route path='/newproject'>
            <Header />
            <AddProject />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
