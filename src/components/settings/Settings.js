import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsActions";

class Settings extends Component {
  //// Toggle Checkboxes in Settings. ////
  //// When we hit the checkbox in settings for this setting, this function will call the action which will return info to reducer (see settingsActions), then the reducer will toggle the state (see settingsReducer) ////
  disableBalanceOnAddChange = () => {
    // Destructuring props. These are the actions that we import above.
    const { setDisableBalanceOnAdd } = this.props;
    // Call that function
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    // Destructuring props. These are the actions that we import above.
    const { setDisableBalanceOnEdit } = this.props;
    // Call that function
    setDisableBalanceOnEdit();
  };
  allowRegistrationChange = () => {
    // Destructuring props. These are the actions that we import above.
    const { setAllowRegistration } = this.props;
    // Call that function
    setAllowRegistration();
  };

  render() {
    // Destructuring settings
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="cad">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Add</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Edit</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
