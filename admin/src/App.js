/**
 * Title: Main App file
 */
// imports
import { Routes,Route } from 'react-router-dom';

// import pages
import ErrorPage from "./pages/error-page/error-page.component";

import AdminPage from './pages/admin/admin-page.component';

import Login from './pages/login-page/login-page.component'

import './App.css';


const App = () => {

  return (
   <div className='app'>
      <Routes>
          {/* admin route only admin can access this routes */}
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/' element={<Login />} />
          <Route path='*' element={<ErrorPage />} />
      </Routes>
   </div>
  );
}



export default App;
