import React from "react";

import "./PageSectionTitleSkeleton.styles.scss";
import SkeletonGradient from "../SkeletonGradient/SkeletonGradient";

function PageSectionTitleSkeleton() {
  return (
    <svg
      className="PageSectionTitleSkeleton"
      viewBox="0 0 400 32"
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
        width="400"
        height="32"
        clipPath="url(#sectionTitlePath)"
        fill="url(#sectionTitleGradient)"
      />
      <defs>
        <SkeletonGradient id="sectionTitleGradient" />
        <clipPath id="sectionTitlePath">
          <rect width="120" height="12" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PageSectionTitleSkeleton;
