import React from "react";

const TweetBox = () => {
  return (
    <>
      <div className="wrapper">
        <div className="input-box">
          <div className="tweet-area">
            <span className="placeholder">What's happening?</span>
            <div
              className="input editable"
              contenteditable="true"
              spellcheck="false"
            ></div>
            <div
              className="input readonly"
              contenteditable="true"
              spellcheck="false"
            ></div> 
          </div>
          <div className="hr-orange"></div>
        </div>
        <div className="bottom">
          <ul className="icons">
            <li>
              <i className="fa-solid fa-paperclip"></i>
            </li>
            <li>
              <i className="far fa-file-image"></i>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
            </li>
            <li>
              <i className="far fa-grin"></i>
            </li>
            <li>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </li>
          </ul>
          <div className="content">
            <span className="counter">100</span>
            <button>Tweet</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetBox;
