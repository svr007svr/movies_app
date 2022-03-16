import axios from "axios";
import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar({
  showMenu,
  setShowMenu,
  setname,
  name,
  page,
  years,
  setPage,
  filterdata,
  setYears,
  movies_data,
  setMovies_Data,
  isLoading,
  setIsLoading,
}) {
  const dynamicPages = () => {
    fetch(`https://movie-task.vercel.app/api/popular?page=${page}`)
      .then(async (res) => {
        const ndata = await res.json();
        let original_data = ndata.data.results;

        setMovies_Data(...movies_data, original_data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    e.preventDefault();
    setname(e.target.value.toLowerCase());
  };

  const handleSubmit = () => {
    console.log(
      `https://movie-task.vercel.app/api/search?page=1&query=${name}`
    );
    axios
      .get(`https://movie-task.vercel.app/api/search?page=1&query=${name}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="nav_bar">
      <div className="container-fluid">
        <div className="navigation_bar">
          <Link className="navbar-brand link" href="#">
            MoviesLists
          </Link>

          <FontAwesomeIcon className="bars" icon={faBars} onClick={() => setShowMenu(!showMenu)} />
        </div>
        <div className="">
          <ul className={(showMenu) ?  'list' :  "list1"}>
            <li className="list-item">
              <Link className="nav-link link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="list-item">
              <Link to="/search_by_name" className="link">
                Search Movies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
