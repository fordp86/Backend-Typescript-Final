import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RantList from './components/RantList';
import NewRant from './components/NewRant';
import UpdateRant from './components/UpdateRant';
import { UserProvider } from './contexts/UserProvider';
import { RantProvider } from './contexts/RantProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <UserProvider>
      <RantProvider>
        <div>
          <BrowserRouter>
              <Navbar bg="light" expand="lg">
                <Container>
                  <Navbar.Brand href="/">Reactbook</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link href="/signup">Sign Up</Nav.Link>
                      <Nav.Link href="/signin">Sign In</Nav.Link>
                      <NavDropdown title="Rants" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/rants">Rant List</NavDropdown.Item>
                        <NavDropdown.Item href="/rants/new">
                          Create Rant
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
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
              </Routes>
          </BrowserRouter>
        </div>
      </RantProvider>
    </UserProvider>
  );
}

export default App;
