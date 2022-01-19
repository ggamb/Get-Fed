import React from "react";
import logo from "../../utils/images/logo.png";

function Jumbotron({ children }) {
  return (
    <div className="hero"
      style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
    >
    
      {children}
    </div>
  );
}

export default Jumbotron;
