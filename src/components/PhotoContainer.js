import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Photo from "./Photo";
import NotFound from "./NotFound";

const PhotoContainer = ({ images, changeQuery, isLoading }) => {
  const { params } = useParams();
  // referenced this article to solve error in console:
    // https://nidhisharma639593.medium.com/react-bad-setstate-call-f540ee484ce4
  useEffect(() => {
    changeQuery(params);
  }, [changeQuery, params]);

  // format urls according to Flickr API docs
    // example url `https://live.staticflickr.com/65535/53279715210_a447cbfcee.jpg`
  function formatUrls(data) {
    let { server, id, secret } = data;
    return `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
  }
  // displays loading message when fetching new data
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  // displays NotFound component when no matches found
  if (images.length === 0) {
    return <NotFound />;
  }
  // displays gallery of all 24 requested images
  return (
    <div className="photo-container">
      <h2>
        Results for <span>{params}</span>
      </h2>
      <ul>
        {images.map((image) => {
          return <Photo 
            key={image.id} 
            url={formatUrls(image)} 
            params={params} 
            />;
        })}
      </ul>
    </div>
  );
};

export default PhotoContainer;
