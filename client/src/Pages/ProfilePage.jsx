import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { authAPI } from '../services/api';
import Header from "../components/Header.jsx"
import UpButton from "../components/UpButton.jsx"
import Footer from "../components/Footer.jsx"


const ProfilePage = () => {
    const { user, checkAuth } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            setPageLoading(true);
            
            const userData = await checkAuth();
            
            if (userData) {
                try {
                    const profileResponse = await authAPI.getProfile();
                    setProfileData(profileResponse.data);
                } catch (error) {
                    console.error('Error loading profile:', error);
                }
            }
            
            setPageLoading(false);
        };
        
        loadProfile();
    }, [checkAuth]);

    if (pageLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <div className="text-xl">Загрузка профиля...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    const displayUser = profileData || user;

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Навигация */}
            <Header/>
            <UpButton/>
            {/* Профиль */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h1 className="text-2xl font-bold">Профиль пользователя</h1>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Имя</label>
                                <p className="text-lg font-semibold mt-1">{displayUser.username}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-lg font-semibold mt-1">{displayUser.email}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Телефон</label>
                                <p className="text-lg font-semibold mt-1">
                                    {displayUser.phone || 'Не указан'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Редактировать профиль
                            </button>
                            
                            <button
                                onClick={() => setShowPasswordModal(true)}
                                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Изменить пароль
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальные окна */}
            {showEditModal && (
                <EditProfileModal 
                    onClose={() => setShowEditModal(false)}
                    onProfileUpdate={(newData) => setProfileData(newData)}
                />
            )}
            
            {showPasswordModal && (
                <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
            )}
                  <Footer/>
        </div>
    );
};

export default ProfilePage;