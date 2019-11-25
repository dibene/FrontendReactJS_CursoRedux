import React, { Component } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";
import { Loading } from "../Shared/Loading";
import { Error } from "../Shared/Error";
import { Redirect } from "react-router-dom";

class Save extends Component {
  async componentDidMount() {
    const {
      match: {
        params: { userId, taskId }
      },
      tasks,
      changeUserId,
      changeTitle
    } = this.props;
    if (userId && taskId) {
      const task = tasks[userId][taskId];
      changeUserId(task.userId);
      changeTitle(task.title);
    }else{
      changeUserId('');
      changeTitle('');
    }
  }
  changeUserId = event => {
    this.props.changeUserId(event.target.value);
  };
  changeTitle = event => {
    this.props.changeTitle(event.target.value);
  };
  save = event => {
    const {
      match: { params },
      tasks,
      userId,
      title,
      save,
      edit
    } = this.props;
    const newTask = {
      userId: userId,
      title: title,
      completed: false
    };
    if (params.userId && params.taskId) {
      const task = tasks[params.userId][params.taskId];
      const editTask = {
        ...newTask,
        completed: task.completed,
        id: task.id
      };
      edit(editTask);
    } else {
      save(newTask);
    }
  };
  isDisabled = () => {
    const { userId, title, loading } = this.props;
    if (loading) return true;
    if (!userId || !title) return true;
    return false;
  };
  actionSave = () => {
    const { error, loading } = this.props;
    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    return false;
  };
  render() {
    return (
      <div>
        {this.props.back && <Redirect to="/tasks" />}
        <h1>Guardar Tarea</h1>
        <label>Usuario: </label>
        <input
          type="number"
          value={this.props.userId}
          onChange={this.changeUserId}
        />
        <br />
        <br />
        <label>Título: </label>
        <input
          type="text"
          value={this.props.title}
          onChange={this.changeTitle}
        />
        <br />
        <br />
        <button disabled={this.isDisabled()} onClick={this.save}>
          Guardar
        </button>
        {this.actionSave()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;
export default connect(mapStateToProps, tasksActions)(Save);
