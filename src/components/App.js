import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./menu";
import Users from "./Users/Users";
import Publications from "./Publications/Publications";
import Tasks from "./Tasks/Tasks";
import TasksSave from "./Tasks/Save";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="margen">
        <Route exact path="/" component={Users} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/tasks/save" component={TasksSave} />
        <Route exact path="/tasks/save/:userId/:taskId" component={TasksSave} />
        <Route
          exact
          path="/usuarios/:key/publicaciones/"
          component={Publications}
        />
      </div>
    </BrowserRouter>
  );
}
