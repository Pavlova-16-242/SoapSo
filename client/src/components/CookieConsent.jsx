import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Проверяем, было ли уже принято согласие
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Показываем с задержкой для плавности
            setTimeout(() => setIsVisible(true), 500);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50">
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-xl 
                            animate-slide-in">
                <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">🍪</span>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                            Мы используем куки
                        </h3>
                        <p className="text-sm text-gray-600">
                            Продолжая использовать сайт, вы соглашаетесь на обработку 
                            файлов cookie в соответствии с нашей политикой. 
                            Это необходимо для авторизации, корзины и оформления заказов.
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button
                        onClick={handleAccept}
                        className="flex-1 bg-cyan-600 text-white py-2.5 px-4 rounded-xl hover:bg-cyan-700 
                                   transition-colors font-medium text-sm"
                    >
                        Хорошо, принимаю
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;