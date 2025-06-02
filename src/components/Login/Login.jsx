import React, { useState } from "react";
import {useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import "./Login.css";


const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: ""});

    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = async (formData) => {
        try {
          // Aquí puedes realizar la lógica para autenticar, por ejemplo, haciendo un request a una API.
          await dispatch(login(formData)); // Suponiendo que dispatch maneja el login
    
          // Si el login es exitoso
          notification.success({
            message: "Login Successful",
            description: "You have successfully logged in!",
            placement: "topRight",
            duration: 2,
          });
    
          // Redirigir a la página principal después del login
          setTimeout(() => {
            navigate("/home"); // Redirige a la página que desees
          }, 2000);
    
        } catch (error) {
          // Si hay algún error durante el login
          notification.error({
            message: "Login Failed",
            description: "There was an error logging in. Please try again.",
            placement: "topRight",
            duration: 2,
          });
        }
      };
    

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

            <button type="submit" className="login-button">Login</button>
        </form>

    );

};

export default Login;