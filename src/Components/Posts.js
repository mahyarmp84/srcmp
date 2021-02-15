
import React from 'react'
import { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Nav from './Nav';
import { BiLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { GrSave } from 'react-icons/gr';
import { Link } from "react-router-dom";


import './Style/Home.css';


function Posts() {
    const [post, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory();

    const fetchData = async () => {
        let response = await fetch("http://story.coding-lodge.com/posts",
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            },

        )
        console.log(response);
        if (response.status == 200) {
            let data = await response.json()
            console.log(data);
            setPosts(data);
            setLoading(false)
        }
        else if (response.status == 401) {
            history.push("/login");
        }

    }

    useEffect(() => {
        fetchData();

    }, [])

    return (

        <div className="">
            <Nav />
            <div className="mpgram__pedar">
                <Link to="/upload"><img className="create__new__posts" src="https://img.icons8.com/nolan/64/create.png" /></Link>
                {
                    post.map((item, index) => {

                        return (
                            <div className="border-mp-pedar" key={index}>
                                <div className="profile-home-mp">
                                    <div className="profile__image">
                                        <img src={item.user.avatar} />
                                    </div>
                                    <div className="profile__name">
                                        {item.user.first_name}
                                    </div>
                                </div>
                                {loading && <div className="spinner-border">loading </div>}
                                <div className="posts__item">
                                    <img className="card-img-top posts__image" src={item.image} />
                                    <div className="posts__items__action">
                                        <div className="posts__item__action">
                                            <BiLike size={"3rem"} />
                                            <FaRegComment size={"3rem"} />
                                            <FiSend size={"3rem"} />
                                            <span className="action__save">
                                                <GrSave size={"3rem"} />
                                            </span>
                                        </div>
                                    </div>
                                    <h3><span className="posts__body">{item.body}</span></h3>
                                </div>


                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Posts;
