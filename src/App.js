import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FetchData from "./components/FetchData";
import SearchByName from "./components/SearchByName";

import * as ReactBootstrap from "react-bootstrap";
import MoviesModal from "./components/MoviesModal";
import Navbar from "./components/Navbar";

import {
  BrowserRouter,
  Switch,
  Link,
  Route,
  useHistory,
} from "react-router-dom";

function App() {
  const [movies_data, setMovies_Data] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [years, setYears] = useState(0);
  const [page, setPage] = useState(1);
  const [name, setname] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  console.log(name);

  const history = useHistory();

  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };


 

  //for first time
  const total_page = 0;
  useEffect(() => {
    fetch(`https://movie-task.vercel.app/api/popular?page=1`)
      .then(async (res) => {
        const ndata = await res.json();
        let original_data = ndata.data.results;

        setMovies_Data(...movies_data, original_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchData = () => {
    fetch(`https://movie-task.vercel.app/api/popular?page=${page}`)
      .then(async (res) => {
        const ndata = await res.json();
        let original_data = ndata.data.results;
        console.log(original_data);

        setMovies_Data([...original_data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //for dynamic pages

  // const filterdata = movies_data
  //   .filter(function (data) {
  //     return data.release_date.split("-")[0] === years;
  //   })

  // console.log(filterdata);

  //dynamic Change

  const pageHandle = async (e) => {
    console.log(e.target.value);
    setPage(e.target.value);
    const page_no = e.target.value;
    const url =
      page_no === 1
        ? `https://movie-task.vercel.app/api/popular?page=1`
        : `https://movie-task.vercel.app/api/popular?page=${page_no}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies_Data(data.data.results);
      });
  };

  const changeSelect = (e) => {
    console.log(e.target.value);
    let years = e.target.value;

    if (years == "reset") {
      fetchData();
    }
    const filterdata = movies_data.filter(function (data) {
      return data.release_date.split("-")[0] === years;
    });

    filterdata.map((data) => {
      data.length = 0
        ? alert("No Data Found!!")
        : setMovies_Data([...filterdata]);
      years = 0;
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setname={setname}
          movies_data={movies_data}
          setMovies_Data={setMovies_Data}
          years={years}
          setYears={setYears}
          setPage={setPage}
          page={page}
          name={name}
        />
        <div className="row">
          <div className="col-sm-10">
            <Switch>
              <Route exact path="/search_by_name">
                <SearchByName />
              </Route>
              <Route exact path="/">
                <FetchData
                  movies_data={movies_data}
                  showModal={showModal}
                  setMovies_Data={setMovies_Data}
                  page={page}
                />
              </Route>
              <Route exact path="/Movies_Data/:id">
                <MoviesModal
                  show={show}
                  hideModal={hideModal}
                  movies_data={movies_data}
                />
              </Route>
            </Switch>
          </div>
          <div className="col-sm-2">
            <div className="footer1">
              <h5>Search By Page</h5>
              <select className="form-control" onChange={pageHandle}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <h5>Search By Year</h5>
              <select className="form-control select" onChange={changeSelect}>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="reset">Reset</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
