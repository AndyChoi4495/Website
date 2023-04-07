import { Container, Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';



function MainNav() {
  const router = useRouter()
  const [searchField, setSearchField] = useState();
  const [rendered, setRendered] = useState(false);
  const [isExpanded, setIsExpanded ] = useState(false);

  let token = readToken();

  const handleNavClose = () => {
    setIsExpanded(false);
  };
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const changeSearch = (event) => {
    setSearchField(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken()
    router.push('/login');
  }

  return (
    <>
      <Navbar  bg="dark" variant="dark" className="fixed-top  color-nav" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Yunseok Choi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/"} >Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
              </Link> 
            </Nav>
          &nbsp;

        {token && <Form className="d-flex" onSubmit={submitForm} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={changeSearch}
            />
            <Button variant="outline-success">Search</Button>
          </Form>}
          &nbsp;
          
        {token && <Nav className="ml-auto" onClick={handleNavClose} >
            <NavDropdown title={token.userName} id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/favourites"} >Favourites</NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item>
              </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        }
            
          {!token && <Nav className="ml-auto">
              <Link href="/register" passHref legacyBehavior><Nav.Link>Register</Nav.Link></Link>
              <Link href="/login" passHref legacyBehavior><Nav.Link>Login</Nav.Link></Link>
            </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}

export default MainNav;
