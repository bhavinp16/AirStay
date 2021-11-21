import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import usercontext from './Context/User/usercontext';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {

  const context = useContext(usercontext)
  // const { user } = context;
  const user = false; // temporary to bypass login page

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
                  {/* <Route path="/room/:name" component={RoomDetail} /> */}
                </>
              )}
          </Routes>

        </div>

      </BrowserRouter>
    </Fragment>
  );
}

export default App;
