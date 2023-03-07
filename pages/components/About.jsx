import Navbar from "./Navbar"; 
// import styles from '.../styles/About.Module.css';

const About = () => {
  return (
    <>
      <Navbar />
      {/* <div className={styles.aboutContainer}>  */}
      <div className="conatiner-main">
        <h1>About Us</h1>
        <p>
          We are a decentralized study resources website that aims to provide
          students with access to high-quality educational materials.
        </p>
        <p>
          Our platform is built on blockchain technology, which ensures that all
          resources are securely stored and can be accessed from anywhere in the
          world.
        </p>
        <p>
          We believe that education is a fundamental right, and our mission is
          to make it more accessible to everyone.
        </p>
      </div>
    </>
  );
};

export default About;
