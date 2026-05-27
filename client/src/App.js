import './input.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import HomePage from './pages2/HomePage'
import Contacts from './pages2/Contacts'
import Catalogue from './pages2/Catalogue'
import ProfilePage from './pages2/ProfilePage'
import CartPage from './pages2/CartPage'
import NotFoundPage from './pages2/NotFoundPage';


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