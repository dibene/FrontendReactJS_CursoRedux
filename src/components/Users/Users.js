import React from "react";
import "./users.css";
import { connect } from "react-redux";
import * as usersActions from "../../actions/usersAction";
import { Loading } from "../Shared/Loading";
import { Error } from "../Shared/Error";
import { Table } from "../Shared/Table";
import { Link } from "react-router-dom";
import "../Shared/index.css";

class Users extends React.Component {
  componentDidMount() {
    if(!this.props.users.length)
      this.props.listUsers();
  }
  linkActionTable = key => {
    return (
      <Link to={`/usuarios/${key}/publicaciones/`}>
        <div className="eye icon"></div>
      </Link>
    );
  };
  content = () => {
    const headers = [
      { name: "name", value: "Nombre" },
      { name: "email", value: "Correo" },
      { name: "website", value: "Enlace" }
    ];
    const actions = [this.linkActionTable];

    if (this.props.loading) return <Loading />;
    if (this.props.error !== "") return <Error message={this.props.error} />;

    return (
      <Table headers={headers} body={this.props.users} actions={actions} />
    );
  };

  render() {
    return (
      <div className="margen">
        <h2>Usuarios</h2>
        {this.content()}
      </div>
    );
  }
}

const mapStateToProps = ({usersReducer}) => {
  return usersReducer;
};

export default connect(
  mapStateToProps,
  usersActions
)(Users);
