import React, {useState, useEffect } from "react";
import "./fetchData.css";
import * as ReactBootstrap from 'react-bootstrap'
import Modal from "react-bootstrap/Modal";
import {Link} from 'react-router-dom'
import MoviesModal from "./MoviesModal";


function FetchData({page, movies_data, setMovies_Data,  showModal , hideModal }) {

 

  return (
    <div className="main">
     
      <div className="container">
        {movies_data.map((data, index) => {
         
          return (
            <div className="card" key={index} onClick={showModal}>
              <div className="card-header align-center">
                {data.original_title}
              </div>
              <div className="card-body">
                <center><img
                  className="fetchData_images"
                  src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                  alt=""
                /></center>
                <Link className='btn btn-info btn-sm'  to={`Movies_Data/${data.id}`}>View</Link>
              </div>
            </div>
          );
        })}
      </div> 


    </div>
  );
}

export default FetchData;
