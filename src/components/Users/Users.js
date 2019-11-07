import React from "react";
import "./users.css";
import { connect } from "react-redux";
import * as usersActions from "../../actions/usersAction";

class Users extends React.Component {
  componentDidMount() {
    this.props.listUsers();
  }

  ponerFilas = () =>
    this.props.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));

  render() {
    if (this.props.users != null)
      return (
        <div className="margen">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Enlace</th>
              </tr>
            </thead>
            <tbody>{this.ponerFilas()}</tbody>
          </table>
        </div>
      );
    else return <div className="margen">...</div>;
  }
}

const mapStateToProps = reducers => {
  return reducers.usersReducer;
};

export default connect(
  mapStateToProps,
  usersActions
)(Users);
