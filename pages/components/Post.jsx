import { color } from "framer-motion";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

const Post = (props) => {
  const avatar = createAvatar(lorelei, {
    seed: 'John Doe',
  });
  const svg = avatar.toString(); 
  // console.log(svg);
  return (
    <>
      <div className="wrapper">
        <div className="author">
          <span>{props.author}</span>
        </div>
        <div className="text">{props.content}</div>
        <div className="bottom">
          <ul className="icons">
            <li>
              <i class="fa-regular fa-comment"></i>
            </li>
            <li>
              <i class="fa-solid fa-arrow-down"></i>
            </li>
            <li>
              <i class="fa-solid fa-arrow-up"></i>
            </li>
            <li>
              <i class="fa-solid fa-share"></i>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Post;
