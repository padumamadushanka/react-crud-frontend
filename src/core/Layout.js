import React from "react";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children
}) => (
  <div className="default-body">
    <div className="jumbotron">
      <h1 className="layout-title">{title}</h1>
      <p className="jumbo-description">{description}</p>
    </div>
    <div className={className}>{children}</div>
    <div className="card text-center footer">
      <div className="card-body">
        <h5 className="card-title">developed by</h5>
        <p className="card-text">paduma madushanka</p>
      </div>
    </div>
  </div>
);

export default Layout;