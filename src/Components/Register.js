import React, { useState, useEffect } from 'react';
import './Style/Register.css';
import { Link } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router-dom';


function Register(props) {

    const [email, setEmail] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [password, setPassword] = useState("")
    const [okregister, setOkregister] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailalredy, setEmailalredy] = useState("")
    // const [pageloading, setPageloading] = useState(true)
    let history = useHistory();

    useEffect(() => {
        let token = localStorage.getItem('token')
      }, [])
    const handleRegister = async () => {

        let obj = { "email": email, "first_name": first_name, "last_name": last_name, "password": password }
        console.log(obj)
        setLoading(true)

        let response = await fetch("http://story.coding-lodge.com/register", {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)

        })


        if (response.status === 200) {
            let data = await response.json()
            localStorage.setItem("token", data.token)
            history.push("/");
        }
        else {
        }
        setLoading(false)
        // setPageloading(false)
        
        if (response.status === 422) {
            alert("Email has alredy used")
        }
        else {

        }
    }


    return (
        <div>

            <div className="header__register">
                {/* {
                    pageloading && <div className="loader">Loading...</div>
                } */}

                {
                    okregister !== "" && <div>{okregister}</div>
                }



                <div>
                    <div className="container__mpgram">
                        <label><b>First Name</b></label>
                        <input type="text" placeholder="Enter First Name" required value={first_name} onChange={(e) => { setFirst_name(e.target.value) }} />

                        <label><b>Last Name</b></label>
                        <input type="text" placeholder="Enter Last Name" required value={last_name} onChange={(e) => { setLast_name(e.target.value) }} />

                        <label><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        {emailalredy && <div className="">Email has alredy used</div>}
                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />

                        <label><b>R Password</b></label>
                        <input type="password" placeholder="Enter R Password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />

                        <button type="submit" onClick={handleRegister}>
                            Register
                            {loading && <div className="loader mp__register__sppiner"></div>}

                        </button>

                        <Link to="/login">You Have Account?</Link>

                    </div>

                    <div className="container">
                        <Link to="/" type="button" className="cancelbtn noun__link__color">Cancel</Link>
                        <span className="psw">Forgot <a href="#">password?</a></span>
                    </div>

                </div>


            </div>
        </div>
    );
}
export default Register;


