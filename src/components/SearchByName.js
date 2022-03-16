import React, { useState, useEffect } from "react";
import './SearchByName.css'

function SearchByName() {
  const [name, setName] = useState("");
  const [searchData, setSearchData] = useState([]);
 
  //search by input
  const handleInput = (e) => {
    console.log(e.target.value);
    setName(e.target.value.toLowerCase());
  };

  const search = (e) => {
    e.preventDefault();
    fetch(`https://movie-task.vercel.app/api/search?page=1&query=${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchData(data.data.results);
      });
  };

  return (
    <div className="main1">
      <h3 className="text-danger mt-3">Search By Movies Names</h3>
      <form onSubmit={search}>
       <center>
       <input
          type="text"
          placeholder="Search Movie Here..."
          onChange={handleInput}
          className="form-control"
        />
        <button className="btn btn-success col-sm-4">Search</button>
       </center>
      </form>

      <div className="container">
       
          {searchData.map((data) => {
              return (
                <div className="card">
                  <div className="card-header">
                    <h3>
                 
                      <b>{data.original_title}</b>
                    </h3>
                  </div>
                  <div className="card-body">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default SearchByName;
