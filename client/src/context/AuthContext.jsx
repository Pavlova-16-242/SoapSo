import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();
    const isLoggingOut = useRef(false);

    useEffect(() => {
        const initAuth = async () => {
            setLoading(true);
            try {
                const response = await authAPI.checkAuth();
                
                if (response.data.is_authenticated) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
            } finally {
                setIsAuthChecked(true);
                setLoading(false);
            }
        };

        initAuth();
    }, []);

const checkAuth = useCallback(async () => {
    if (isLoggingOut.current) return null;
    
    if (isAuthChecked && user) {
        return user;
    }

    setLoading(true);
    try {
        const response = await authAPI.checkAuth();
        
        if (response?.data?.is_authenticated && !isLoggingOut.current) {
            setUser(response.data.user);
            setIsAuthChecked(true);
            return response.data.user;
        } else {
            setUser(null);
            setIsAuthChecked(true);
            return null;
        }
    } catch (error) {
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
    
    navigate('/', { replace: true });
    
    setTimeout(() => {
        window.history.pushState(null, '', '/#/');
    }, 100);
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
            isAuthChecked,
            isLoggingOut: isLoggingOut.current
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