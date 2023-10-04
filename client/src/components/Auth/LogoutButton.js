import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signOut } from "../../actions";

const LogoutButton = ({ signOut }) => {
  return (
    <Link to="/" onClick={signOut}>
      <div className="ui yellow animated fade button" tabIndex="0">
        <div className="visible content">Log Out</div>
        <div className="hidden content">
          <i className="sign-out icon"></i>
        </div>
      </div>
    </Link>
  );
};

export default connect(null, {
  signOut,
})(LogoutButton);
