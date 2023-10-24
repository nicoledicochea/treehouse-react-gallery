import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import apiKey from "./config";
import axios from "axios";
import "./index.css";

// import components
import SearchForm from "./components/SearchForm";
import NavigationBar from "./components/NavigationBar";
import PhotoContainer from "./components/PhotoContainer";
import Error404 from "./components/Error404";

function App() {
  const search = useRef();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=elephant&per_page=24&format=json&nojsoncallback=1`
  );

  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    // request data from Flickr API
    axios
      .get(url)
      .then((response) => {
        // handle success
        if (activeFetch) {
          setImages(response.data.photos.photo);
          setLoading(false);
        }
      })
      // handle error
      .catch((error) =>
        console.log(`Error fetching and parsing data: ${error}`)
      );
    // clean up function
    return () => {
      activeFetch = false;
    };
    // run whenever the url changes
  }, [url]);

  // handle submit for search bar
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = search.current.value;
    e.currentTarget.reset();
    // update url depending on input
    setUrl(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    );
    let path = `${query}`;
    navigate(path);
  };

  // update url depending on query
  const handleQueryChange = (query) => {
    setUrl(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    );
  };

  return (
    <div className="App container">
      <SearchForm handleSubmit={handleSubmit} search={search} />
      <NavigationBar />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate replace to="elephant" />} />
          <Route
            path=":params"
            element={
              <PhotoContainer
                changeQuery={handleQueryChange}
                images={images}
                search={search}
                isLoading={loading}
              />
            }
          />
        </Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
