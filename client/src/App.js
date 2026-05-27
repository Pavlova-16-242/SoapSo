import './input.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/HomePage'
import Contacts from './pages/Contacts'
import Catalogue from './pages/Catalogue'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/contacts' element={<Contacts/>}></Route>
            <Route path='/catalogue' element={<Catalogue/>}></Route>
            <Route path='/profile' element={<ProfilePage/>}></Route>
            <Route path='/cart' element={<CartPage/>}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </CartProvider>
        </AuthProvider>          
      </BrowserRouter>        
    </div>
  );
}

export default App;