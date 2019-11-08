import React from "react";

import "./SidebarItemButtonSkeleton.styles.scss";

function SidebarItemButtonSkeleton() {
  return (
    <svg
      viewBox="0 0 256 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        // removes extra bottom spacing
        display: "block",
      }}
      className="SidebarItemButtonSkeleton"
    >
      <rect
        x="0"
        y="0"
        width="256"
        height="16"
        clipPath="url(#sidebarItemButtonClipPath)"
        fill="url(#sidebarItemButtonGradient)"
      />
      <defs>
        <linearGradient id="sidebarItemButtonGradient">
          <stop offset="0" stopColor="#edf0f2"></stop>
          <stop offset=".5" stopColor="#d2d5d9">
            <animate
              attributeName="offset"
              dur="2.5s"
              values="0;1;0"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1" stopColor="#edf0f2"></stop>
        </linearGradient>
        <clipPath id="sidebarItemButtonClipPath">
          <circle cx="8" cy="8" r="8" />
          <rect x="40" y="2" width="48" height="12" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SidebarItemButtonSkeleton;
