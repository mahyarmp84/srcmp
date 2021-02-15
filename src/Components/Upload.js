import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Style/Upload.css';
import Nav from './Nav';

function CreateStory(props) {

    const [body, setBody] = useState("")
    const [uploaded, setUploaded] = useState("")
    const [loading, setLoading] = useState(false)
    const [okpost, setOkpost] = useState("")
    const [error, setError] = useState(false)
    const [dis, setDis] = useState(true)
    const [errors, setErrors] = useState("")
    let history = useHistory();

    const upload = async (f) => {
        const fm = new FormData()
        fm.append('image', f)
        setLoading(true)
        let response = await fetch("http://story.coding-lodge.com/upload", {
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
            setUploaded(data.image)
            setDis(false)

        }
        setLoading(false)
    }

    const save = async () => {
        if (body !== "") {
            console.log(uploaded)
            if (uploaded == "") {

                setError(false)
            }
            else {
                var obj = { body: body, image: uploaded }
                setLoading(true)
                let response = await fetch("http://story.coding-lodge.com/posts", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    method: "POST",
                    body: JSON.stringify(obj)

                })
                if (response.status === 201) {
                    setLoading(false)
                    // redirect to stories
                    history.push("/");
                }
            }
        }
        else {
            setError(true);
            setErrors("Discription can't be Empty")

        }


    }
    return (
        <div className="Posts">
            <Nav />

            

            <div className="mpgram__pedar upload__mpgram__css">

                {error && <div className="alert alert-danger">
                    {
                        errors
                    }
                </div>}
                {
                    okpost !== "" && <div>{okpost}</div>
                }


                <div className="input-group mb-3">
                    <input onInput={(e) => {
                        if (body !== "" && e.target.files.length > uploaded) {
                            document.getElementById("inputGroupFileAddon04").disabled = false
                        }
                        else {
                            document.getElementById("inputGroupFileAddon04").disabled = true
                        }
                    }} type="file" className="form-control" id="inputGroupFile01" onChange={(e) => upload(e.target.files[0])} />
                </div>


                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Discription</span>
                    </div>
                    <textarea onInput={(e) => {
                        if (body !== "" && document.querySelector('.form-control').files.length > uploaded) {
                            document.getElementById("inputGroupFileAddon04").disabled = false
                        }
                        else {
                            document.getElementById("inputGroupFileAddon04").disabled = true
                        }
                    }} maxLength={300} className="form-control" type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                {loading && <span className="spinner-border text-info"></span>}
                {uploaded !== "" && <img className="img-css-mp" src={"http://story.coding-lodge.com" + uploaded} />}
                <div className="input-group-append">
                    <button disabled={dis} className="btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={save}>Post</button>
                </div>
            </div>
        </div>

    );
}

export default CreateStory;
