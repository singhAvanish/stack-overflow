import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from '../../config/axiosConfig';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Auth/Auth.css"
import icon from "../../assets/icon.png";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("user/forgetPassword", values)
        .then((response) => {
          toast.success("Email sent successfully");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              toast.error("Email not found");
            } else {
              toast.error("Server error");
            }
          } else {
            toast.error("Network error");
          }
        });
    },
  });

  return (
    <section className="auth-section">

    
    <div className="auth-container-2">
    <img src={icon} alt="stack overflow" className="login-logo" />
      <h2>Forgot Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">
            <h4>Email address</h4>
            <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          </label>
         
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
       
          <button className="auth-btn" type="submit">Submit</button>
        
      </form>
    </div>
    </section>
  );
};

export default ForgotPassword;
