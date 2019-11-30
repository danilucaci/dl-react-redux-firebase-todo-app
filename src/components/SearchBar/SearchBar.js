import React, { useState, useRef } from "react";
import { shape, bool, func } from "prop-types";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Autocomplete from "downshift";
import "./SearchBar.styles.scss";

import { ReactComponent as AlgoliaLogo } from "../../assets/search-by-algolia-light-background.svg";
import * as ROUTES from "../../constants/routes";
import { INBOX_PROJECT_IDENTIFIER } from "../../constants/collections";

import {
  InstantSearch,
  Configure,
  connectAutoComplete,
  connectPoweredBy,
  connectHighlight,
} from "react-instantsearch-dom";

import algoliasearch from "algoliasearch/lite";
import useKeyUpPress from "../../hooks/useKeyUpPress";

const algoliaClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_USER_SEARCH_API_KEY,
);

export const ConnectedPoweredByLink = connectPoweredBy(PoweredByLink);

export function PoweredByLink({ url }) {
  return (
    <li className="SearchBar__AlgoliaWrapper">
      <a href={url} aria-label="Algolia" className="SearchBar__AlgoliaLink">
        <AlgoliaLogo />
      </a>
    </li>
  );
}

export const ConnectedNameHighlight = connectHighlight(NameHighlight);

export function NameHighlight({ highlight, attribute, hit }) {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });

  return (
    <>
      <span className="SearchBar__Hits__Item__Checkbox" />
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={index}>{part.value}</mark>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </>
  );
}
export const ConnectedProjectHighlight = connectHighlight(ProjectHighlight);

export function ProjectHighlight({ highlight, attribute, hit }) {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });

  return (
    <span className="SearchBar__Hits__Item__Project">
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={index}>{part.value}</mark>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}

      <svg
        className="SearchBar__Hits__Item__Project__Color"
        fill={hit.project.colorValue}
      >
        <use xlinkHref="#color" />
      </svg>
    </span>
  );
}

export const ConnectedAutoComplete = connectAutoComplete(AutoComplete);

export function AutoComplete({ hits, refine, toggleTodoHighlight }) {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useKeyUpPress("/", handleKeyboardSearch);

  function handleKeyboardSearch() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const searchBarClasses = classNames({
    SearchBar: true,
  });

  const inputClasses = classNames({
    SearchBar__Input: true,
  });

  const labelClasses = classNames({
    SearchBar__Label: true,
  });

  const svgClassNames = classNames({
    SearchBar__Icon: true,
  });

  function handleChange(item) {
    if (item.hasOwnProperty("objectID")) {
      toggleTodoHighlight({
        id: item && item.objectID,
        isHighlighted: true,
      });
    }

    if (
      item.hasOwnProperty("project") &&
      item.project.hasOwnProperty(INBOX_PROJECT_IDENTIFIER) &&
      item.project[INBOX_PROJECT_IDENTIFIER]
    ) {
      setInputValue("");
      history.push(ROUTES.INBOX);
    } else {
      setInputValue("");
      history.push(`${ROUTES.PROJECT}${item.project.name.toLowerCase()}`);
    }
  }

  function onStateChange(changes) {
    if (changes.hasOwnProperty("inputValue")) {
      setInputValue(changes.inputValue);
    }
  }

  function handleItemSelect() {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  return (
    <Autocomplete
      itemToString={(item) => (item ? item.name : "")}
      onChange={handleChange}
      inputValue={inputValue}
      onStateChange={onStateChange}
      onSelect={handleItemSelect}
    >
      {({
        getMenuProps,
        getLabelProps,
        getInputProps,
        getItemProps,
        selectedItem,
        highlightedIndex,
        isOpen,
      }) => (
        <div className={searchBarClasses}>
          <form id="site-search" role="search" aria-label="Search">
            <label {...getLabelProps()} className={labelClasses}>
              <svg className={svgClassNames}>
                <use xlinkHref={`#search-20`} />
              </svg>
              <input
                {...getInputProps({
                  onChange(e) {
                    refine(e.target.value);
                  },
                })}
                ref={inputRef}
                type="search"
                className={inputClasses}
                placeholder="Search"
              />
            </label>
          </form>
          {isOpen && (
            <ul {...getMenuProps()} className="SearchBar__Hits">
              <li className="SearchBar__SectionTitle">Todos</li>
              {hits.map((item, index) => (
                <li
                  {...getItemProps({
                    item,
                    index,
                  })}
                  key={item.objectID}
                  className={`SearchBar__Hits__Item ${
                    highlightedIndex === index
                      ? ` SearchBar__Hits__Item--Highlighted`
                      : ``
                  }${
                    selectedItem === item
                      ? `SearchBar__Hits__Item--Selected`
                      : ``
                  }`}
                >
                  <ConnectedNameHighlight attribute="name" hit={item} />
                  <ConnectedProjectHighlight
                    attribute="project.name"
                    hit={item}
                  />
                </li>
              ))}
              <ConnectedPoweredByLink />
            </ul>
          )}
        </div>
      )}
    </Autocomplete>
  );
}

export function PlaceholderAutoComplete() {
  const searchBarClasses = classNames({
    SearchBar: true,
  });

  const inputClasses = classNames({
    SearchBar__Input: true,
  });

  const labelClasses = classNames({
    SearchBar__Label: true,
  });

  const svgClassNames = classNames({
    SearchBar__Icon: true,
  });

  return (
    <div className={searchBarClasses}>
      <label className={labelClasses}>
        <svg className={svgClassNames}>
          <use xlinkHref={`#search-20`} />
        </svg>
        <input
          type="text"
          className={inputClasses}
          placeholder="Loading..."
          disabled
        />
      </label>
    </div>
  );
}

function SearchBar({
  toggleTodoHighlight,
  appData: { initialDataLoaded = false } = {},
}) {
  return (
    <InstantSearch
      searchClient={algoliaClient}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
    >
      <Configure hitsPerPage={12} />
      {initialDataLoaded ? (
        <ConnectedAutoComplete toggleTodoHighlight={toggleTodoHighlight} />
      ) : (
        <PlaceholderAutoComplete />
      )}
    </InstantSearch>
  );
}

SearchBar.propTypes = {
  toggleTodoHighlight: func.isRequired,
  appData: shape({
    initialDataLoaded: bool.isRequired,
  }).isRequired,
};

export default SearchBar;
