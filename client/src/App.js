import './input.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './Pages/HomePage.jsx'
import Contacts from './Pages/Contacts.jsx'
import Catalogue from './Pages/Catalogue.jsx'
import ProfilePage from './Pages/ProfilePage.jsx'
import CartPage from './Pages/CartPage.jsx'
import Page404 from './Pages/Page404.jsx'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/contacts' element={<Contacts/>}></Route>
        <Route path='/catalogue' element={<Catalogue/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
        <Route path='/404' element={<Page404/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;