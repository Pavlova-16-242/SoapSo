import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ChangePasswordModal = ({ onClose }) => {
    const { changePassword } = useAuth();
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password2: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.new_password !== formData.new_password2) {
            setError('Новые пароли не совпадают');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await changePassword({
                old_password: formData.old_password,
                new_password: formData.new_password,
                new_password2: formData.new_password2
            });
            
            setSuccess('Пароль успешно изменен!');
            setFormData({
                old_password: '',
                new_password: '',
                new_password2: ''
            });
            
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            const errorData = err.response?.data;
            if (errorData) {
                if (errorData.old_password) {
                    setError(errorData.old_password.join(' '));
                } else if (errorData.new_password) {
                    setError(errorData.new_password.join(' '));
                } else if (errorData.error) {
                    setError(errorData.error);
                } else {
                    setError('Ошибка при изменении пароля');
                }
            } else {
                setError('Ошибка соединения с сервером');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full m-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Изменить пароль</h2>
                    <button 
                        onClick={onClose} 
                        className="text-cyan-600 hover:text-cyan-900 text-5xl"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-cyan-600 mb-1">
                            Текущий пароль
                        </label>
                        <input
                            type="password"
                            name="old_password"
                            value={formData.old_password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600"
                            required
                        />

                        
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-600 mb-1">
                            Новый пароль
                        </label>
                        <input
                            type="password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyan-600 mb-1">
                            Повторите новый пароль
                        </label>
                        <input
                            type="password"
                            name="new_password2"
                            value={formData.new_password2}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 text-white py-2 px-4 rounded-xl hover:bg-cyan-700 transition-colors disabled:bg-cyan-300"
                    >
                        {loading ? 'Изменение...' : 'Изменить пароль'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;