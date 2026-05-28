import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import OrderHistory from '../components/OrderHistory';
import Header from '../components/Header';
import { authAPI } from '../services/api';

const ProfilePage = () => {
    const { user, checkAuth } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'orders') {
            setActiveTab('orders');
        }
    }, [searchParams]);

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
            <div className="min-h-screen">
                <Header />
                <div className="flex justify-center items-center h-[80vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                        <div className="text-xl">Загрузка профиля...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const displayUser = profileData || user;

    return (
        <div className="min-h-screen">
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Вкладки */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                                activeTab === 'profile' 
                                    ? 'text-cyan-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Профиль
                            {activeTab === 'profile' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                                activeTab === 'orders' 
                                    ? 'text-cyan-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Заказы
                            {activeTab === 'orders' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600"></div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Контент вкладок */}
                {activeTab === 'profile' ? (
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
                                    className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"
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
                ) : (
                    <OrderHistory />
                )}
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
        </div>
    );
};

export default ProfilePage;