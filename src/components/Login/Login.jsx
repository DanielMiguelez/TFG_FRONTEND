import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import 'antd/dist/reset.css';  
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: ""});
    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    const showSuccessNotification = () => {
        api.success({
            message: 'Login Exitoso',
            description: 'Has iniciado sesión correctamente',
            icon: (
                <CheckCircleFilled 
                    style={{ 
                        color: '#008000 !important',
                        fontSize: '24px',
                    }}
                    className="success-icon"
                />
            ),
            placement: 'topRight',
            duration: 3,
            className: 'custom-success-notification',
            style: {
                borderRadius: '8px',
            },
        });
    };

    const showErrorNotification = (errorMessage) => {
        api.error({
            message: 'Error de Login',
            description: errorMessage || 'Error al iniciar sesión',
            icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '24px' }} />,
            placement: 'topRight',
            duration: 3,
            style: {
                borderRadius: '8px',
            },
        });
    };

    const onLogin = async (formData) => {
        try {
            const result = await dispatch(login(formData)).unwrap();
            console.log("Login successful:", result);
            
            if (result) {
                showSuccessNotification();
                setTimeout(() => {
                    navigate("/home");
                }, 1500);
            }
        } catch (error) {
            console.log("Login error:", error);
            showErrorNotification(error?.message);
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
        onLogin(formData);
    };

    return (
        <>
            {contextHolder}
            <div className="loginForm">
                <h3>Inicia sesión en tu cuenta</h3>
                <form onSubmit={onSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder="Email"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder="Contraseña"
                    />
                    <br />
                    <span>¿Olvidaste tu contraseña?</span>
                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;