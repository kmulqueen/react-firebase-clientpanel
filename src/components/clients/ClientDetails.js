import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import classnames from "classnames";
import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  // Event handler for balance update submit. This updates firestore balance value for specific client
  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    // Represents what we want to update for the particular client
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    // Update in firestore
    // Access firestore through props (in props because we used firestore.connect()).
    // Update will take in collection we want to work with, the doc (specific item/client we want to update which we get with client.id).
    // 2nd paramater is the updated version of what we want to update, which is stored in clientUpdate
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };

  // Delete Client -- Total Owed Updates when client is deleted ////
  onDeleteClick = () => {
    // Destructuring from props
    const { client, firestore, history } = this.props;
    // Call firestore.delete
    firestore
      // Pass in collection and doc. We're deleting the client by id
      .delete({ collection: "clients", doc: client.id })
      // Redirect to "/"
      .then(history.push("/"));
  };

  // Event handler that captures user information in the proper location
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // Destructure client from props
    const { client } = this.props;
    // Destructure blanace update and amount
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;
    // Initialize variable for balanceForm
    let balanceForm = "";
    // If balance form should display when pencil is clicked, making showBalanceUpdate true/false in state
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }
    // If clients are fetched from firebase, render this
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      {/* Toggles showBalanceUpdate value */}
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {/* Put Balance Form */}
                  {balanceForm}
                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      // Else return loading spinner
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  // Get single client from firestore. Add props to get id we want. Id is in url '.com/client/:id'
  // Get from clients collection, store in state as "client" (clients is already used), specify document we want to grab (id, which is in url)
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  // Basically mapPropsToState
  // Destructure firestore.ordered
  connect(({ firestore: { ordered } }, props) => ({
    // set client to the single client
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
