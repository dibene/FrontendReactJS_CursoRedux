import React from "react";
import { connect } from "react-redux";
import { Loading } from "../Shared/Loading";
import { Error } from "../Shared/Error";

function Comments(props) {
    if (props.loadingComments && !props.comments.length) return <Loading />;
    if (props.errorComments !== "")
      return <Error message={props.errorComments} />;
  return (
      <ul>
        {props.comments.map(comment => (
          <li key={comment.id}>
            <b>{comment.email}</b>
            <br />
            {comment.body}
          </li>
        ))}
      </ul>
  );
}

const mapStateToProps = ({ publicationsReducer }) => publicationsReducer;

export default connect(mapStateToProps)(Comments);
