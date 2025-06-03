import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        password: "", 
        birthday: "" 
    });

    const { name, email, password, birthday } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const showSuccessNotification = () => {
        api.success({
            message: 'Registro Exitoso',
            description: 'Tu cuenta ha sido creada correctamente',
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
            message: 'Error en el Registro',
            description: errorMessage || 'Error al crear la cuenta',
            icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '24px' }} />,
            placement: 'topRight',
            duration: 3,
            style: {
                borderRadius: '8px',
            },
        });
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(register(formData)).unwrap();
            if (result) {
                showSuccessNotification();
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            console.log("Register error:", error);
            showErrorNotification(error?.message);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="registerForm">
                <h3>Crear una cuenta</h3>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange={onChange} 
                        placeholder="Nombre"
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder="Email"
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder="Contraseña"
                        required 
                    />
                    <input 
                        type="date" 
                        name="birthday" 
                        value={birthday} 
                        onChange={onChange} 
                        placeholder="Fecha de nacimiento"
                        required 
                    />
                    <button type="submit" className="register-button">
                        Registrarse
                    </button>
                </form>
            </div>
        </>
    );
};

export default Register;