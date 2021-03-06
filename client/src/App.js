import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import usercontext from './Context/User/usercontext';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import RoomDetail from './Pages/RoomDetail';
import Search from './Pages/Search';
import HostRoom from './Pages/HostRoom';
import MyWishlist from './Pages/MyWishlist';
import MyBooking from './Pages/MyBooking';
import CurratedList from './Pages/CurratedList';

function App() {

  const context = useContext(usercontext)
  const { user, setuser } = context;

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setuser(foundUser);
    }
  }, [setuser]);

  return (
    <Fragment>
      <BrowserRouter>
        <div>
          <Routes>
            {!user ?   // to show content as per login status
              (
                <>
                  {/* redirect to login if no user*/}
                  <Route exact path="/" element={<Navigate to="/login" />} />
                  <Route exact path="/home" element={<Navigate to="/login" />} />
                  <Route exact path="/hostRoom" element={<Navigate to="/login" />} />
                  <Route path="/search/:city" element={<Navigate to="/login" />} />
                  <Route path="/wishlist" element={<Navigate to="/login" />} />
                  <Route path="/mybookings" element={<Navigate to="/login" />} />
                  <Route path="/curratedList" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/room/:id" element={<RoomDetail />} />
                </>
              ) :
              (
                <>
                  <Route path="/login" element={<Navigate to="/home" />} />
                  <Route path="/signup" element={<Navigate to="/home" />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route exact path="/" />
                  <Route path="/home" element={<Home />} />
                  <Route path="/hostRoom" element={<HostRoom />} />
                  <Route path="/room/:id" element={<RoomDetail />} />
                  <Route path="/search/:location/" element={<Search />} />
                  <Route path="/wishlist" element={<MyWishlist />} />
                  <Route path="/mybookings" element={<MyBooking />} />
                  <Route path="/curratedList" element={<CurratedList />} />
                </>
              )}
          </Routes>

        </div>

      </BrowserRouter>
    </Fragment>
  );
}

export default App;
