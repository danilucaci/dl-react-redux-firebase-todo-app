import React from "react";

import "./Footer.styles.scss";

function Footer() {
  return (
    <footer className="Site__Footer">
      <div className="row row--contain-8">
        <div className="col Site__Footer__Header">
          <h2 className="Subhead">Made by Dani Lucaci</h2>
          <h3 className="H4 Site__Footer__Title">Get in touch</h3>
          <p>
            If you’d like to learn more about me, this project or if you’re
            Interested in working together, please feel free to{" "}
            <a
              href="https://www.danilucaci.com/contact"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              get in touch
            </a>
            . I’d be more than happy to chat with you!
          </p>
        </div>
        <div className="col Site__Footer__Links__Section">
          <h3 className="Subhead Site__Footer__Links__Subhead">
            Project assets
          </h3>
          <p>
            The project’s source code is available on{" "}
            <a
              href="https://github.com/danilucaci/react-todo-app.git"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Github
            </a>{" "}
            and the{" "}
            <a
              href="https://www.figma.com/file/nuc3EnIKE3aEyGEjyJiLRD/Todo-app"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              design system
            </a>{" "}
            in Figma.
          </p>
        </div>
        <div className="col Site__Footer__Links__Section">
          <h3 className="Subhead Site__Footer__Links__Subhead">Connect</h3>
          <p className="Site__Footer__Social__Links">
            <a
              href="https://www.linkedin.com/in/danilucaci/"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Linkedin
            </a>{" "}
            •{" "}
            <a
              href="https://www.danilucaci.com"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Portfolio
            </a>{" "}
            •{" "}
            <a
              href="https://dribbble.com/danilucaci"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Dribbble
            </a>{" "}
            •{" "}
            <a
              href="https://github.com/danilucaci"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Github
            </a>{" "}
            •{" "}
            <a
              href="https://twitter.com/danilucaci"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Twitter
            </a>
          </p>
        </div>
      </div>
      <div className="row row--contain-10 Site__Footer__Stack__Section">
        <div className="col Site__Footer__Divider">
          <hr />
        </div>
        <div className="col col-6 col-m-2 col-xl-3">
          <h3 className="Subhead Site__Footer__Stack__Subhead">Front-end</h3>
          <ul>
            <li>React.js</li>
            <li>Redux.js</li>
            <li>Sass</li>
            <li>react-day-picker</li>
          </ul>
        </div>
        <div className="col col-6 col-m-2 col-xl-3">
          <h3 className="Subhead Site__Footer__Stack__Subhead">Back-end</h3>
          <ul>
            <li>Firebase</li>
            <li>Cloud Firestore</li>
            <li>Cloud Functions</li>
            <li>Express.js</li>
          </ul>
        </div>
        <div className="col col-6 col-m-2 col-xl-3">
          <h3 className="Subhead Site__Footer__Stack__Subhead">Testing</h3>
          <ul>
            <li>Jest</li>
            <li>React Testing Library</li>
          </ul>
        </div>
        <div className="col col-6 col-m-2 col-xl-3">
          <h3 className="Subhead Site__Footer__Stack__Subhead">Design</h3>
          <ul>
            <li>Figma</li>
            <li>Unicons</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
