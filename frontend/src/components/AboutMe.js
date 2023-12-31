import React from "react";
import "./styles/AboutMe.css";

const AboutMe = () => {
  return (
    <div className="about-me-outer-container">
      <h1 className="about-me-h1">About Me</h1>
      <p className="about-me-paragraph-text">
        Hi I'm Nathan! I've always wanted to be a programmer, but could never
        really get started. I kept watching videos and tutorials, but hadn't
        wrote code for projects I cared about, and thus wasn't motivated. When I
        started teaching Go online after college, I wanted to automate the
        tedious tasks, and that was when I learned how to code.
        {/* I learned Python through this Udemy <a href="https://www.udemy.com/course/100-days-of-code/" target="_blank" rel="noopener noreferrer">
        {" "} course </a>. */}
      </p>

      <p className="about-me-paragraph-text">
        You can find the first 2 Python programs I wrote here:{" "}
        <a
          href="https://github.com/ScriabinOp8No12/screenshot_script"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          screenshot_script
        </a>
        ,{" "}
        <a
          href="https://github.com/ScriabinOp8No12/image2sgf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          img2sgf
        </a>
      </p>

      <p className="about-me-paragraph-text">
        I quickly started to love programming because it was saving me a lot of
        time, and I enjoyed discussing and solving problems. I built a web
        scraper that saves my Dad 16 hours annually. Code here:{" "}
        <a
          href="https://github.com/ScriabinOp8No12/SPIE-Beautiful-Soup-Project"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          SPIE scraping project
        </a>
      </p>

      <p className="about-me-paragraph-text">
        3 months later, I decided to apply for a coding bootcamp, and was
        accepted into App Academy. This was the first full stack app I built. I
        always thought frontend was just css and pushing pixels, but after
        logging my time spent, I realized I spent over 80 hours on the frontend,
        and only 40 hours on the backend! My respect for frontend developers
        grew substantially after this project.
      </p>

      <p className="about-me-paragraph-text">
        Outside of programming and teaching Go, I love playing Piano (I started
        at age 5), tennis, League of Legends, and watching anime. I am thankful
        for my wonderful family and friends because they encourage me to become
        the best version of myself.
      </p>
      {/* Image and text of me teaching at Boulder Go club
          <figure>
          <img className="about-me-image" src="https://res.cloudinary.com/dn8rdavoi/image/upload/v1701826538/About%20me%20page%20photos/20231008B010_jdxqd2.jpg" alt="Descriptive Alt Text"/>
          <figcaption className="about-me-caption" >Me teaching my favorite student at the Go club</figcaption>
          </figure> */}
      <div class="connect-section">
        <p>Connect with Me:</p>
        <div class="links">
          <a
            href="https://github.com/ScriabinOp8No12"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-harwit-56016220a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {/* <a href="https://portfolio link" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a> */}
          <a
            href="mailto:nharwit@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
          {/* <a href="https://resume link" target="_blank" rel="noopener noreferrer">
            Resume
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
