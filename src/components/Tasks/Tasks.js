import React, { Component } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";
import { Loading } from "../Shared/Loading";
import { Error } from "../Shared/Error";
import "./tasks.css";
import { Link } from "react-router-dom";

class Tasks extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tasks).length) this.props.tasksList();
  }

  componentDidUpdate() {
    const { tasks, loading, tasksList } = this.props;
    if (!Object.keys(tasks).length && !loading) tasksList();
  }

  content = () => {
    if (this.props.loading) return <Loading />;
    if (this.props.error !== "") return <Error message={this.props.error} />;

    return Object.keys(this.props.tasks).map(userId => (
      <div className="taskContainer" key={userId}>
        <h2>Usuario: {userId}</h2>
        <div>{this.contentTask(userId)}</div>
      </div>
    ));
  };

  handlerChange = (userId, taskId) => {
    const task = this.props.tasks[userId][taskId];
    const editTask = {
      ...task,
      completed: !task.completed
    };
    this.props.edit(editTask);
  };

  contentTask = userId => {
    const { tasks, taskDelete } = this.props;
    const taskPerUser = { ...tasks[userId] };
    return Object.keys(taskPerUser).map(taskId => (
      <div key={taskPerUser[taskId].id}>
        <input
          onChange={() => this.handlerChange(userId, taskId)}
          type="checkbox"
          defaultChecked={taskPerUser[taskId].completed}
        />
        {taskPerUser[taskId].title}
        <button>
          {" "}
          <Link to={`/tasks/save/${userId}/${taskId}`}> Editar</Link>{" "}
        </button>
        <button onClick={() => taskDelete(taskId)}> Eliminar </button>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <button>
          <Link to="/tasks/save">Agregar</Link>
        </button>
        {this.content()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tasks);
