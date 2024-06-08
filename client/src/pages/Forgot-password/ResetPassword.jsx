import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Auth/Auth.css"
import icon from "../../assets/icon.png";

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required").min(6, "Too Short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { newPassword } = values;
      const token = window.location.pathname.split("/").pop();

      axios
        .post(`/user/reset-password/${token}`, { newPassword })
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.href = "/Auth";
          }, 3000);
        })
        .catch((error) => {
          toast.error("Your link has expired");
        });
    },
  });

  return (
    <section className="auth-section">

   
    <div className="auth-container-2">
    <img src={icon} alt="stack overflow" className="login-logo" />
      <h2>Reset Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="newPassword">
          <h4>New Password</h4>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          </label>
         
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div>{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="confirmPassword">
            <h4>Confirm Password</h4>
            <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          </label>
         
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        
          <button className="auth-btn" type="submit">Submit</button>
       
      </form>
    </div>
    </section>
  );
};

export default ResetPassword;
