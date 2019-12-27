import { connect } from "react-redux";

import { cookieConsentSelector } from "../../localState/localState-selectors";
import CookieConsent from "../../../components/CookieConsent/CookieConsent";
import {
  setCookieConsentAccepted,
  setCookieConsentDenied,
  openCookieConsent,
} from "../../localState/localState-actions";

const mapStateToProps = (state) => ({
  cookieConsent: cookieConsentSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCookieConsentAccepted: () => dispatch(setCookieConsentAccepted()),
  setCookieConsentDenied: () => dispatch(setCookieConsentDenied()),
  openCookieConsent: () => dispatch(openCookieConsent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CookieConsent);
