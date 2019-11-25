import React, { Component } from "react";
import { connect } from "react-redux";
import "./publications.css";
import * as usersActions from "../../actions/usersAction";
import * as publicationsActions from "../../actions/publicationsAction";
import { Loading } from "../Shared/Loading";
import { Error } from "../Shared/Error";
import Comments from "./Comments";

class Publications extends Component {
  async componentDidMount() {
    const {
      listUsers,
      publicationsPerUser,
      match: {
        params: { key }
      }
    } = this.props;
    if (!this.props.usersReducer.users.length) {
      await listUsers();
    }
    if (this.props.usersReducer.error) {
      return;
    }
    if (!("publications_key" in this.props.usersReducer.users[key])) {
      publicationsPerUser(key);
    }
  }

  content_user = () => {
    const {
      usersReducer,
      usersReducer: { users },
      match: {
        params: { key }
      }
    } = this.props;
    if (usersReducer.loading) return <Loading />;
    if (usersReducer.error !== "")
      return <Error message={usersReducer.error} />;

    const user = users[key];

    return (
      <div>
        <h2 style={{ color: "orangered" }}>Publicaciones de {user.name}</h2>
      </div>
    );
  };

  content_publications = () => {
    const {
      usersReducer,
      usersReducer: { users },
      publicationsReducer,
      publicationsReducer: { publications },
      match: {
        params: { key }
      }
    } = this.props;

    if (usersReducer.loading) return;
    if (usersReducer.error !== "") return;

    if (publicationsReducer.loading) return <Loading />;
    if (publicationsReducer.error !== "")
      return <Error message={publicationsReducer.error} />;

    const { publications_key } = users[key];

    return this.showPublications(
      publications[publications_key],
      publications_key
    );
  };

  showPublications = (publications, publicationsKey) =>
    publications.map((publication, commentKey) => (
      <div
        key={publication.id}
        className="publication"
        onClick={() =>
        {  
          this.showComments(
            publicationsKey,
            commentKey,
            publication.comments
          )}
        }
      >
        <h3>{publication.title}</h3>
        <p>{publication.body}</p>
        {publication.isOpen && <Comments comments={publication.comments} />}
      </div>
    ));
  showComments = (publicationsKey, commentKey, comments) => {
    this.props.openClose(publicationsKey, commentKey);
    if(!comments.length)
      this.props.bringComments(publicationsKey, commentKey);
  };
  render() {

    return (
      <div>
        {this.content_user()}
        {this.content_publications()}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, publicationsReducer }) => {
  return { usersReducer, publicationsReducer };
};

const mapDispatchToProps = {
  ...usersActions,
  ...publicationsActions
};
export default connect(mapStateToProps, mapDispatchToProps)(Publications);
