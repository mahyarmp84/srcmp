import React from 'react'
import { useState, useEffect } from 'react';

import { BiLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { GrSave } from 'react-icons/gr';
import { FiSend } from 'react-icons/fi';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


import './Style/Home.css'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState("")
  const [uploaded, setUploaded] = useState("")
  const [okpost, setOkpost] = useState("")
  const [error, setError] = useState(false)
  const [errors, setErrors] = useState("")


  const fetchData = async () => {
    let response = await fetch("https://cors-anywhere.herokuapp.com/story.coding-lodge.com/stories")
    let data = await response.json()
    console.log(data);
    console.log(response);
    setPosts(data);
    setLoading(false)

  }

  useEffect(() => {
    fetchData();

  }, [])
  return (
    <div className="mpgram__pedar">
      {loading && <div className="spinner-grow" role="status"> </div>}
      <div className="posts__items">
        <Popup modal trigger={<div type="button" className="fa fa-plus-square"></div>}>
          {
            function CreateStory() {
              const upload = async (f) => {
                const fm = new FormData()
                fm.append('image', f)
                setLoading(true)
                let response = await fetch("http://story.coding-lodge.com/upload", {
                  header: {
                    'Content-type': 'multipart/form-data'
                  },
                  method: "POST",
                  body: fm
                })

                if (response.status === 201) {
                  let data = await response.json();
                  setUploaded(data.image)

                }

                setLoading(false)

              }
              const save = async () => {
                setError(true);
                setErrors("title can not be empty")
                let obj = { body: body, image: uploaded }
                setLoading(true)
                let response = await fetch("http://story.coding-lodge.com/stories", {
                  headers: {
                    'Content-Type': 'application/json',

                  },
                  method: "POST",
                  body: JSON.stringify(obj)
                })

                if (response.status === 201) {
                  setLoading(false)
                  // redirect to stories

                  setOkpost(alert("Post Compeleted"))
                }
                

              }
              return (
                <div className="Posts">
                  {error && <div class="alert alert-danger">
                    {
                      errors
                    }
                  </div>}
                  {
                    okpost !== "" && <div>{okpost}</div>
                  }
                  <div className="input-group">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={(e) => upload(e.target.files[0])} />
                      <label className="custom-file-label" for="inputGroupFile04">Choose file</label>

                    </div>

                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={save}>Post</button>
                    </div>


                  </div>


                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">Discription</span>
                    </div>
                    <input event="onInput" maxLength="300" type="text" className="form-control input-mp" onChange={(e) => setBody(e.target.value)} />
                  </div>
                  {loading && <span className="spinner-border text-info"></span>}
                  {uploaded !== "" && <img className="img-css-mp" src={uploaded} />}
                </div>
              );
            }
          }
        </Popup>
        {
          posts.map((item, index) => {
            return (

              <div className="posts__item" key={index}>
                <div className="profile-home-mp">
                  <div className="profile__image">
                    <img src={item.image} />
                  </div>
                  <div className="profile__name">{item.id}</div>
                </div>
                <div className="posts__image">
                  <img src={item.image} />
                </div>
                <div className="posts__icon__status">

                </div>
                <div className="posts__action">
                  <div className="posts__items__action">
                    <div className="posts__item__action">
                      <BiLike size={"1.6rem"} />
                      <FaRegComment size={"1.6rem"} />
                      <FiSend size={"1.6rem"} />
                    </div>
                    <div className="posts__send">
                      <GrSave size={"1.6rem"} />

                    </div>
                  </div>

                </div>
                <div className="posts__body">
                  {item.body}
                </div>
              </div>
            )

          })

        }
      </div>


    </div>

  );
}

export default Home;
