import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { baseUrl } from "../Utile/baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  let navigat = useNavigate();
  let [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const notify = (msg, type) => {
    toast[type](msg);
  };

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min 3 characters")
      .max(15, "Max 15 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must be strong"
      )
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  let registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/signup`, values)
        .then((res) => {
          if (res.status === 201) {
            setLoading(false);
            notify("Success", "success");
            navigat("/login");
          }
        })
        .catch((error) => {
          setLoading(false);
          notify(error.response.data.message, "error");
        });
    },
  });
  return (
    <>
      <div className="w-50 m-auto my-5 form">
        <h3>Register Now</h3>
        <form onSubmit={registerFormik.handleSubmit}>
          {/* *****************Name*************** */}
          <label className="text-white" htmlFor="name">
            Name
          </label>
          <input
            className="form-control my-3"
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            name="name"
            id="name"
          />
          {registerFormik.touched.name && registerFormik.errors.name ? (
            <div className="alert alert-danger">
              {registerFormik.errors.name}
            </div>
          ) : (
            ""
          )}
          {/* *****************Email*************** */}
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <input
            className="form-control my-3"
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            name="email"
            id="email"
          />
          {registerFormik.touched.email && registerFormik.errors.email ? (
            <div className="alert alert-danger">
              {registerFormik.errors.email}
            </div>
          ) : (
            ""
          )}
          {/* *****************Password*************** */}
          <label className="text-white" htmlFor="password">
            Password
          </label>
          <div className="position-relative">
            <input
              className="form-control my-3"
              type={showPassword ? "text" : "password"}
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
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
          {registerFormik.touched.password && registerFormik.errors.password ? (
            <div className="alert alert-danger">
              {registerFormik.errors.password}
            </div>
          ) : (
            ""
          )}
          {/* *****************RePassword*************** */}
          <label className="text-white" htmlFor="rePassword">
            Repassword
          </label>
          <input
            className="form-control my-3"
            value={registerFormik.values.rePassword}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {registerFormik.touched.rePassword &&
          registerFormik.errors.rePassword ? (
            <div className="alert alert-danger">
              {registerFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={!(registerFormik.isValid && registerFormik.dirty)}
            className="btn bg-main text-white my-2"
            type="submit"
          >
            {!loading ? "Register" : <i className="fas fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
