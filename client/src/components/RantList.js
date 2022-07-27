import React, { useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/UserContext';
import RantContext from '../contexts/RantContext';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { format, parseISO } from 'date-fns'

const RantList = (props) => {

    let navigate = useNavigate();

    let { deleteRant } = useContext(RantContext);

    let { user, getUsers } = useContext(UserContext);

    useEffect(() => {
        async function fetch() {
          await getUsers(user)
            .then((user) => setUsers(user))
        }
        fetch();
      }, [getUsers, user]);

    let { userId, username, firstName, lastName } = user;

    const [users, setUsers] = useState({
        id: userId,
        username: username,
        firstName: firstName,
        lastName: lastName
    });

    console.log(users);

    function removeRant(id) {
        deleteRant(id).then(() => {
            navigate('/rants');
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }


    return (
    <RantContext.Consumer>
            {
            ({ rant }) => {
            return <Container>
                    <Stack gap={3} className="col-md-7 mx-auto p-3 rantlist">
                    <Button variant="primary" href="/rants/new">Add New Rant</Button>
                        <ListGroup>
                        {rant.map((r) => {
                            let created = parseISO(r.createdAt);
                            let createdDate = format(created, 'M/dd/yyyy');
                            return (
                                <div className="bg-light border mt-3">
                                <ListGroup.Item key={r.rantId}>
                                        <p>{r.rantBody}</p>
                                        <p>{createdDate}</p>
                                        <p>By: </p>
                                        <ListGroup horizontal className="actions">
                                            <ListGroup.Item>
                                                <Button variant="outline-primary" href={`/rants/${r.rantId}`}>Edit This</Button>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Button variant="outline-danger" href="#" onClick={() => removeRant(`${r.rantId}`)}>Delete Rant</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </ListGroup.Item>
                                </div> 
                            )
                        })}
                        </ListGroup>
                    </Stack>
                </Container>
        }
            }
    </RantContext.Consumer>
    );
};

export default RantList;