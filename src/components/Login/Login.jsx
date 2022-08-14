import React from "react";
import { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  let [errApi, setErrApi] = useState("");
  let [errVa, setErrVa] = useState([]);
  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function sendUserData(e) {
    e.preventDefault();
    setLoading(true);
    let validateUser = validate();
    if (validateUser.error == null) {
      setLoading(true);
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      if (data.message == "success") {
        navigate("/home");
        localStorage.setItem("userToken", data.token);
        setLoading(false);
      } else {
        setErrApi(data.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrVa(validateUser.error.details);
    }
  }
  function validate() {
    let validateResult = Joi.object({
      email: Joi.string()
        .email({ tlds: ["com", "net"] })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{0,9}$"))
        .required(),
    });
    return validateResult.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className=" container mx-auto  w-50 my-5 py-5">
        <h2 className=" text-center">Log in</h2>
        {errApi ? (
          <h3 className=" text-danger text-center">
            {errApi.toLocaleUpperCase()}
          </h3>
        ) : (
          ""
        )}
        <form onSubmit={sendUserData}>
          {/* email */}
          <div>
            <label htmlFor="email" className="ms-3 w-50 fw-bold mt-2 ">
              {" "}
              Email
            </label>
            <input
              type="email"
              onChange={getUserData}
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
          {/* end email */}
          {/* password */}
          <div>
            <label htmlFor="password" className="ms-3 w-50 fw-bold mt-2 ">
              {" "}
              Password
            </label>
            <input
              type="password"
              onChange={getUserData}
              placeholder=" Enter your password ...."
              name="password"
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
          </div>
          {/* end password */}
          <button className=" btn btn-info w-100 rounded-5 mt-2" type="submit">
            {loading ? (
              <i className="fa-solid fa-spinner  fa-spin text-white"></i>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
