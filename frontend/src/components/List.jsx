import React from "react";
import "./styles/List.css";

function List(props) {
  const shows = props.shows;
  const list = shows.map((show) => {
    const showName = show.prfnm._text;
    const showId = show.mt20id._text;
    const showStart = show.prfpdfrom._text;
    const showEnd = show.prfpdto._text;
    const location = show.fcltynm._text;
    const poster = show.poster._text;
    const genre = show.genrenm._text;
    const state = show.prfstate._text;

    return (
      <li className="show-list" key={showId}>
        <div className="show-list__container">
          <img className="poster" src={poster} alt="" />
          <div className="info">
            <h2 className="title">{showName}</h2>
            <h3>
              {showStart} ~ {showEnd}
            </h3>
            <h3>Location: {location}</h3>
            <h4>Genre: {genre}</h4>
            <h4>State: {state}</h4>
          </div>
        </div>
      </li>
    );
  });
  return <ul>{list}</ul>;
}

export default List;
