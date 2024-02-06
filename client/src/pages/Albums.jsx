import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Albums = () => {
  const [Albums, setAlbums] = useState([]);

  useEffect(()=>{
    const fetchAllAlbums = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/albums")
        setAlbums(res.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchAllAlbums()
  }, [])

  const handleDelete = async (id)=>{
    try {
      await axios.delete("http://localhost:8800/albums/"+id)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return <div>
    <h1>Albums Store</h1>
    <div className="albums">
      {
        Albums.map(album=>(
          <div className="album" key={album.id}>
            {album.cover && <img src={album.cover} alt="" />}
            <h2>{album.title}</h2>
            <p>{album.desc}</p>
            <span>{album.price}</span>
            <button className="delete" onClick={()=>handleDelete(album.id)}>Delete</button>
            <button className="delete"><Link to={`/update/${album.id}`}>Update</Link></button>
          </div>
        ))
      }
    </div>
    <button><Link to="/add">Add new Album</Link></button>
    </div>;
};

export default Albums;
