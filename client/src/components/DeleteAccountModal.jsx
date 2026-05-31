import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const DeleteAccountModal = ({ onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!password) {
            setError('Введите пароль для подтверждения');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authAPI.deleteAccount(password);
            
            // Выходим из системы и перенаправляем на главную
            await logout();
            navigate('/');
        } catch (err) {
            const errorData = err.response?.data;
            if (errorData?.error) {
                setError(errorData.error);
            } else {
                setError('Ошибка при удалении аккаунта. Попробуйте позже.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl">
                {/* Заголовок */}
                <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">⚠️</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-800">
                                {step === 1 ? 'Удаление аккаунта' : 'Подтверждение паролем'}
                            </h2>
                            <p className="text-sm text-red-600">
                                Это действие необратимо
                            </p>
                        </div>
                    </div>
                </div>

                {/* Контент */}
                <div className="p-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-2">
                            <span className="flex-shrink-0">❌</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {step === 1 ? (
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-800 font-medium mb-2">
                                    Вы уверены, что хотите удалить аккаунт?
                                </p>
                                <ul className="text-sm text-red-700 space-y-1.5 list-disc list-inside">
                                    <li>Все ваши данные будут безвозвратно удалены</li>
                                    <li>История заказов будет стерта</li>
                                    <li>Корзина будет очищена</li>
                                    <li>Восстановить аккаунт будет невозможно</li>
                                </ul>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={() => {
                                        setStep(2);
                                        setError('');
                                    }}
                                    className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    Продолжить
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <p className="text-amber-800 text-sm">
                                    Для подтверждения введите ваш пароль
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль</label>
                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Введите ваш пароль"
                                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        setPassword('');
                                        setError('');
                                    }}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    disabled={loading}
                                >
                                    Назад
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={loading || !password}
                                    className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Удаление...
                                        </span>
                                    ) : (
                                        'Удалить аккаунт'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;