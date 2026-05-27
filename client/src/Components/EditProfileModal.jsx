import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const EditProfileModal = ({ onClose }) => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || ''
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
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Отправляем только измененные поля
            const updatedData = {};
            
            if (formData.username !== (user.username || '')) {
                updatedData.username = formData.username;
            }
            if (formData.email !== (user.email || '')) {
                updatedData.email = formData.email;
            }
            if (formData.phone !== (user.phone || '')) {
                updatedData.phone = formData.phone || null;  // Отправляем null если поле пустое
            }

            if (Object.keys(updatedData).length === 0) {
                setError('Нет изменений для сохранения');
                setLoading(false);
                return;
            }

            await updateProfile(updatedData);
            setSuccess('Профиль успешно обновлен!');
            
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            const errorData = err.response?.data;
            if (errorData) {
                if (errorData.username) {
                    setError(errorData.username.join(' '));
                } else if (errorData.email) {
                    setError(errorData.email.join(' '));
                } else if (errorData.phone) {
                    setError(errorData.phone.join(' '));
                } else if (errorData.error) {
                    setError(errorData.error);
                } else {
                    setError('Ошибка при обновлении профиля');
                }
            } else {
                setError('Ошибка соединения с сервером');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Редактировать профиль</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Имя (необязательно)
                      </label>
                      <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Будет сгенерировано из email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                          Если оставить пустым, имя создастся автоматически
                      </p>
                  </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Телефон (необязательно)
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+7 (999) 123-45-67"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                    >
                        {loading ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;