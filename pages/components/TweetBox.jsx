import React from "react";

const TweetBox = () => {
  return (
    <>
      <div class="wrapper">
        <div class="input-box">
          <div class="tweet-area">
            <span class="placeholder">What's happening?</span>
            <div
              class="input editable"
              contenteditable="true"
              spellcheck="false"
            ></div>
            <div
              class="input readonly"
              contenteditable="true"
              spellcheck="false"
            ></div>
          </div>
          <div class="privacy">
            <i class="fas fa-globe-asia"></i>
            <span>Everyone can reply</span>
          </div>
          <div className="hr-orange"></div>
        </div>
        <div class="bottom">
          <ul class="icons">
            <li>
              <i class="fa-solid fa-paperclip"></i>
            </li>
            <li>
              <i class="far fa-file-image"></i>
            </li>
            <li>
              <i class="fas fa-map-marker-alt"></i>
            </li>
            <li>
              <i class="far fa-grin"></i>
            </li>
            <li>
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </li>
          </ul>
          <div class="content">
            <span class="counter">100</span>
            <button>Tweet</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetBox;
