import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./menu";
import Users from "./Users/Users";
import Publications from "./Publications/Publications";

const Task = () => {
  return <div>Tasks..</div>;
};



export default function App() {
  return (
    <BrowserRouter>
        <Menu />
        <div className="margen">
          <Route exact path="/" component={Users} />
          <Route exact path="/task" component={Task} />
          <Route exact path="/usuarios/:key/publicaciones/" component={Publications} />
        </div>
    </BrowserRouter>
  );
}
