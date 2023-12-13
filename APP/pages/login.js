
import { useRouter } from 'next/router';
import { useState } from 'react';
import { authenticateUser } from '../lib/Authenticate';
import { getFavourites, getHistory } from '../lib/userData';
import { favouritesAtom, searchHistoryAtom } from '../store';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAtom } from 'jotai';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(null); 
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isAuthenticated = await authenticateUser(user, password);

      if (isAuthenticated) {
        await updateAtoms();
        router.push('/favourites');
      }
    } catch (error) {
      setWarning(error.message);
    }
  };

  return (
<>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
    </>  );
}
