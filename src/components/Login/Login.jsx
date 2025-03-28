import React, { useState } from "react";
import {useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: ""});

    const { email, password } = formData;


    const dispatch = useDispatch();
    const navigate = useNavigate();

     const onLogin = (formData) => {
        dispatch(login(formData));
        setTimeout(() => {
          navigate("/profile")
        }, 1000);
      }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onLogin(formData)
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange} />
            <input type="password" name="password" value={password} onChange={onChange} />

            <button type="submit">Login</button>
        </form>

    );

};

export default Login;