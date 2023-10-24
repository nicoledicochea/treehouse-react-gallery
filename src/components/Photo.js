import React from "react";

const Photo = ({ url, params }) => {
  return (
    <li>
      <img src={url} alt={params} />
    </li>
  );
};

export default Photo;
