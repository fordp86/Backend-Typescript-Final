import React from 'react';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TweetList from './components/TweetList';
import NewTweet from './components/NewTweet';
import { UserProvider } from './contexts/UserProvider';
import { TweetProvider } from './contexts/TweetProvider';

function App() {
  return (
    <UserProvider>
      <TweetProvider>
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
                  <Route path="/tweets/new" element={ <NewTweet /> } />
                  <Route path="/tweets" element={ <TweetList /> } />
              </Routes>
          </BrowserRouter>
        </div>
      </TweetProvider>
    </UserProvider>
  );
}

export default App;
