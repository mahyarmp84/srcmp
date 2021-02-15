import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


function Edit() {
    const [karbar, setKarbar] = useState("")
    const [posts, setPosts] = useState([])
    const [postsnum, setPostsnum] = useState("")
    const [uploaded, setUploaded] = useState("")
    let history = useHistory();

    const upload = async (f) => {
        const fm = new FormData()
        fm.append('image', f)
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
            history.push("/profile");
        }
    }

    const fetchData = async () => {
        let response = await fetch("http://story.coding-lodge.com/profile",
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: 'GET'
            },
        )

        if (response.status == 200) {
            let data = await response.json()
            setPostsnum(data.posts.length);
            setKarbar(data.user);
            setPosts(data.posts);
            console.log(data.user)

        }
    }
    useEffect(() => {
        fetchData();

    }, [])

    return (
        <div className="e-container">
            <div className="edit-cont">
                <div className="edit-pic">
                    <img className="edit-img" src={Object.values(karbar)[4]} />
                </div>
                <div className="input-group">
                    <div class="yes">
                        <span class="btn_upload">
                            <input type="file" id="imag" title="" class="input-img" onChange={(e) => upload(e.target.files[0])}/>
                            Choose Image
                        </span>
                        <img id="ImgPreview" src="" class="preview1" />
                        <input type="button" id="removeImage1" value="x" class="btn-rmv1" />
                    </div>
                </div>
                <h3 className="edit-id">NXGramer</h3>
                <div className="edit-name">
                    <div>{Object.values(karbar)[1]}</div>
                    <div>{Object.values(karbar)[2]}</div>
                </div>


            </div>

        </div>

    );

}
export default Edit;
