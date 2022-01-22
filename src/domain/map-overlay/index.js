import React from "react";
import PropTypes from "prop-types";

const MapOverlay = ({ children }) => (
  <div
    style={{
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      padding: "32px",
      boxSizing: "border-box"
    }}
  >
    {children}
  </div>
);

MapOverlay.propTypes = {
  children: PropTypes.node
};

export default MapOverlay;
