import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signOut } from "../actions"

const LogoutButton = ({ signOut }) => {
  return (
    <Link to="/" onClick={signOut}>
      <div class="ui yellow animated fade button" tabindex="0">
        <div class="visible content">
          Log Out
        </div>
        <div class="hidden content">
          <i class="sign-out icon"></i>
        </div>
      </div>
    </Link>
  )
}


export default connect(null, {
  signOut
})(LogoutButton)