import React from 'react';
import UserContext from '../contexts/UserContext';
//import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
//import { format, parseISO } from 'date-fns'

const UserList = (props) => {

    // let navigate = useNavigate();

    // let { deleteRant } = useContext(RantContext);

    // function removeRant(id) {
    //     deleteRant(id).then(() => {
    //         navigate('/rants');
    //     }).catch(error => {
    //         navigate('/signin');
    //         console.log(error);
    //     });
    // }


    return (
    <UserContext.Consumer>
            {
            ({ user }) => {
                    return <Container>
                                <Stack gap={3} className="col-md-7 mx-auto p-3 userlist">
                                    <ListGroup>
                                    {user.map((u) => {
                                        return (
                                            <div className="bg-light border mt-3">
                                            <ListGroup.Item key={`userlist_${u.userId}`}>
                                                    <div>{u.firstName} {u.lastName}</div>
                                                    <div>{u.city}, {u.state}</div>
                                                    <ListGroup horizontal className="actions">
                                                        <ListGroup.Item>
                                                            <Button variant="outline-primary" href={`/users/profiles/${u.userId}/update`}>Edit User</Button>
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
    </UserContext.Consumer>
    );
};

export default UserList;