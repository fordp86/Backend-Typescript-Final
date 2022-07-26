import React, { useContext, useState, useEffect} from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import RantContext from '../contexts/RantContext';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { format, parseISO } from 'date-fns';

const RantList = (props) => {
    let params = useParams();
    let navigate = useNavigate();

    let { user, getOneUser } = useContext(UserContext);

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

    // let userCreated = parseISO(userInfo.createdAt);
    // let userCreatedDate = format(userCreated , 'M/dd/yyyy');

    return (
    <UserContext.Consumer>
        <Container>
            <div>
                <p>Username: {userInfo.username}</p>
                <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
                <p>Location: {userInfo.city}, {userInfo.state} </p>
                <p>Profile Created:</p>
            </div>
            <RantContext.Consumer>
            <div>
            {
            ({ rant }) => {
                    return <div>
                            {rant.map((r) => {
                                let created = parseISO(r.createdAt);
                                let createdDate = format(created, 'M/dd/yyyy');
                                return ( <ListGroup>
                                        <ListGroup.Item key={r.rantId}>
                                            <p>{r.rantBody}</p>
                                            <p>{createdDate}</p>
                                            <div>
                                                <Button variant="outline-primary" href={`/rants/${r.rantId}`}>Edit This</Button>
                                                <br />
                                                <Button variant="outline-primary" href="#" onClick={() => removeRant(`${r.rantId}`)}>Delete Rant</Button>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                )
                                
                            })}
                            </div>
                
                }
            }
            </div>
            </RantContext.Consumer>
            </Container>
    </UserContext.Consumer>
    );
};

export default RantList;