import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useLoginData from "@/hooks/useLoginData";
import useLogInUser from "@/hooks/useLogInUser";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [logInData, setLogInData] = useLoginData();
  const { loginUser } = useLogInUser();

  useEffect(() => {
    if (logInData) {
      navigate("/dashboard");
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage("");
      loginUser(
        {
          userName: values.email,
          password: values.password,
        },
        {
          onSuccess: async (userData) => {
            await setLogInData(userData?.data);
            navigate("/dashboard");
          },
          onError: (error) => {
            setErrorMessage(error?.response?.data?.message);
          },
          onSettled: () => {
            setSubmitting(false);
          },
        }
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {errorMessage && (
        <div className="text-destructive text-sm mb-2">{errorMessage}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-destructive text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-destructive text-sm">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
