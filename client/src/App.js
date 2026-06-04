import './input.css'
import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from './components/Toast';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Pay = lazy(() => import('./pages/Pay'));
const How = lazy(() => import('./pages/How'));
const Refund = lazy(() => import('./pages/Refund'));

const Loading = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
    </div>
);

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <HashRouter>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/contacts' element={<Contacts/>}></Route>
                    <Route path='/catalogue' element={<Catalogue/>}></Route>
                    <Route path='/profile' element={<ProfilePage/>}></Route>
                    <Route path='/cart' element={<CartPage/>}></Route>
                    <Route path='/pay' element={<Pay/>}></Route>
                    <Route path='/how' element={<How/>}></Route>
                    <Route path='/refund' element={<Refund/>}></Route>
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </ToastProvider>
            </CartProvider>
          </AuthProvider>          
        </HashRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;