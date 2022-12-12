/**
 * Title: Main App file
 */
import { useEffect } from 'react';
import './App.css';
// imports
import { Routes,Route,useLocation } from 'react-router-dom';
// import pages
import ErrorPage from "./pages/error/error-page.component";
import HomePage from './pages/home/home-page.component';
import MainAppBar from './components/app-bar/app-bar.component';
import HistoryPage from './pages/history/history.component';
import GameProducts from './pages/game-product/game-product.component';
import OrderPage from './pages/order/order-page.component';
import SignupPage from './pages/signup-page/signup-page.component';
import LoginPage from './pages/login-page/login-page.component';
import AnnouncementPage from './pages/announcement/announcement.page.component';
import ProfilePage from './pages/profile/profile.page.component';
import OrderMessagePage from './pages/order-message/order-message-page.component';

import config from './config';

// state
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectAuthToken } from './redux/auth/auth.selector';
import { orderFetchStartByIdAsync } from "./redux/order/order.action";
import { setNotification } from "./redux/notification/notification.action";
import { selectNotification } from "./redux/notification/notification.selector";


import {io} from "socket.io-client";
import { useSnackbar } from 'notistack';

// get notification function
import { getPermission, showNotification } from "./hook/notify";



const App = ({auth, orderFetchStartByIdAsync, notification, setNotification}) => {

  // for notification
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();


  const bottomBarWith = ["/", "/history", "/profile", "/announcement"];


  // create socket

  const socket = io(`${config.API_DOMAIN}`, {
    transports: ['websocket']
  });
    
  // listening to socket
  useEffect(() => {
      if(auth) {
        socket.on(auth.uid, (msg) => {
          if(msg === "order") {
            orderFetchStartByIdAsync(auth.uid);
            if(auth.userType === "seller" || auth.userType === "admin") {
              enqueueSnackbar("You have new order ", {variant: "info"});
              showNotification("You have new order");
            }
            setNotification({
              order: true
            });
          }
        })
      }
  }, [socket]);

  return (
   <div className='app'>
      <Routes>
          {/* admin route only admin can access this routes */}
          <Route path='/' element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/game/product/:id" element={<GameProducts />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/messages/:id" element={<OrderMessagePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/announcement' element={<AnnouncementPage />} />
          <Route path='*' element={<ErrorPage />} />
      </Routes>

    {/* main app bar components */}

    {
      bottomBarWith.includes(location.pathname) &&
      <MainAppBar notification={notification} />
    }

   </div>
  );
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuthToken,
  notification: selectNotification
})

const mapDispatchToProps = dispatch => ({
  orderFetchStartByIdAsync: (id) => dispatch(orderFetchStartByIdAsync(id)),
  setNotification: (notification) => dispatch(setNotification(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
