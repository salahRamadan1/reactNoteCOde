import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  let navigate = useNavigate();
  function remove() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg   shadow-lg fixed-top">
        <div className="container  ">
          <a className="navbar-brand fw-bolder">Note</a>
          <div className="dropdown">
            <button
              className="btn   #43a1cd dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"login"}>
                  Log in
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"register"}>
                  Register
                </Link>
              </li>
              {localStorage.getItem("userToken") == null ? (
                ""
              ) : (
                <li>
                  <a className="dropdown-item" onClick={remove}>
                    Log Out
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
