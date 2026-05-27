import React, { createContext, useState, useContext, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    // Проверка авторизации через специальный эндпоинт
    const checkAuth = useCallback(async () => {
        // Если уже проверяли и пользователь авторизован, не проверяем снова
        if (isAuthChecked && user) {
            return user;
        }

        setLoading(true);
        try {
            // Используем check-auth вместо profile для проверки
            const response = await authAPI.checkAuth();
            
            if (response.data.is_authenticated) {
                setUser(response.data.user);
                setIsAuthChecked(true);
                return response.data.user;
            } else {
                setUser(null);
                setIsAuthChecked(true);
                return null;
            }
        } catch (error) {
            // Даже при ошибке считаем что проверили
            setUser(null);
            setIsAuthChecked(true);
            return null;
        } finally {
            setLoading(false);
        }
    }, [isAuthChecked, user]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await authAPI.login({ email, password });
            setUser(response.data.user);
            setIsAuthChecked(true);
            return response.data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await authAPI.register(userData);
            setUser(response.data.user);
            setIsAuthChecked(true);
            return response.data;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
        setIsAuthChecked(false);
        try {
            await authAPI.logout();
        } catch (error) {
            console.log('Logout completed');
        }
    };

    const updateProfile = async (userData) => {
        const response = await authAPI.updateProfile(userData);
        setUser(response.data.user);
        return response.data;
    };

    const changePassword = async (passwordData) => {
        const response = await authAPI.changePassword(passwordData);
        return response.data;
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            register, 
            logout, 
            updateProfile, 
            changePassword,
            checkAuth,
            loading,
            isAuthChecked
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};