import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Style/Nav.css';
import Popup from "reactjs-popup";
import { FaSearch } from 'react-icons/fa';



function Nav() {
    const fetchData = async () => {
        let response = await fetch("story.coding-lodge.com/users",
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            },

        )
        console.log(response);


    }
    useEffect(() => {
        fetchData();

    }, [])
    return (
        <div className="">
            <div className="header__mpgram__mp">
                <h2 className="mp-title">𝓜𝓟 𝓖𝓻𝓪𝓶</h2>
                <Popup modal trigger={<button type="button" className="btn btn-primary btn-lg btn-mp-modal">Search</button>}>
                    <div className="modal__search__users">
                        <input className="input-group mb-3 search__input__users" placeholder="Username" />
                        <button className="search__btn__users"><FaSearch onClick={fetchData}/></button>

                    </div>
                </Popup>
                <div className="mp__header__icons">
                    <Link to="/" className="fa fa fa-home"></Link>

                    <Link className="fa fa-paper-plane-o"></Link>


                    <Link className="fa fa-heart-o"></Link>

                    <Link className="">
                        <div className="dropdown">
                            <div className="dropdown fa fa-user-circle-o" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            </div>

                            <div class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="dropdownMenuButton">
                                <Link to="/profile" className="dropdown-item" >Profile</Link>
                                <Link className="dropdown-item" to="/logout" >Log Out</Link>
                            </div>
                        </div>
                    </Link>



                </div>

            </div>



        </div>
    );
}

export default Nav;
