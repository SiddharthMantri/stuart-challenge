import React from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";

const Card = ({ children, style }) => (
  <div className={styles.card} style={{ ...style }}>
    {children}
  </div>
);

Card.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
};

export default Card;
