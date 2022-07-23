import React from 'react';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RantList from './components/RantList';
import NewRant from './components/NewRant';
import { UserProvider } from './contexts/UserProvider';
import { RantProvider } from './contexts/RantProvider';

function App() {
  return (
    <UserProvider>
      <RantProvider>
        <div>
          <BrowserRouter>
              <nav>
                  <Link to="/signup">Sign Up</Link>
                  <span> | </span>
                  <Link to="/signin">Sign In</Link>
                  <span> | </span>
                  <Link to="/tweets">Tweet List</Link>
                  <hr></hr>
              </nav>
              <Routes>
                  <Route exact path="/" element={ <SignIn /> } />
                  <Route path="/signin" element={ <SignIn /> } />
                  <Route path="/signup" element={ <SignUp /> } />
                  <Route path="/tweets/new" element={ <NewRant /> } />
                  <Route path="/tweets" element={ <RantList /> } />
              </Routes>
          </BrowserRouter>
        </div>
      </RantProvider>
    </UserProvider>
  );
}

export default App;
