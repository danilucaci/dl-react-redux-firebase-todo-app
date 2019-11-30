import React, { useRef, useEffect } from "react";
import { string, shape, func } from "prop-types";

import "./LiveRegion.styles.scss";

function LiveRegion({ liveRegion: { message } = {}, clearLiveRegionMessage }) {
  const liveRegionTimeout = useRef(null);

  useEffect(() => {
    if (message) {
      liveRegionTimeout.current = setTimeout(() => {
        clearLiveRegionMessage();
      }, 6000);
    }

    return () => {
      if (liveRegionTimeout.current) {
        clearTimeout(liveRegionTimeout.current);
      }
    };
  }, [clearLiveRegionMessage, message]);

  return (
    <div className="LiveRegion" role="status" aria-live="polite">
      {message}
    </div>
  );
}

LiveRegion.propTypes = {
  liveRegion: shape({
    message: string,
  }),
  clearLiveRegionMessage: func.isRequired,
};

LiveRegion.defaultProps = {
  liveRegion: {
    message: "",
  },
};

export default LiveRegion;
