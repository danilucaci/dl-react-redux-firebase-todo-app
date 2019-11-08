import React from "react";

import "./SidebarItemSkeleton.styles.scss";
import SkeletonGradient from "../SkeletonGradient/SkeletonGradient";

function SidebarItemSkeleton() {
  return (
    <svg
      viewBox="0 0 256 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        // removes extra bottom spacing
        display: "block",
      }}
      className="SidebarItemSkeleton"
    >
      <rect
        x="0"
        y="0"
        width="256"
        height="16"
        clipPath="url(#sidebarItemClipPath)"
        fill="url(#sidebarItemGradient)"
      />
      <defs>
        <SkeletonGradient id="sidebarItemGradient" />
        <clipPath id="sidebarItemClipPath">
          <circle cx="8" cy="8" r="8" />
          <rect x="40" y="2" width="216" height="12" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SidebarItemSkeleton;
