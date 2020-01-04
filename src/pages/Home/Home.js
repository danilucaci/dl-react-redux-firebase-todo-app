import React from "react";
import { useHistory } from "react-router-dom";

import "./Home.styles.scss";
import * as ROUTES from "../../constants/routes";
import screenshotHeader from "../../assets/img/screenshot-header.png";
import screenshotProjects from "../../assets/img/screenshot-section-projects.png";
import screenshotDueDates from "../../assets/img/screenshot-section-due-dates.png";
import screenshotAddTodo from "../../assets/img/screenshot-section-add-todo.png";
import screenshotSearch from "../../assets/img/screenshot-section-search.png";
import testimonialAvatar1 from "../../assets/img/testimonial-avatar-1.jpg";
import testimonialAvatar2 from "../../assets/img/testimonial-avatar-2.jpg";
import testimonialAvatar3 from "../../assets/img/testimonial-avatar-3.jpg";
import AppMain from "../../components/AppMain/AppMain";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import HomePageHeaderContainer from "../../redux/containers/components/HomePageHeaderContainer";

function Home() {
  let history = useHistory();

  function redirect() {
    history.push(ROUTES.SIGN_UP);
  }

  return (
    <>
      <HomePageHeaderContainer />
      <AppMain>
        <header className="Home__Header">
          <div
            className="row-nested Home__Header__Background__Row"
            aria-hidden="true"
          >
            <div className="col col-xl-6 Home__Header__Background__Col Home__Header__Background__Col--Dark"></div>
            <div className="col col-xl-6 Home__Header__Background__Col"></div>
          </div>
          <div className="row row--contain-12 Home__Header__Contents">
            <div className="col col-xl-4 Home__Header__Contents__Row">
              <h1 className="Home__Header__Title">
                Take back control of your tasks
              </h1>
              <p className="Home__Header__Copy">
                Organize your tasks and projects so you can focus your energy on
                the right things and always know exactly what to work on next.
              </p>
              <PrimaryButton
                onClick={() => redirect()}
                additionalClasses="Home__Header__CTA"
                size="xl"
              >
                Get started
              </PrimaryButton>
            </div>

            <div className="col col-xl-8">
              <img
                loading="lazy"
                src={screenshotHeader}
                alt="Screenshot of the main page of the app."
              />
            </div>
          </div>
        </header>
        <section
          className="row row--contain-12 Home__Section Home__Section__Reversed"
          aria-labelledby="projects-section"
        >
          <div className="Home__Section__Contents col col-xl-5">
            <h2
              className="Home__Section__Subhead Subhead"
              id="projects-section"
            >
              Projects
            </h2>
            <h3 className="Home__Section__Title">
              Organize your tasks with projects
            </h3>
            <p className="Home__Section__Copy">
              Organize your tasks in projects to keep track of all the work you
              need to get done and avoid feeling overwhelmed by too much work.
            </p>
          </div>
          <div className="col col-xl-7">
            <img
              loading="lazy"
              src={screenshotProjects}
              alt="Screenshot of the projects page of the app."
            />
          </div>
        </section>
        <section
          className="row row--contain-12 Home__Section"
          aria-labelledby="due-dates-section"
        >
          <div className="Home__Section__Contents col col-xl-5">
            <h2
              className="Home__Section__Subhead Subhead"
              id="due-dates-section"
            >
              Due Dates
            </h2>
            <h3 className="Home__Section__Title">
              Set due dates to never miss a deadline
            </h3>
            <p className="Home__Section__Copy">
              Set due dates for each task to help you remember deadlines and
              build habits that enable you to get more work done on time.
            </p>
          </div>
          <div className="col col-xl-7">
            <img
              loading="lazy"
              src={screenshotDueDates}
              alt="Screenshot of how to set a due date for a task."
            />
          </div>
        </section>
        <section
          className="row row--contain-12 Home__Section Home__Section__Reversed"
          aria-labelledby="add-edit-section"
        >
          <div className="Home__Section__Contents col col-xl-5">
            <h2
              className="Home__Section__Subhead Subhead"
              id="add-edit-section"
            >
              Add And Edit Tasks
            </h2>
            <h3 className="Home__Section__Title">
              Easily add and edit your tasks
            </h3>
            <p className="Home__Section__Copy">
              Easily add and edit tasks to enable you to get them out of your
              head and onto your to-do list. Sync them across all your devices
              to stay on top of tasks and progress.
            </p>
          </div>
          <div className="col col-xl-7">
            <img
              loading="lazy"
              src={screenshotAddTodo}
              alt="Screenshot of how to add and edit tasks."
            />
          </div>
        </section>
        <section
          className="row row--contain-12 Home__Section"
          aria-labelledby="search-section"
        >
          <div className="Home__Section__Contents col col-xl-5">
            <h2 className="Home__Section__Subhead Subhead" id="search-section">
              Search tasks
            </h2>
            <h3 className="Home__Section__Title">
              Search and find your tasks to speed up your workflow
            </h3>
            <p className="Home__Section__Copy">
              Avoid wasting time searching or trying to remember where your
              tasks are when you have many projects. Just use the search tool to
              find your tasks and get started.
            </p>
          </div>
          <div className="col col-xl-7">
            <img
              loading="lazy"
              src={screenshotSearch}
              alt="Screenshot of the search feature of the app."
            />
          </div>
        </section>
        <section className="Home__Testimonials" aria-label="testimonials">
          <div className="row row--contain-12">
            <h2 className="col Home__Testimonials__Title">
              Loved by teams and individuals
            </h2>
            <div className="col">
              <div className="row-nested Home__Testimonials__Cards">
                <div className="col Home__Testimonials__Card">
                  <p className="Home__Testimonials__Card__Body">
                    I literally couldn’t finish all my work without the app. I
                    can just split each project into smaller parts and start
                    working on them one at a time.
                  </p>
                  <div className="Home__Testimonials__Card__Avatar">
                    <img
                      loading="lazy"
                      src={testimonialAvatar1}
                      alt="Portrait of Jerome Bell, the author of the first testimonial."
                      className="Home__Testimonials__Card__Image"
                    />
                    <div className="Home__Testimonials__Card__Copy">
                      <p className="Home__Testimonials__Card__Name">
                        Jerome Bell
                      </p>
                      <p className="Home__Testimonials__Card__Company">
                        Generic Electric
                      </p>
                    </div>
                  </div>
                </div>
                <span className="Home__Testimonials__Card__Divider" />
                <div className="col Home__Testimonials__Card">
                  <p className="Home__Testimonials__Card__Body">
                    We have been able to revolutionize the way we organize our
                    projects and have grown from 4 to 135 employees and 400+
                    happy customers.
                  </p>
                  <div className="Home__Testimonials__Card__Avatar">
                    <img
                      loading="lazy"
                      src={testimonialAvatar2}
                      alt="Portrait of Juanita Webb, the author of the first testimonial."
                      className="Home__Testimonials__Card__Image"
                    />
                    <div className="Home__Testimonials__Card__Copy">
                      <p className="Home__Testimonials__Card__Name">
                        Juanita Webb
                      </p>
                      <p className="Home__Testimonials__Card__Company">
                        Donut Hut
                      </p>
                    </div>
                  </div>
                </div>
                <span className="Home__Testimonials__Card__Divider" />
                <div className="col Home__Testimonials__Card">
                  <p className="Home__Testimonials__Card__Body">
                    I used to keep track of all my work in my mind, but I soon
                    lost it. Now I never lose sight of my to-dos or miss
                    important deadlines.
                  </p>
                  <div className="Home__Testimonials__Card__Avatar">
                    <img
                      loading="lazy"
                      src={testimonialAvatar3}
                      alt="Portrait of Scarlett Flores, the author of the first testimonial."
                      className="Home__Testimonials__Card__Image"
                    />
                    <div className="Home__Testimonials__Card__Copy">
                      <p className="Home__Testimonials__Card__Name">
                        Scarlett Flores
                      </p>
                      <p className="Home__Testimonials__Card__Company">
                        West Side Bank
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="Home__CTA__Section"
          aria-labelledby="get-started-section"
        >
          <div className="row row--contain-8">
            <div className="col">
              <div className="row-nested row--col row--align-center">
                <h2
                  className="Home__CTA__Section__Title"
                  id="get-started-section"
                >
                  Take back control of your tasks and projects
                </h2>
                <p className="Home__CTA__Section__Copy">
                  For teams & individuals — Web, Mobile, Mac, Windows
                </p>
                <PrimaryButton
                  onClick={() => redirect()}
                  additionalClasses="Home__CTA__Section__CTA"
                  size="xl"
                >
                  Get started
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </AppMain>
    </>
  );
}

export default Home;
