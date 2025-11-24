import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <nav className="modern-navbar">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link className="modern-navbar-brand navbar-brand" to="/">
              <span>📚</span>
              <strong>StudentTracker</strong>
            </Link>
            
            <div className="d-none d-lg-flex">
              <form className="modern-navbar search-form search-form">
                <input
                  id="student-search"
                  name="search"
                  className="modern-navbar search-input search-input"
                  type="search"
                  placeholder="Search students..."
                  aria-label="Search"
                  autocomplete="off"
                />
                <button className="modern-navbar search-btn search-btn" type="submit">
                  🔍 Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
