import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { getDisplayName } from "../utils/helpers";

import { userStateSelector } from "../redux/user/user-selectors";

export const mapStateToProps = (state) => ({
  user: userStateSelector(state),
});

/**
 * Returns the `Route` `Component` wrapped with the `currentUser` or `<Redirect />`.
 *
 * @param {function} predicate Optional function to check against the current user object.
 * @returns {function} getComponent Function that receives a Route Component.
 * @param {React.Component} Component A Route (React Component) that should be protected.
 * @returns The `Component` wrapped with the `currentUser` or `<Redirect />`.
 * @example
 *
 * Using a predicate
 * const predicate = (user) => user.role.includes("admin");
 * export default withProtectedRoute(predicate)(Inbox);
 *
 * Without a predicate
 * export default withProtectedRoute()(Inbox);
 */
function withProtectedRoute(predicate = null) {
  return function getComponent(Component) {
    Component.displayName = `WithProtectedRoute(${getDisplayName(Component)})`;

    function WrappedComponent(props) {
      const { user: { currentUser = null, isLoggingOut } = {} } = props;

      // If a predicate is passed
      if (predicate) {
        /**
         * If it passes, the predicate return the `Component`
         * Otherwise redirect because the `currentUser`
         * doesn’t have the necessary permissions
         */

        if (predicate(currentUser) && !isLoggingOut) {
          return <Component {...props} />;
        } else return <Redirect to="/" />;
      }

      // If there is a `currentUser` return the `Component`.
      if (currentUser && !isLoggingOut) {
        return <Component {...props} />;
      }

      // If not redirect home because there is no `currentUser` authenticated.
      return <Redirect to="/" />;
    }

    /**
     * Connects the `WrappedComponent` to redux to get the `currentUser`
     * `WrappedComponent` will receive `currentUser` as a prop
     */
    return connect(mapStateToProps)(WrappedComponent);
  };
}

export default withProtectedRoute;
