import React from "react";

import SidebarItemSkeleton from "../SidebarItemSkeleton/SidebarItemSkeleton";
import SidebarTitleSkeleton from "../SidebarTitleSkeleton/SidebarTitleSkeleton";
import SidebarAvatarSkeleton from "../SidebarAvatarSkeleton/SidebarAvatarSkeleton";
import SidebarItemButtonSkeleton from "../SidebarItemButtonSkeleton/SidebarItemButtonSkeleton";

function SidebarSkeleton({ appData: { skeletonSidebarItems = 3 } = {} }) {
  const skeletonArr = Array.from({ length: skeletonSidebarItems }, (v, i) => i);

  return (
    <>
      <SidebarAvatarSkeleton />
      {skeletonArr.map((i) => (
        <SidebarItemSkeleton key={i} />
      ))}
      <section className="SidebarSkeleton__Section">
        <SidebarTitleSkeleton />
        {skeletonArr.map((i) => (
          <SidebarItemSkeleton key={i} />
        ))}
        <SidebarItemButtonSkeleton />
      </section>
      <section className="SidebarSkeleton__Section">
        <SidebarTitleSkeleton />
        {skeletonArr.map((i) => (
          <SidebarItemSkeleton key={i} />
        ))}
        <SidebarItemButtonSkeleton />
      </section>
    </>
  );
}

export default SidebarSkeleton;
