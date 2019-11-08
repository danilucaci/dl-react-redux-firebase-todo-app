import React from "react";

import "./PageSkeleton.styles.scss";

import TodoItemSkeleton from "../../components/TodoItemSkeleton/TodoItemSkeleton";
import PageTitleSkeleton from "../../components/PageTitleSkeleton/PageTitleSkeleton";
import PageSectionTitleSkeleton from "../../components/PageSectionTitleSkeleton/PageSectionTitleSkeleton";
import AddItemSkeletonButton from "../../components/AddItemSkeletonButton/AddItemSkeletonButton";

function PageSkeleton({ appData: { skeletonTodos = 3 } = {} }) {
  const skeletonArr = Array.from({ length: skeletonTodos }, (v, i) => i);

  return (
    <>
      <PageTitleSkeleton />
      <section className="PageSkeletonSection">
        <PageSectionTitleSkeleton />
        {skeletonArr.map((i) => (
          <TodoItemSkeleton key={i} />
        ))}
        <AddItemSkeletonButton />
      </section>
      <section className="PageSkeletonSection">
        <PageSectionTitleSkeleton />
        {skeletonArr.map((i) => (
          <TodoItemSkeleton key={i} />
        ))}
        <AddItemSkeletonButton />
      </section>
    </>
  );
}

export default PageSkeleton;
