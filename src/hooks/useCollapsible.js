import { useEffect, useState, useRef } from "react";
import classnames from "classnames";

import useMeasure from "./useMeasure";
import useMeasureCollapsible from "./useMeasureCollapsible";
import useCollapsibleAnimation from "./useCollapsibleAnimation";

import "./useCollapsible.styles.scss";

function useCollapsible(itemsList) {
  const [collapsibleExpanded, setCollapsibleExpanded] = useState(true);
  const [transitionEnded, setTransitionEnded] = useState(false);
  const [shouldMeasureAgain, setShouldMeasureAgain] = useState(false);
  const [collapsibleHeight, setCollapsibleHeight] = useState("auto");
  const [updatedCollapsibleHeight, setUpdatedCollapsibleHeight] = useState(
    null,
  );
  const [listSizeDifference, setListSizeDifference] = useState(0);
  const [
    shouldMeasureCollapsibleItem,
    setShouldMeasureCollapsibleItem,
  ] = useState(true);

  const prevListLenght = useRef(null);

  const [
    isCollapsibleVisible,
    isCollapsibleTransitioning,
  ] = useCollapsibleAnimation(collapsibleExpanded);

  const [
    collapsibleNodeRef,
    collapsibleNodeSize,
    collapsibleNodeMeasured,
  ] = useMeasureCollapsible(
    collapsibleExpanded,
    isCollapsibleTransitioning,
    shouldMeasureAgain,
    cancelShouldMeasureAgain,
  );

  const [
    collapsibleItemRef,
    collapsibleItemSize,
    collapsibleItemMeasured,
  ] = useMeasure(shouldMeasureCollapsibleItem);

  useEffect(() => {
    // After the list item was measured reset it back to false
    if (shouldMeasureCollapsibleItem && collapsibleItemMeasured) {
      setShouldMeasureCollapsibleItem(false);
    }
  }, [shouldMeasureCollapsibleItem, collapsibleItemMeasured]);

  useEffect(() => {
    return () => {
      // Keep track of the lists length
      if (itemsList.length) {
        prevListLenght.current = itemsList.length;
      }
    };
  });

  useEffect(() => {
    // The list size has changed. Items were added or removed.
    if (prevListLenght.current && prevListLenght.current !== itemsList.length) {
      setListSizeDifference(prevListLenght.current - itemsList.length);
      // Measure the list again to get the new size.
      setShouldMeasureAgain(true);
    }
  }, [collapsibleExpanded, itemsList.length]);

  useEffect(() => {
    // Measure the list size again because items were removed or addded,
    // once it has finished transitioning.
    if (
      updatedCollapsibleHeight &&
      collapsibleNodeSize.height !== updatedCollapsibleHeight &&
      transitionEnded
    ) {
      setShouldMeasureAgain(true);
    }
  }, [collapsibleNodeSize.height, transitionEnded, updatedCollapsibleHeight]);

  useEffect(() => {
    // If the size measured
    if (collapsibleNodeMeasured) {
      if (transitionEnded && collapsibleExpanded) {
        /**
         * Steps
         * 1. Transition from a fixed height to a fixed height,
         *    0 to 150 (whatever the size of the list is, once measured).
         * 2. Set height to auto to have it adjust it’s size if items are added or removed,
         *    when the transition has ended (`onTransitionEnd` fires),
         *    when the element is expanded (collapsibleExpanded).
         */
        setCollapsibleHeight("auto");
      } else {
        /**
         * On the first render after expanding the list this triggers.
         * `isCollapsibleTransitioning` will only be false once,
         * then it’s set to true by the `useCollapsibleAnimation` hook
         * (you can’t transition from `display: none` to `display: block`).
         */
        if (
          collapsibleExpanded &&
          collapsibleNodeSize.height &&
          !isCollapsibleTransitioning
        ) {
          if (shouldMeasureAgain) {
            // If the list was collapsed and the list size changed,
            // update the height so it doesn’t have the previous one.
            if (listSizeDifference !== 0 && collapsibleItemMeasured) {
              const singleItemHeight = collapsibleItemSize.height;

              // Multiply the height of a single item in the list
              // by the total number of items in the current list.
              const newHeight = singleItemHeight * itemsList.length;

              setCollapsibleHeight(newHeight);
              setUpdatedCollapsibleHeight(newHeight);

              // Remove `shouldMeasureAgain` to avoid measuring while the list is expanding.
              setShouldMeasureAgain(false);
              // Reset the list sizes difference
              setListSizeDifference(0);
            }
          }

          // If the list sizes are the same
          if (!shouldMeasureAgain) {
            /**
             * If the collapsible height was updated
             * and the size measured by the Resize Observer is different,
             * set the `collapsibleHeight` to be the updated one,
             * So it can transition to a correct height.
             */
            if (
              updatedCollapsibleHeight &&
              collapsibleNodeSize.height !== updatedCollapsibleHeight
            ) {
              setCollapsibleHeight(updatedCollapsibleHeight);
            } else {
              // Otherwise, set the same height it had.
              setCollapsibleHeight(collapsibleNodeSize.height);
            }
          }
        }

        // The height for when the list is collapsed to transition
        // from a value of 0 to a fixed list height value.
        if (!collapsibleExpanded && isCollapsibleVisible) {
          setCollapsibleHeight(0);
        }
      }
    }
  }, [
    isCollapsibleVisible,
    isCollapsibleTransitioning,
    collapsibleExpanded,
    collapsibleNodeSize.height,
    transitionEnded,
    collapsibleNodeMeasured,
    shouldMeasureAgain,
    listSizeDifference,
    collapsibleItemMeasured,
    collapsibleItemSize.height,
    itemsList.length,
    collapsibleHeight,
    setUpdatedCollapsibleHeight,
    updatedCollapsibleHeight,
  ]);

  const collapsibleClasses = classnames({
    Collapsible: true,
    [`Collapsible--isCollapsibleTransitioning`]: isCollapsibleTransitioning,
    [`Collapsible--isHidding`]: !isCollapsibleVisible,
    [`Collapsible--isHidden`]: transitionEnded && !collapsibleExpanded,
  });

  function cancelShouldMeasureAgain() {
    // shouldMeasureAgain is active
    if (shouldMeasureAgain) {
      if (
        updatedCollapsibleHeight &&
        collapsibleNodeSize.height === updatedCollapsibleHeight
      ) {
        // Reset `updatedCollapsibleHeight`
        setUpdatedCollapsibleHeight(null);
      }

      setShouldMeasureAgain(false);
    }
  }

  function toggleCollapsible() {
    // First set the height to a fixed value.
    // You can’t transition from `auto` to a value.
    if (collapsibleExpanded) {
      // If `updatedCollapsibleHeight` was set and the height measure by the ResizeObserver
      // is larger, items were removed, so we need to set the collapsible’s height
      // to be the new updated height.
      if (
        updatedCollapsibleHeight &&
        collapsibleNodeSize.height > updatedCollapsibleHeight
      ) {
        setCollapsibleHeight(updatedCollapsibleHeight);
      } else {
        // Otherwise, set the same height to transition to from 0 to the height’s value.
        setCollapsibleHeight(collapsibleNodeSize.height);
      }
    }

    setCollapsibleExpanded(!collapsibleExpanded);

    // Reset the transition state.
    if (transitionEnded) {
      setTransitionEnded(false);
    }
  }

  function handleTransitionEnd() {
    setTransitionEnded(true);
  }

  return [
    collapsibleClasses,
    collapsibleNodeRef,
    collapsibleItemRef,
    collapsibleExpanded,
    collapsibleHeight,
    handleTransitionEnd,
    toggleCollapsible,
    isCollapsibleVisible,
  ];
}

export default useCollapsible;
