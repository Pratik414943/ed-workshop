import Head from "next/head";
import Navbar from "./components/Navbar";

const developers = [
  {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    profile: "https://github.com/johndoe",
  },
  {
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
    profile: "https://github.com/janesmith",
  },
  {
    name: "Bob Johnson",
    avatar: "https://via.placeholder.com/150",
    profile: "https://github.com/bobjohnson",
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
        <h1>About Us</h1>
        <div className="about-site">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perspiciatis numquam molestias tempora dolorum, esse quod eaque.
            Quisquam quia, est fugit illum repellendus deserunt dolorum
            perspiciatis eos ut et, suscipit voluptatum numquam, asperiores
            earum. Sed dolore qui consequatur! Velit eius eaque ullam delectus
            repellat dolorum quasi possimus minima magnam quaerat quidem amet
            maxime odit recusandae dignissimos officiis, praesentium consequatur
            excepturi distinctio molestiae! Dicta, harum ullam ab deleniti
            quidem consequatur molestias voluptas obcaecati tempore pariatur
            assumenda ex aspernatur nobis quas aperiam minima, iure atque
            debitis laborum omnis, quia quibusdam. Nihil, voluptatem. Nam
            officia ipsum assumenda nesciunt atque aliquam nobis ea suscipit
            minima?
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
            reprehenderit, culpa quaerat soluta sapiente doloremque corrupti
            quos tenetur odio! Reprehenderit at veniam quas, eaque aspernatur
            corrupti culpa esse unde labore quos velit similique, sint, mollitia
            inventore cupiditate dolorem? Provident unde suscipit, beatae
            voluptate voluptates voluptatum vero ex facere! In, odio? Excepturi
            a inventore provident ex minus hic. Quibusdam aliquam quae
            voluptatibus vero accusantium rerum iure consectetur ipsum.
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
