import React, { useContext, useState, useEffect} from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import RantContext from '../contexts/RantContext';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/esm/Stack';
import { format, parseISO } from 'date-fns';

const RantList = () => {
    let params = useParams();
    let navigate = useNavigate();

    let { user, getOneUser, getUserRants } = useContext(UserContext);

    let { deleteRant } = useContext(RantContext);

    useEffect(() => {
        async function fetch() {
          await getOneUser(params.userId)
            .then((user) => setUserInfo(user))
        }
        fetch()
      }, [params.userId, getOneUser]);

      let { userId, username, firstName, lastName, city, state, createdAt } = user;

      let [ userInfo, setUserInfo ] = useState({
        id: userId,
        username: username,
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        createdAt: createdAt
    });

    function removeRant(id) {
        deleteRant(id).then(() => {
            navigate(`/user/profiles/${userInfo.id}`);
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    //let userCreated = userInfo.createdAt;
    //let parsedDate = parseISO(userCreated);
    //let userCreatedDate = format(parsedDate , 'M/dd/yyyy');

    return (
        <Container>
            <Stack gap={3} className="col-md-8 mx-auto p-3 profile">
            <h1>User Info</h1>
                <h3>Username: <span>{userInfo.username}</span></h3>
                <h3>Name: <span>{userInfo.firstName} {userInfo.lastName} </span></h3>
                <h3>Location: <span>{userInfo.city}, {userInfo.state}</span></h3>
                {/* <p>Profile Created: {userCreatedDate}</p> */}
            
            
            {
            ({ rant }) => {
                    return <div>
                            <h2>User Rants</h2>
                            {rant.map((r) => {
                                let created = parseISO(r.createdAt);
                                let createdDate = format(created, 'M/dd/yyyy');
                                return ( <ListGroup>
                                        <div className="bg-light border">
                                        <ListGroup.Item key={r.rantId}>
                                            <p>{r.rantBody}</p>
                                            <p>{createdDate}</p>
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
                                    </ListGroup>
                                )
                                
                            })}
                            </div>
                
                }
            }
            </Stack>
            </Container>
    );
};

export default RantList;