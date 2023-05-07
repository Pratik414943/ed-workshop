import Head from "next/head";
import Navbar from "./components/Navbar";

const developers = [
  {
    name: "Yashwant Lalwani",
    avatar: "./assets/yashwant1.png",
    profile: "https://github.com/yxshwxnt",
  },
  {
    name: "Uttam Patel",
    avatar: "./assets/uttam.jpg",
    profile: "https://github.com/Uttamdp10",
  },
  {
    name: "Pratik",
    avatar: "./assets/pratik.jpg",
    profile: "https://github.com/Pratik414943",
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <Head>
        <title>About Us</title>
      </Head>
      <div className="container">
        <h1 className="orange">About Us</h1>
        <div className="about-site">
          <p>
            YUUP is an educational website created by Yashwant, Uttam, and
            Pratik, three college students who aimed to provide a platform where
            students can access a variety of resources to enhance their
            learning. The website offers notes, previous papers, and a chatbot
            system that enables students to interact with senior or pass-out
            college students. In this report, we will discuss the features,
            benefits, and significance of the YUUP website.
          </p>
          <br />
          <p>
            The YUUP website is significant because it provides students with an
            opportunity to enhance their learning experience. The website's
            features, such as notes, previous papers, and chatbot system, are
            designed to help students learn and understand the concepts better.
            The website is also beneficial for students who are unable to attend
            coaching classes due to financial constraints or other reasons. The
            YUUP website provides them with access to study material and
            guidance, allowing them to excel academically.
          </p>
          <br />
          <span className="orange">About The Developers:</span>
        </div>
        <div className="devs">
          {developers.map((developer) => (
            <div key={developer.name} className="developer">
              <img src={developer.avatar} alt={developer.name} />
              <div className="details">
                <h2>{developer.name}</h2>
                <a
                  href={developer.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        .devs {
          margin: 2rem;
          display: flex;
          justify-content: space-between;
        }
        .developer {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }
        .developer img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin-right: 2rem;
        }
        .developer h2 {
          margin-bottom: 0.5rem;
        }
        .developer a {
          color: #0070f3;
        }
      `}</style>
    </>
  );
};

export default About;
