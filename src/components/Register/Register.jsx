import axios from "axios";
import Joi from "joi";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  let passwords = document.getElementById("password");
  let showPasswords = document.getElementById("showPassword");
  let [errVa, setErrVa] = useState([]);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let [errApi, setErrApi] = useState("");
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
  });
  function passwordAll() {
    if (showPasswords.innerHTML == "hide Password") {
      fadePassword();
    } else {
      showPassword();
    }
  }
  function showPassword() {
    passwords.type = "text";
    showPasswords.innerHTML = "hide Password";
  }
  function fadePassword() {
    passwords.type = "password";
    showPasswords.innerHTML = "Show Password";
  }
  function validUser() {
    var validData = Joi.object({
      first_name: Joi.string().min(2).max(15).required(),
      last_name: Joi.string().min(2).max(15).required(),
      email: Joi.string()
        .email({ tlds: ["com", "net"] })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{0,9}$"))
        .required(),
      age: Joi.number().min(16).max(80).required(),
    });
    // return validData.validate(user , {abortEarly:false})
    return validData.validate(user, { abortEarly: false });
  }
  function getUserForm(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function sendUserData(e) {
    let validResult = validUser();
    e.preventDefault();
    setLoading(true);
    if (validResult.error == null) {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );
      if (data.message == "success") {
        setLoading(false);
        console.log("hello");
        navigate("/login");
      } else {
        setLoading(false);
        setErrApi(data.message);
      }
    } else {
      setLoading(false);
      setErrVa(validResult.error.details);

      console.log(errVa);
    }
  }
  return (
    <>
      <div className="container mx-auto mt-5 py-5 ">
        <h2 className="text-center">Register Form</h2>
        {errApi ? (
          <p className="text-danger text-center">
            {`${errApi}`} <Link to={"/login"}> login</Link>{" "}
          </p>
        ) : (
          ""
        )}
        <form className=" w-50 mx-auto" onSubmit={sendUserData}>
          {/* first name */}
          <div>
            <label htmlFor="first_name" className="ms-3 w-50 fw-bold ">
              {" "}
              First name
            </label>
            <input
              type="text"
              onChange={getUserForm}
              placeholder=" Enter your first name ...."
              name="first_name"
              className=" form-control rounded-5"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "first_name") {
                return (
                  <p key={i} className="  t text-danger pt-1">
                    {el.message}
                  </p>
                );
              }
            })}
          </div>
          {/* end first name */}
          {/* last name */}
          <div>
            <label htmlFor="last_name" className="ms-3 w-50 fw-bold mt-2 ">
              {" "}
              Last name
            </label>
            <input
              type="text"
              onChange={getUserForm}
              placeholder=" Enter your last name ...."
              name="last_name"
              className=" form-control rounded-5"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "last_name") {
                return (
                  <p key={i} className="  t text-danger pt-1">
                    {" "}
                    {el.message}
                  </p>
                );
              }
            })}
          </div>
          {/* end last name */}
          {/* email   */}
          <div>
            <label htmlFor="email" className="ms-3 w-50 fw-bold mt-2 ">
              {" "}
              Email
            </label>
            <input
              type="email"
              onChange={getUserForm}
              placeholder=" Enter your email ...."
              name="email"
              className=" form-control rounded-5"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "email") {
                return (
                  <p key={i} className="    text-danger pt-2 ">
                    {el.message}
                  </p>
                );
              }
            })}
          </div>
          {/* end email   */}

          {/* age   */}
          <div>
            <label htmlFor="age" className="ms-3 w-50 fw-bold mt-2 ">
              {" "}
              Age
            </label>
            <input
              type="number"
              onChange={getUserForm}
              placeholder=" Enter your age ...."
              name="age"
              className=" form-control rounded-5"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "age") {
                return (
                  <p key={i} className="    text-danger pt-2 ">
                    {el.message}
                  </p>
                );
              }
            })}
          </div>
          {/* end age   */}
          {/* password   */}
          <div>
            <label htmlFor="password" className="ms-3 w-50 fw-bold mt-2 ">
              {" "}
              Password
            </label>
            <input
              type="password"
              onChange={getUserForm}
              placeholder=" Enter your password ...."
              name="password"
              id="password"
              className=" form-control rounded-5"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "password") {
                return (
                  <p key={i} className=" text-danger">
                    You must write the first capital letter, then numbers and
                    letters{" "}
                    <span className="text-primary">
                      {" "}
                      (the number of entries is 9 only)
                    </span>
                    <span className=" text-black"> Ex: Asde235</span>
                  </p>
                );
              }
            })}
            <a
              className=" d-flex justify-content-end showPassword  "
              id="showPassword"
              onClick={() => {
                passwordAll();
              }}
            >
              Show Password
            </a>
          </div>
          {/* end password   */}
          <button className=" btn btn-info mt-2 rounded-5 w-100" type="submit">
            {" "}
            {loading ? (
              <i className="fa-solid fa-spinner  fa-spin text-white"></i>
            ) : (
              " Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
