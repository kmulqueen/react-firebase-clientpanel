import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  //// Get the clients when they come in, then loop through and add balances to get total. ////
  static getDerivedStateFromProps(props, state) {
    // Get clients that come from props / firestore
    const { clients } = props;
    // Make sure there's clients before this runs
    if (clients) {
      // Add Balances
      const total = clients.reduce((total, client) => {
        // Each loop, this will return each client's balance and add it to the total
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }
    // Return nothing if no clients
    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    //// If there are clients, return them. Else return loading bar.
    if (clients) {
      return (
        <div>
          {/* Main Heading */}
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-users" /> Clients{" "}
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{" "}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            {/* Table Headings */}
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>

            {/* Loop Through Clients */}
            <tbody>
              {/* For Each Client, Output Table Row With Data */}
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    {/* Details Button That Links To Specific Client Info */}
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  // Get clients from firestore
  firestoreConnect([{ collection: "clients" }]),
  // Basically mapPropsToState
  connect((state, props) => ({
    // get clients from state.firestore.ordered.clients
    clients: state.firestore.ordered.clients
  }))
)(Clients);
