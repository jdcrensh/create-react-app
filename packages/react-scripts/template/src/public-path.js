/* eslint-disable */
/*
 * Inject the static resource path at runtime, e.g. `{!$Resource.MyApp}/`
 * (!) The file `visualforce.html` must contain this js snippet:
 *     `window.webpackPublicPath = '%PUBLIC_URL%/';`
 * (!) This file must be the first import in `index.js`
 * 
 * See: https://webpack.js.org/guides/public-path/
 */
if (window.webpackPublicPath) {
  __webpack_public_path__ = window.webpackPublicPath;
}
