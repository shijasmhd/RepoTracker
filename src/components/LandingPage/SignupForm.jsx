import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { authUrl } from "@/config";
import { useNavigate } from "react-router-dom";
import useLoginData from "@/hooks/useLoginData";

const SignupForm = () => {
  const [emailTaken, setEmailTaken] = useState(false);
  const navigate = useNavigate();
  const [, setLogInData] = useLoginData();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setEmailTaken(false);
      try {
        await axios.post(authUrl + "register", {
          userName: values.email,
          password: values.password,
        });

        setLogInData(null);
        navigate("/login");
        window.location.reload();
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "userName already taken"
        ) {
          setEmailTaken(true);
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          required
          className={`w-full px-3 py-2 border ${
            emailTaken ? "border-destructive" : "border-gray-300"
          } rounded-md text-black`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-destructive text-sm">{formik.errors.email}</div>
        ) : null}
        {emailTaken && (
          <div className="text-destructive text-sm">
            Email is already taken, please choose another one.
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-destructive text-sm">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-destructive text-sm">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
