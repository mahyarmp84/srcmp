import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import './Style/Login.css';
import { Link } from "react-router-dom";
import login__avatar from './Img/img_avatar2.png'

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  let history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem('token')
  }, [])
  const login = async (props) => {
    let body = { email: email, password: password };
    setLoading(true)

    let response = await fetch("http://story.coding-lodge.com/login",
      {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body)
      },
    )
    if (response.status === 401) {
      alert("Email OR Password is Wrong")
    }
    if (response.status === 200) {
      let data = await response.json();
      localStorage.setItem("token", data.token)
      history.push("/");
    }
    else {
      setError(alert("Wrong Credentials"))

    }
    setLoading(false)
   
   

  }

  return (

    <div className="header__login">

      <div>
        <div className="container">
          <div className="imgcontainer">
            <img src={login__avatar} alt="Avatar" className="avatar" />
          </div>
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Email" name="uname" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button className="loginhide" onClick={login} type="submit">Login
          {loading && <div className="loader mp__register__sppiner"></div>}
            {
              error !== "" && <div>{error}</div>
            }
          </button>
          <Link to="/register">You Dont Have Account?</Link>
        </div>
        <div className="container">
          <Link to="/" type="button" className="cancelbtn">Cancel</Link>
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div>
      </div>
    </div>
  );
}

export default Login;