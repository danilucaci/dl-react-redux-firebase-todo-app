import React from "react";
import { string } from "prop-types";

function SkeletonGradient({ id = "itemGradient" }) {
  return (
    <linearGradient id={id}>
      <stop offset="0" stopColor="#edf0f2" stopOpacity="1"></stop>
      <stop offset=".5" stopColor="#d2d5d9" stopOpacity="1">
        <animate
          attributeName="offset"
          dur="2.5s"
          values="0;1;0"
          repeatCount="indefinite"
        />
      </stop>
      <stop offset="1" stopColor="#edf0f2" stopOpacity="1"></stop>
    </linearGradient>
  );
}

SkeletonGradient.propTypes = {
  id: string.isRequired,
};

export default SkeletonGradient;
