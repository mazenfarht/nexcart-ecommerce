import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "./../Utile/baseUrl";
import * as Yup from "yup";

export default function Login() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const nostify = (msg, type) => {
    toast[type](msg);
  };

  let validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  let loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/signin`, values)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            navigate("/home");
            nostify("Success", "success");
          }
        })
        .catch((error) => {
          setLoading(false);
          nostify("Something went wrong. Please try again! ", "error");
        });
    },
  });
  return (
    <>
      <div className="w-50 m-auto my-5 form">
        <h3>Login</h3>
        <form onSubmit={loginFormik.handleSubmit}>
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <input
            className="form-control my-3"
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="email"
            name="email"
            id="email"
          />

          {loginFormik.touched.email && loginFormik.errors.email ? (
            <div className="alert alert-danger">{loginFormik.errors.email}</div>
          ) : (
            ""
          )}

          <label className="text-white" htmlFor="password">
            Password
          </label>
          <div className="position-relative">
            <input
              className="form-control my-3"
              type={showPassword ? "text" : "password"}
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              name="password"
              id="password"
              autoComplete="new-password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#999",
              }}
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
          </div>
          {loginFormik.touched.password && loginFormik.errors.password ? (
            <div className="alert alert-danger">
              {loginFormik.errors.password}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={!(loginFormik.isValid && loginFormik.dirty)}
            className="btn btn-success my-3"
            type="submit"
          >
            {!loading ? "Login" : <i className="fas fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
