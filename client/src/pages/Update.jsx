import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"

const Update = () => {
  // setAlbums
  const [album, setAlbum] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()
  const location = useLocation()

  const albumId = location.pathname.split("/")[2]

  // console.log(location.pathname.split("/")[2])

  const handleChange = (e) => {
    setAlbum(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/albums/" + albumId, album)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  console.log(album)

  return (
    <div className="form">
      <h1>Update the Album</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" />
      <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
      <input type="number" placeholder="price" onChange={handleChange} name="price" />
      <input type="text" placeholder="cover" onChange={handleChange} name="cover" />

      <button className="formButton" onClick={handleClick} >Update</button>
    </div>
  );
};

export default Update;

// yt 43:45 Styles
