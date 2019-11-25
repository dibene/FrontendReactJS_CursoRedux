import React from "react";

export const Table = props => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {props.headers.map((h,i) => (
              <th key={i}>{h.value}</th>
            ))}
            { props.actions && <th>Acciones</th> }
          </tr>
        </thead>
        <tbody>
          {props.body && props.body.map((e,key) => (
            <tr key={e.id} >
              {props.headers && props.headers.map((h,i) => (
                <td key={i}>{e[h.name]}</td>
              ))}
              {props.actions && props.actions.map((a,i) => (
                <td key={i}>{a(key)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
