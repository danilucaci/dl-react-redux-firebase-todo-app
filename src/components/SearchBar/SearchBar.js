import React from "react";
import classNames from "classnames";

import "./SearchBar.styles.scss";

function SearchBar() {
  const searchBarClasses = classNames({
    Search__Bar: true,
  });

  const inputClasses = classNames({
    Search__Input: true,
  });

  const labelClasses = classNames({
    Search__Label: true,
  });

  const svgClassNames = classNames({
    Search__Icon: true,
  });

  return (
    <form method="get" action="/search" className={searchBarClasses}>
      <label htmlFor="search-bar" className={labelClasses}>
        <svg className={svgClassNames}>
          <use xlinkHref={`#search-20`} />
        </svg>
        <input
          type="text"
          id="search-bar"
          name="search-bar"
          className={inputClasses}
          placeholder="Search"
        />
      </label>
    </form>
  );
}

export default SearchBar;
