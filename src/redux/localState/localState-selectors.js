import { createSelector } from "reselect";

export const selectLocalState = (state) => state.localState;

export const menuSelector = createSelector(
  [selectLocalState],
  (localState) => localState.menu,
);

export const modalsSelector = createSelector(
  [selectLocalState],
  (localState) => localState.modals,
);

export const appDataSelector = createSelector(
  [selectLocalState],
  (localState) => localState.appData,
);

export const appNotificationsSelector = createSelector(
  [selectLocalState],
  (localState) => localState.appData.notifications,
);

export const liveRegionSelector = createSelector(
  [selectLocalState],
  (localState) => localState.liveRegion,
);
