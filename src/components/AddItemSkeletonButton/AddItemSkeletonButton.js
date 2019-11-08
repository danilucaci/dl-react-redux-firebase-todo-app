import React from "react";

import "./AddItemSkeletonButton.styles.scss";
import SkeletonGradient from "../SkeletonGradient/SkeletonGradient";

function AddItemSkeletonButton() {
  return (
    <svg
      viewBox="0 0 452 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        // removes extra bottom spacing
        display: "block",
      }}
      className="AddItemSkeletonButton"
    >
      <rect
        x="0"
        y="0"
        width="452"
        height="48"
        clipPath="url(#addItemButtonClipPath)"
        fill="url(#addItemButtonGradient)"
      />
      <defs>
        <SkeletonGradient id="addItemButtonGradient" />
        <clipPath id="addItemButtonClipPath">
          <rect width="452" height="1" />
          <circle cx="12" cy="24" r="8" />
          <rect x="40" y="18" width="64" height="12" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default AddItemSkeletonButton;
