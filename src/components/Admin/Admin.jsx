import PostAdmin from "./PostAdmin/PostAdmin"
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features/posts/postsSlice";
import { getAllUsers, deleteUser } from "../../features/auth/authSlice";
import { getAllActivities, deleteActivity } from "../../features/activities/activitiesSlice";
import { useEffect, useState } from "react";
import { notification } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import './Admin.css';

const Admin = () => {
    const dispatch = useDispatch();
    const { allUsers, isLoading } = useSelector((state) => state.auth);
    const {allActivities, isLoading:activitiesLoading} = useSelector((state) => state.activities)
    const [showUsers, setShowUsers] = useState(false);
    const [showActivities, setShowActivities] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const showSuccessNotification = (message) => {
        api.success({
            message: 'Éxito',
            description: message,
            icon: <CheckCircleFilled style={{ color: '#52c41a' }} />
        });
    };

    const showErrorNotification = (message) => {
        api.error({
            message: 'Error',
            description: message,
            icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />
        });
    };

    const getPosts = () => {
        dispatch(getAllPosts());
    };

    const handleShowUsers = () => {
        dispatch(getAllUsers());
        setShowUsers(true);
    };

    const handleShowActivities = () =>{
        dispatch(getAllActivities())
        setShowActivities(true);
    }

    const handleDeleteActivity = (id) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
            dispatch(deleteActivity(id));
        }
    };

    const handleDeleteUser = async (id) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await dispatch(deleteUser(id)).unwrap();
                showSuccessNotification('Usuario eliminado correctamente');
                dispatch(getAllUsers());
            } catch (error) {
                showErrorNotification('Error al eliminar el usuario');
            }
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="admin-container">
            {contextHolder}
            <div className="admin-header">
                <h1>Tu zona de administrador</h1>
            </div>
            <div className="admin-section">
                <PostAdmin />
            </div>
            
            <div className="admin-section-users-management">
                <div className="section-header">
                    <h2>Gestión de Usuarios</h2>
                    <button 
                        className="show-users-button" 
                        onClick={handleShowUsers}
                        disabled={showUsers && isLoading}
                    >
                        {showUsers ? (isLoading ? 'Cargando...' : 'Actualizar Usuarios') : 'Ver Usuarios'}
                    </button>
                </div>

                {showUsers && (
                    <div className="users-content">
                        {isLoading ? (
                            <div className="loading-state">Cargando usuarios...</div>
                        ) : (
                            <div className="users-grid">
                                {Array.isArray(allUsers) && allUsers.length > 0 ? (
                                    allUsers.map((user) => (
                                        <div key={user._id} className="user-card">
                                            <div className="user-info">
                                                <p><strong>Nombre:</strong> {user.name}</p>
                                                <p><strong>Email:</strong> {user.email}</p>
                                                <p><strong>ID:</strong> {user._id}</p>
                                                <button 
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="delete-user-button"
                                                >
                                                    Eliminar Usuario
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-users-message">
                                        No hay usuarios para mostrar
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="admin-section-activities-management">
                <div className="section-header">
                    <h2>Gestión de Actividades</h2>
                    <button 
                        className="show-users-button" 
                        onClick={handleShowActivities}
                        disabled={showActivities && activitiesLoading}
                    >
                        {showActivities ? (activitiesLoading ? 'Cargando...' : 'Actualizar Actividades') : 'Ver Actividades'}
                    </button>
                </div>

                {showActivities && (
                    <div className="users-content">
                        {activitiesLoading ? (
                            <div className="loading-state">Cargando actividades...</div>
                        ) : (
                            <div className="users-grid">
                                {Array.isArray(allActivities) && allActivities.length > 0 ? (
                                    allActivities.map((activity) => (
                                        <div key={activity._id} className="user-card">
                                            <div className="user-info">
                                                <p><strong>Título:</strong> {activity.title}</p>
                                                <p><strong>Descripción:</strong> {activity.description}</p>
                                                <p><strong>Fecha:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                                                <button 
                                                    className="delete-button"
                                                    onClick={() => handleDeleteActivity(activity._id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-users-message">
                                        No hay actividades para mostrar
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin