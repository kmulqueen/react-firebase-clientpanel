import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// Props are going to be message and messageType
const Alert = props => {
  const { message, messageType } = props;
  return (
    // Return div with dynamic classes based on the messageType
    <div
      // "alert" as the 1st arg is just adding alert to all of the following classes in the object. alert alert-success (for bootstrap)
      className={classnames("alert", {
        "alert-success": messageType === "success",
        "alert-danger": messageType === "error"
      })}
    >
      {/* The Message That's Returned */}
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
