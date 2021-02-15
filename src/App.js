import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Home from './Components/Home';
import Upload from './Components/Upload';
import Register from './Components/Register';
import Login from './Components/Login';
import Posts from './Components/Posts';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
import Edit from './Components/Edit';
import Usersprofile from './Components/Usersprofile';



function App() {

  return (
    <div className="">

      <Router>
        <Switch>
          <Route path="/" exact>
            <Posts />
          </Route>

          <Route path="/upload" >
            <Upload />
          </Route>

          <Route path="/register" >
            <Register />
          </Route>

          <Route path="/login" >
            <Login />
          </Route>

          {/* <Route path="/posts" >
            <Posts />
          </Route> */}

          <Route path="/profile" >
            <Profile />
          </Route>
          <Route path="/logout" >
            <Logout />
          </Route>
          <Route path="/edit" >
            <Edit />
          </Route>
          <Route path="/usersprofile" >
            <Usersprofile />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
