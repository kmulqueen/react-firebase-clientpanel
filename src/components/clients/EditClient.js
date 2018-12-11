import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  // On submit
  onSubmit = e => {
    e.preventDefault();
    // Destructuring props
    const { client, firestore, history } = this.props;

    // Construct Updated Client. This will be submitted to firestore.
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      // If balance is empty string, make it a 0. Otherwise the value is the current value.
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    // Update Client in firestore.
    // 1st arg is collection (which collection in firestore), and doc (which one to update is found through props in client.id)
    // 2nd arg is the updated client that we submit.
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      // Redirect to dashboard after client is updated.
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    // If client comes in from firebase, return edit form
    if (client) {
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
            <div className="card-header">Edit Client</div>
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
                    ref={this.firstNameInput}
                    onChange={this.onChange}
                    defaultValue={client.firstName}
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
                    ref={this.lastNameInput}
                    onChange={this.onChange}
                    defaultValue={client.lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={this.emailInput}
                    onChange={this.onChange}
                    defaultValue={client.email}
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
                    ref={this.phoneInput}
                    onChange={this.onChange}
                    defaultValue={client.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    ref={this.balanceInput}
                    onChange={this.onChange}
                    defaultValue={client.balance}
                    // This sets the disabled value to the value of disableBalanceOnEdit true/false
                    disabled={disableBalanceOnEdit}
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
    } else {
      // If not return spinner
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

//// this.props.client  /////
export default compose(
  // Get single client from firestore. Add props to get id we want. Id is in url '.com/client/:id'
  // Get from clients collection, store in state as "client" (clients is already used), specify document we want to grab (id, which is in url)
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  // Basically mapPropsToState
  // Destructure firestore.ordered and settings from state
  connect(({ firestore: { ordered }, settings }, props) => ({
    // set client to the single client
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
