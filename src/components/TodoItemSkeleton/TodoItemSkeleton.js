import React from "react";

import "./TodoItemSkeleton.styles.scss";
import SkeletonGradient from "../SkeletonGradient/SkeletonGradient";

function TodoItemSkeleton() {
  return (
    <svg
      className="TodoItemSkeleton"
      viewBox="0 0 452 76"
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
        width="452"
        height="76"
        clipPath="url(#todoPath)"
        fill="url(#todoGradient)"
      />
      <defs>
        <SkeletonGradient id="todoGradient" />
        <clipPath id="todoPath">
          <rect width="452" height="1" />
          <circle cx="12" cy="28" r="12" />
          <rect x="40" y="22" width="236" height="12" rx="6" />
          <rect x="404" y="22" width="48" height="12" rx="6" />
          <rect x="40" y="48" width="48" height="12" rx="6" />
          <rect x="112" y="48" width="48" height="12" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TodoItemSkeleton;
