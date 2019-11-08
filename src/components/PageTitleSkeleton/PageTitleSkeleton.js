import React from "react";

import "./PageTitleSkeleton.styles.scss";
import SkeletonGradient from "../SkeletonGradient/SkeletonGradient";

function PageTitleSkeleton() {
  return (
    <svg
      className="PageTitleSkeleton"
      viewBox="0 0 568 32"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        // removes extra bottom spacing
        display: "block",
      }}
    >
      <rect
        x="0"
        y="0"
        width="320"
        height="32"
        clipPath="url(#pageTitlePath)"
        fill="url(#pageTitleGradient)"
      />
      <defs>
        <SkeletonGradient id="pageTitleGradient" />
        <clipPath id="pageTitlePath">
          <rect width="220" height="16" rx="8" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PageTitleSkeleton;
