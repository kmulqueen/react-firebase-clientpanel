import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  // On change handler that captures user input in the correct fields
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // On submit handler for form
  onSubmit = e => {
    e.preventDefault();

    // Prepare client to get added to firestore
    const newClient = this.state;
    // Take firestore and history from props
    const { firestore, history } = this.props;
    // If balance is NaN, change it to 0
    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    // Add Client. 1st arg. is the collection to where you want to add, the 2nd is the object you want to add
    firestore
      .add({ collection: "clients" }, newClient)
      // Redirect after client is added. history comes from props, was destructured above with firestore
      .then(() => history.push("/"));
  };

  render() {
    // Destructuring settings
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  onChange={this.onChange}
                  value={this.state.balance}
                  // This sets the disabled value to the value of disableBalanceOnAdd true/false
                  disabled={disableBalanceOnAdd}
                />
              </div>

              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

// Connecting to firestore to add/upload a client. Gives us access to this.props.firestore
export default compose(
  firestoreConnect(),
  // Bringing in settings as a prop from our settings state
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
