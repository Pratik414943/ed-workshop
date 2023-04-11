const Post = (props) => {
  return (
    <>
      <div className="wrapper">
        <div className="author">
          <span>Yashwant</span>
        </div>
        <div className="text">{props.text}</div>
        <div className="bottom">
            <ul className="icons">
                <li><i className="fa-regular fa-comment"></i></li>
                <li><i className="fa-solid fa-arrow-down"></i></li>
                <li><i className="fa-solid fa-arrow-up"></i></li>
                <li><i className="fa-solid fa-share"></i></li>
            </ul>
        </div>
      </div>
    </>
  );
};

export default Post;
