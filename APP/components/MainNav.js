import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "../lib/userData";
import { readToken, removeToken } from "../lib/Authenticate";

export default function MainNav() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('Route is changing to:', url);
    };

    const handleRouteChangeComplete = (url) => {
      console.log('Route change complete. Current URL:', url);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false);
    if (search) {
      router.push(`/artwork?title=true&q=${search}`);
    }
    let queryString = `title=true&q=${search}`;
    setSearchHistory((current) => [...current, queryString]);
    setSearchHistory(await addToHistory(queryString));
  };

  const token = readToken();

  return (
    <>
      <Navbar
        bg="dark"
        expand="lg"
        className="fixed-top navbar-dark big-primary"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand href="#home">Riddhi Patel</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <>
                  <Link href="/search" passHref legacyBehavior>
                    <Nav.Link
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/search"}
                    >
                      Advanced Search
                    </Nav.Link>
                  </Link>
                  
                </>
              )}
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              {token && (
                <>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant="outline-success" type="submit">
                    Search
                  </Button>
                  <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/favourites"}
                        onClick={() => setIsExpanded(false)}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/history"}
                        onClick={() => setIsExpanded(false)}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                </>
              )}
            </Form>
            <Nav>
              {!token ? (
                <>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/login"}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      onClick={() => setIsExpanded(false)}
                      active={router.pathname === "/register"}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
