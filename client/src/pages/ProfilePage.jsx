import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import OrderHistory from '../components/OrderHistory';
import Header from '../components/Header';
import UpButton from '../components/UpButton';
import Footer from '../components/Footer';
import { authAPI } from '../services/api';
import DeleteAccountModal from '../components/DeleteAccountModal';
import SEO from '../components/SEO';

const ProfilePage = () => {
	const { user, logout, checkAuth } = useAuth();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [pageLoading, setPageLoading] = useState(true);
	const [profileData, setProfileData] = useState(null);
	const [isAuthChecked] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            if (!user && isAuthChecked) {
                setPageLoading(false);
                return;
            }
            
            setPageLoading(true);
            
            const userData = await checkAuth();
            
            if (userData) {
                try {
                    const profileResponse = await authAPI.getProfile();
                    setProfileData(profileResponse.data);
                } catch (error) {
                    if (error.response?.status !== 403) {
                        console.error('Error loading profile:', error);
                    }
                }
            }
            
            setPageLoading(false);
        };
        
        loadProfile();
    }, [checkAuth, user, isAuthChecked]);
    if (pageLoading) {
        return (
            <div className="min-h-screen bg-gray-100">
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
		<div className="">
      <SEO 
        title="Профиль"
        description="Купите натуральное мыло ручной работы: морская свежесть, овсяное молочко, лавандовое облако, мятный бриз и другие ароматы. Доставка по России."
      />			
			<Header />
			<UpButton/>
			<main className="max-w-7xl mx-auto px-4 py-16">
				<h1 className="font-serif text-6xl">Профиль</h1>
				<div className="flex place-items-center bg-white/70 lg:p-8 p-4 rounded-3xl my-4">
					<span className="lg:w-32 lg:h-32 w-24 h-24 lg:p-16 p-4 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold lg:text-7xl text-3xl">
						{user.username.charAt(0).toUpperCase()}
					</span>
					<div className="mx-8 w-full">
						<div className="flex-wrap">
							<div>
								<label className="lg:text-xl font-medium text-cyan-600">Имя</label>
								<p className="lg:text-2xl font-semibold mt-1">{displayUser.username}</p>
							</div>

							<div>
								<label className="lg:text-xl font-medium text-cyan-600">Email</label>
								<p className="lg:text-2xl font-semibold mt-1">{displayUser.email}</p>
							</div>

							<div>
								<label className="lg:text-xl font-medium text-cyan-600">Телефон</label>
								<p className="lg:text-2xl font-semibold mt-1">
									{displayUser.phone || 'Не указан'}
								</p>
							</div>
						</div>
					</div>
				</div>
					<div className="lg:grid grid-cols-6 gap-4 hidden">
						<h2 className="font-serif text-6xl pb-4 lg:col-start-2 lg:col-span-5">Мои заказы</h2>	
					</div>
					<div className="lg:grid grid-cols-6 gap-4">	
						<nav className="bg-white/70 p-8 rounded-3xl text-2xl mb-4 ">
							<button onClick={() => setShowEditModal(true)} className="group relative lg:text-left text-center">
								<span className="hover:font-semibold duration-300 ">Редактировать профиль</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span>
							</button><br/>
							<button onClick={() => setShowPasswordModal(true)} className="group relative lg:text-left text-center">
								<span className="hover:font-semibold duration-300 ">Изменить пароль</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span>
							</button><br/>
							<button onClick={logout} className="group relative text-red-500 hover:text-red-700 lg:text-left text-center">
								<span className="hover:font-semibold duration-300">Выйти</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span>
							</button><br/>
							<button onClick={() => setShowDeleteModal(true)} className="group relative mt-16 text-red-500 hover:text-red-700 lg:text-left text-center">
								<span className="hover:font-semibold duration-300 ">Удалить аккаунт</span>
								<span className="absolute left-0 bottom-1 h-[2px] w-full scale-x-0 origin-left bg-current duration-300 group-hover:scale-x-100"></span>
							</button>
							<p className="text-xs text-gray-400">Это действие нельзя отменить</p>
						</nav>	
					<div className="lg:hidden grid-cols-6 gap-4 ">
						<h2 className="font-serif text-6xl pb-4 col-start-2 lg:col-span-5">Мои заказы</h2>	
					</div>
					<OrderHistory />
					</div>
			</main>
			<Footer />

			{showEditModal && (
				<EditProfileModal 
					onClose={() => setShowEditModal(false)}
					onProfileUpdate={(newData) => setProfileData(newData)}
				/>
			)}
			
			{showPasswordModal && (
				<ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
			)}

			{showDeleteModal && (
					<DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
			)}
		</div>
	);
};

export default ProfilePage;