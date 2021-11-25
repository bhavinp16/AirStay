import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import usercontext from './Context/User/usercontext';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import RoomDetail from './Pages/RoomDetail';
import Search from './Pages/Search';
import HostRoom from './Pages/HostRoom';

function App() {

  const context = useContext(usercontext)
  const { user, setuser } = context;
  setuser(false) // temporary to bypass login page

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
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
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
                </>
              )}
          </Routes>

        </div>

      </BrowserRouter>
    </Fragment>
  );
}

export default App;
