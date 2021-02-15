import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Popup from "reactjs-popup";


import Nav from './Nav'
import './Style/Profile.css'
function Profile() {
    const [profile, setProfile] = useState("")
    const [post, setPost] = useState("")
    const [posts, setPosts] = useState([])
    const [uploadedavatar, setUploadedavatar] = useState("")
    const [loading, setLoading] = useState(false)
    let history = useHistory();

    const upload = async (f) => {
        
        const fm = new FormData()
        fm.append('image', f)
        setLoading(true)
        let response = await fetch("http://story.coding-lodge.com/avatar", {
            header: {
                'Content-type': 'multipart/form-data',
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            method: "POST",
            body: fm
        })

        if (response.status === 201) {
            let data = await response.json();
            setUploadedavatar(data.image)
            history.push("/");

        }
        setLoading(false)
    }
    let header = async () => {
        let response = await fetch("http://story.coding-lodge.com/profile",
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            })
        if (response.ok) {
            let data = await response.json()
            setProfile(data.user)
            setPost(data.posts)
            setPosts(data.posts);
            console.log(data);

        }
    }
    useEffect(() => {
        header()

    }, [])

    return (
        <div>
            <Nav />
             <header>
                <div className="container mp__header__mp">
                    <div className="profile">
                        <div className="profile-image">
                            <Popup modal trigger={<img className="profile__modal__img" src={Object.values(profile)[4]} />}>
                            <input className='profile__modal__img'  type='file' onChange={(e) => upload(e.target.files[0])} />
                            {loading && <span className="spinner-border text-info"></span>}
                            {uploadedavatar !== "" && <img className="img-css-mp" src={"http://story.coding-lodge.com" + uploadedavatar} />}

                            </Popup>
                            

                        </div>

                        <div className="profile-user-settings ">

                            <h1 className="profile-user-name ">{Object.values(profile)[1] + ' ' + Object.values(profile)[2]}</h1>

                            <button className="btn profile-edit-btn ">Edit Profile</button>

                        </div>

                        <div className="profile-stats ">

                            <ul className="gallery-item-likes-mp ">
                                <li><span className="profile-stat-count ">{post.length}</span> posts</li>
                                <li><span className="profile-stat-count ">18m</span> followers</li>
                                <li><span className="profile-stat-count ">6</span> following</li>
                            </ul>

                        </div>

                        <div className="profile-bio mppm">

                            <p><span className="profile-real-name mppm">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p>

                        </div>

                    </div>

                </div>

            </header>
            {
                posts.map((item, index) => {
                    return (
                        <div className="profile__myposts" >
                            <div className="gallery-item" tabindex="0">
                                <img src={item.image} className="gallery-image" />
                                <div className="gallery-item-info">
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fa fa-heart" aria-hidden="true"></i> 56</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fa fa-comment" aria-hidden="true"></i> 2</li>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Profile;