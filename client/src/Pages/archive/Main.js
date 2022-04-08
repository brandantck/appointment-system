import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import server from "../apis/server";

import Table from "../components/Table";

import { incrementCounter, decrementCounter } from "../actions";

const Main = ({ incrementCounter, decrementCounter, isSignedIn, userId }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
            style: {backgroundColor: 'red'},
            Cell: e =><div className="ui icon button"onClick={(e) => {console.log(e.value)}}>{e.value}</div>
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      { firstName: "bran", lastName: "tan" },
      { firstName: "john", lastName: "ming" },
      { firstName: "doe", lastName: "kho" },
      { firstName: "jane", lastName: "lee" },
    ],
    []
  );

  const sendReq = async () => {
    const response = await server.get('/');

    console.log(response);
  }

  return (
    <div className="row">
      <div className="eight wide column">
        <div className="ui header">Main</div>
        <div className="ui dividing header">Welcome {userId}!</div>
        <div className="ui stackable three column grid">
          <div className="column">
            {userId.split("").map((char) => {
              return <div className="ui content">Content 1| {char}</div>;
            })}
          </div>
          <div className="column">
            {userId
              .split("")
              .reverse()
              .map((char) => {
                return <div className="ui content">Content 2| {char}</div>;
              })}
              <button onClick={sendReq} className="ui button primary">Button</button>
          </div>
          <div className="column">
            <Table data={data} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {})(Main);
