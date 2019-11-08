import React from "react";

import "./SidebarTitleSkeleton.styles.scss";
import SkeletonGradient from "../SkeletonGradient/SkeletonGradient";

function SidebarTitleSkeleton() {
  return (
    <svg
      viewBox="0 0 256 16"
      preserveAspectRatio="xMinYMin"
      aria-hidden="true"
      style={{
        // removes extra bottom spacing
        display: "block",
      }}
      className="SidebarTitleSkeleton"
    >
      <rect
        x="0"
        y="0"
        width="256"
        height="16"
        clipPath="url(#titleClipPath)"
        fill="url(#titleGradient)"
      />
      <defs>
        <SkeletonGradient id="titleGradient" />
        <clipPath id="titleClipPath">
          <circle cx="8" cy="8" r="8" />
          <rect x="40" y="2" width="104" height="12" rx="6" />
          <rect x="216" y="2" width="40" height="12" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SidebarTitleSkeleton;
