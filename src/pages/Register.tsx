import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerRoute } from "../utils/APIRoutes";
import { AuthInput, initialRegisterInputValues } from "../types/AuthInput";
import { toastOptions } from "../config/toastOptions";
import axios from "axios";
import Logo from "../assets/logo.svg";

export const Register = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<AuthInput>(
    initialRegisterInputValues
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const newInputValues = {
      ...inputValues,
      [event.target.name]: event.target.value,
    };
    setInputValues(newInputValues);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, inputValues);
      if (data.status) {
        localStorage.setItem("chatapp-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.msg, toastOptions);
      }
    } else {
      setInputValues(initialRegisterInputValues);
    }
  }

  function handleValidation(): boolean {
    let isValid: boolean = true;
    if (inputValues.password !== inputValues.confirmPassword) {
      isValid = false;
      toast.error(
        "Password and confirm password should be the same",
        toastOptions
      );
    }
    if (inputValues.password.length < 8) {
      isValid = false;
      toast.error("Password should be at least 8 characters", toastOptions);
    }
    if (inputValues.email === "") {
      isValid = false;
      toast.error("Use a valid email!", toastOptions);
    }
    return isValid;
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="h-screen w-screen flex flex-col justify-center gap-[1rem] items-center bg-[#131324]"
      >
        <div className="flex items-center gap-[1rem] justify-center">
          <img src={Logo} alt="snappy logo" className="h-[5rem]" />
          <h1>snappy</h1>
        </div>

        {/* username input */}
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          value={inputValues.username}
          required
        />
        {/* email input */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={inputValues.email}
          required
        />
        {/* password input */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
          value={inputValues.password}
          required
        />
        {/* confirm password input */}
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
          value={inputValues.confirmPassword}
          required
        />

        {/* submit and login button */}
        <button type="submit" className="text-white">
          Create account
        </button>
        <span className="text-white">
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>

      <ToastContainer />
    </>
  );
};
