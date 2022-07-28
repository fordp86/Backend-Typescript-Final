import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RantList from './components/RantList';
import NewRant from './components/NewRant';
import UpdateRant from './components/UpdateRant';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';
import { UserProvider } from './contexts/UserProvider';
import { RantProvider } from './contexts/RantProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("myRantToken") ? flag=true : flag=false
   
    return flag
  }

  return (
    <UserProvider>
      <RantProvider>
        <div>
          <BrowserRouter>
              <Navbar expand="lg" id="nav">
                <Container className="p-3">
                  <Navbar.Brand href="/rants">Rantbook</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                      { (hasJWT()) ? 
                      <Nav>
                        <Nav.Link href="/rants">Rants</Nav.Link>
                        <Nav.Link href="/users/profiles">Users</Nav.Link>
                      </Nav>
                      :
                      <Nav>
                        <Nav.Link href="/signin">Sign In</Nav.Link> 
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/rants">Rants</Nav.Link>
                      </Nav>
                      }
                  </Navbar.Collapse>
                </Container>
              </Navbar>
              <Routes>
                  <Route exact path="/" element={ <SignIn /> } />
                  <Route path="/signin" element={ <SignIn /> } />
                  <Route path="/signup" element={ <SignUp /> } />
                  <Route path="/rants/new" element={ <NewRant /> } />
                  <Route path="/rants/:rantId" element={ <UpdateRant /> } />
                  <Route path="/rants" element={ <RantList /> } />
                  <Route path="/users/profiles/:userId" element={ <UserProfile /> } />
                  <Route path="/users/profiles/:userId/update" element={ <UpdateUser /> } />
                  <Route path="/users/profiles" element={ <UserList/> } />
              </Routes>
          </BrowserRouter>
        </div>
      </RantProvider>
    </UserProvider>
  );
}

export default App;
