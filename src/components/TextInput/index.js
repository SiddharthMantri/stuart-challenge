/* eslint-disable object-curly-newline */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./input.module.css";

const TextInput = ({
  value = "",
  onChange = () => {},
  placeholder = "",
  id = "",
  style = {},
  onBlur = () => {}
}) => (
  <input
    className={styles["address-input"]}
    id={id}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    style={style}
    onBlur={onBlur}
  />
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  onBlur: PropTypes.func
};

export default TextInput;
