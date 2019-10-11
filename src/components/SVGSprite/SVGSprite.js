import React from "react";

const SVGSprite = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0"
    height="0"
    aria-hidden="true"
    focusable="false"
    style={{
      position: "absolute",
    }}
    fill="currentColor"
  >
    <symbol viewBox="0 0 24 24" id="alarm">
      <path d="M18.3 8.59l.91-.9a1.004 1.004 0 1 0-1.42-1.42l-.9.91a8 8 0 0 0-9.79 0l-.91-.92a1.008 1.008 0 0 0-1.42 1.43l.92.91A7.92 7.92 0 0 0 4 13.5a8 8 0 1 0 14.3-4.91zM12 19.5a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm-2-15h4a1 1 0 1 0 0-2h-4a1 1 0 0 0 0 2zm3 6a1 1 0 1 0-2 0v1.89a1.5 1.5 0 1 0 2 0V10.5z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="info">
      <path d="M12 7a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm.92 8.62a.758.758 0 0 0-.09-.18l-.12-.15a.999.999 0 0 0-1.09-.21 1.15 1.15 0 0 0-.33.21A1 1 0 0 0 11 16c.002.13.029.26.08.38a.9.9 0 0 0 .54.54.94.94 0 0 0 .76 0 .9.9 0 0 0 .54-.54c.051-.12.078-.25.08-.38a1.362 1.362 0 0 0 0-.2.639.639 0 0 0-.08-.18zM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="calendar-base">
      <path d="M12 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7-12h-1V2a1 1 0 0 0-2 0v1H8V2a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm1 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16v9zm0-11H4V6a1 1 0 0 1 1-1h1v1a1 1 0 0 0 2 0V5h8v1a1 1 0 0 0 2 0V5h1a1 1 0 0 1 1 1v3zM7 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="calendar-day">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM5 6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5z"
      />
    </symbol>
    <symbol viewBox="0 0 24 24" id="check">
      <path d="M18.71 7.21a.999.999 0 0 0-1.42 0l-7.45 7.46-3.13-3.14a1.024 1.024 0 0 0-1.445.025A1.022 1.022 0 0 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a.999.999 0 0 0 0-1.47z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="chevron-down">
      <path d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a.998.998 0 0 0 1.42 0L17 10.59a.997.997 0 0 0 .219-1.095.998.998 0 0 0-.22-.325z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="chevron-up">
      <path d="M17 13.41l-4.29-4.24a.999.999 0 0 0-1.42 0l-4.24 4.24a.999.999 0 0 0 0 1.42 1 1 0 0 0 1.41 0L12 11.29l3.54 3.54a1 1 0 0 0 1.41 0 1 1 0 0 0 .05-1.42z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="clock-eight">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20zm0-14a1 1 0 0 0-1 1v4.42l-2.1 1.21a1 1 0 0 0 .5 1.87 1 1 0 0 0 .5-.13l2.6-1.5.09-.09.16-.13a.863.863 0 0 0 .1-.16.891.891 0 0 0 .08-.17.65.65 0 0 0 .05-.2L13 12V7a1 1 0 0 0-1-1z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="close">
      <path d="M13.409 12l4.295-4.287a1.003 1.003 0 0 0-1.418-1.42L12 10.59 7.714 6.294a1.003 1.003 0 1 0-1.418 1.419l4.295 4.286-4.295 4.287a1 1 0 0 0 0 1.418.999.999 0 0 0 1.418 0L12 13.408l4.286 4.296a.999.999 0 0 0 1.418 0 1 1 0 0 0 0-1.418l-4.295-4.287z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="comment">
      <path d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="ellipsis-h">
      <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="ellipsis-v">
      <path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="email">
      <path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM5 6h14a1 1 0 0 1 1 1l-8 4.88L4 7a1 1 0 0 1 1-1zm15 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.28l7.48 4.57a1 1 0 0 0 1 0L20 9.28V17z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="google">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C16.46 3.89 14.43 3 12 3 8.48 3 5.44 5.02 3.96 7.96l2.91 2.26C7.6 8.05 9.62 6.48 12 6.48z"
        fill="#EA4335"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.64 12.2c0-.74-.06-1.28-.19-1.84H12v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
        fill="#4285F4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.88 13.78a5.54 5.54 0 0 1-.3-1.78c0-.62.11-1.22.29-1.78L3.96 7.96A9.008 9.008 0 0 0 3 12c0 1.45.35 2.82.96 4.04l2.92-2.26z"
        fill="#FBBC05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74l-2.91 2.26C5.45 18.98 8.48 21 12 21z"
        fill="#34A853"
      />
    </symbol>
    <symbol viewBox="0 0 24 24" id="heart-active">
      <path d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="heart">
      <path d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84zm-1.41 7.46l-6.21 6.21a.759.759 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6 4.27 4.27 0 0 1 6 0 1 1 0 0 0 1.42 0 4.27 4.27 0 0 1 6 0 4.29 4.29 0 0 1 .08 6v.03z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="home">
      <path d="M20 8.024l-6-5.26a3 3 0 0 0-4 0l-6 5.26a3 3 0 0 0-1 2.26v8.74a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8.75a3 3 0 0 0-1-2.25zm-6 12h-4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5zm5-1a1 1 0 0 1-1 1h-2v-5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v5H6a1 1 0 0 1-1-1v-8.75a1 1 0 0 1 .34-.75l6-5.25a1 1 0 0 1 1.32 0l6 5.25a1 1 0 0 1 .34.75v8.75z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="menu">
      <path d="M3 8h18a1 1 0 1 0 0-2H3a1 1 0 0 0 0 2zm18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zm0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="add">
      <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="select">
      <path d="M9.71 10.21L12 7.91l2.29 2.3a.998.998 0 0 0 1.42 0 .997.997 0 0 0 .219-1.095.998.998 0 0 0-.22-.325l-3-3a.999.999 0 0 0-1.42 0l-3 3a1.004 1.004 0 1 0 1.42 1.42zm4.58 4.58L12 17.09l-2.29-2.3a1.004 1.004 0 0 0-1.42 1.42l3 3a.998.998 0 0 0 1.42 0l3-3a1.004 1.004 0 1 0-1.42-1.42z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="search">
      <path d="M21.73 20.31l-3.71-3.68a9 9 0 1 0-1.39 1.39l3.68 3.68a1.002 1.002 0 0 0 1.42 0 1 1 0 0 0 0-1.39zm-10.71-2.29a7 7 0 1 1 0-13.999 7 7 0 0 1 0 14z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="tag">
      <path d="M15 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm6.71-.71l-5-5A1 1 0 0 0 16 7H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h11a.998.998 0 0 0 .71-.29l5-5a1 1 0 0 0 0-1.42zM15.59 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10.59l4 4-4 4z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="trash">
      <path d="M10 18a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1zM20 6h-4V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h1a1 1 0 1 0 0-2zM10 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V5zm7 14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8h10v11zm-3-1a1 1 0 0 0 1-1v-6a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1z" />
    </symbol>
    <symbol viewBox="0 0 24 24" id="user">
      <path d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1.006 1.006 0 1 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19zM12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
    </symbol>
  </svg>
);

export default SVGSprite;
