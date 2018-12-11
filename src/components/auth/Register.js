import React, { Component } from "react";
import { compose } from "redux";
// We need connect to connect to the notify state
import { connect } from "react-redux";
import PropTypes from "prop-types";
// When dealing with auth it's firebase connect NOT firestore connect
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  // Check if allowRegistration is false, if it is, block the '/register' url path
  componentWillMount() {
    // Destructuring settings
    const { allowRegistration } = this.props.settings;
    // Redirect to home if '/register' is typed in url
    if (!allowRegistration) {
      this.props.history.push("/");
    }
  }

  // On Submit function to Register
  onSubmit = e => {
    e.preventDefault();
    // Destructure props and state
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    // Register
    firebase
      .createUser({ email, password })
      // If the user already exists, show an error
      .catch(err => notifyUser("That User Already Exists", "error"));
  };

  // On Change function that gets user input in correct location.
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    // Destructuring notify props
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {/* Check for Message In Notify State*/}
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              {/* Form */}
              <form onSubmit={this.onSubmit}>
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                {/* Login Button */}
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

//// this.props.notify & this.props.settings ////
export default compose(
  firebaseConnect(),
  // Getting notify & settings through the redux state, then assigning them to a prop.
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    // When we have an action, it has to be added here as a property
    { notifyUser }
  )
)(Login);
