import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/css/login.css';
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
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              ) :
              (
                <>
                  <Route exact path="/" />
                  <Route path="/home" element={<Home />} />
                  {/* <Route path="/room/:name" component={RoomDetail} /> */}
                </>
              )}
          </Routes>

          {!user ?  //to redirect as per login status
            (<Navigate to="/login" />)
            :
            (<Navigate to="/home" />)
          }
        </div>

      </BrowserRouter>
    </Fragment>
  );
}

export default App;
