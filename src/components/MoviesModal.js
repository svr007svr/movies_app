import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import './MoviesModal.css'

function MoviesModal({ show, hideModal, movies_data }) {
  console.log(show);
  const [singleMovie, setSingleMovie] = useState({});
  const { id } = useParams();

  console.log(singleMovie);

  return (
    <div>
      <Modal
        show={show} //true
        onHide={hideModal}
        size="lg"
        aria-labelledby="ModalHeader"
      >
        {movies_data
          .filter((data) => data.id == id)
          .map((data) => {
            console.log(data)
            console.log(data.release_date.split('-')[0]);
            return<>
              <Modal.Header closeButton key={data.id}>
                <Modal.Title id="ModalHeader" className="title">{data.original_title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img className="singleImage" src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt="" />
                <div className="Movie_info">
                  <p className="overview"><b>{data.overview}</b></p>
                  <div className="footer">
                    <div className="date">
                      <b>Release_Date</b> : {data.release_date}
                      
                    </div>
                    <div className="popularity">
                      <b>Popularity</b> : {data.popularity}
                    </div>
                    <div className="language">
                      <b>Language</b> : {data.original_language}
                    </div>
                    <div className="ratings">
                      <b>Ratings</b> : {data.vote_average}
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </>;
          })}
      </Modal>
    </div>
  );
}

export default MoviesModal;
