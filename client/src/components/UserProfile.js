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

    let { user, getUserRants } = useContext(UserContext);

    let { deleteRant, rant } = useContext(RantContext);

    useEffect(() => {
        async function fetch() {
          await getUserRants(params.userId)
            .then((user) => setUserInfo(user))
        }
        fetch()
      }, [params.userId, getUserRants]);

      let { userId, username, firstName, lastName, city, state, createdAt } = user;

      let { rantId, rantBody } = rant

      let rantUserId = rant.userId;

      let [ userInfo, setUserInfo ] = useState({
        id: userId,
        username: username,
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        rantId: rantId,
        rantUserId: rantUserId,
        rantBody: rantBody,
        createdAt: createdAt
    });

    function removeRant(id ) {
        let profileId = params.userId;
        deleteRant(id).then(() => {
            navigate(`/users/profiles/${profileId}`);
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    function hasJWT() {
        let flag = false;
  
        //check user has JWT token
        localStorage.getItem("myRantToken") ? flag=true : flag=false
       
        return flag
    }

        const userCreatedDate = format(new Date(2022, 6, 23), 'M/dd/yyyy');
        return (
            <Container>
                <Stack gap={3} className="col-md-8 mx-auto p-3 profile">
                <hr />
                {
                <div>
                    <h1>User Info</h1>
                    <h3>Username: <span>{userInfo.username}</span></h3>
                    <h3>Name: <span>{userInfo.firstName} {userInfo.lastName} </span></h3>
                    <h3>Location: <span>{userInfo.city}, {userInfo.state}</span></h3>
                    <h3>Profile Created: <span>{userCreatedDate}</span></h3>
                    {
                    (hasJWT()) ? 
                    <Button variant="outline-primary" href={`/users/profiles/${userInfo.userId}/update`}>Edit User</Button>
                    :
                    <Button variant="outline-danger" href="/signin">Login To Edit</Button>
                    }
                </div>
                }
                <hr />
                <div className="pt-3">
                    <h2>User Rants</h2>
                        <ListGroup>
                        {rant.map((r) => {
                            let rantCreated = parseISO(r.createdAt);
                            let rantCreatedDate = format(rantCreated, 'M/dd/yyyy');
                            if(userInfo.userId === r.userId ){
                            return <div className="bg-light border mt-3">
                                    <ListGroup.Item key={`rant_${r.rantId}_${r.userId}`}>
                                        <p>{r.rantBody}</p>
                                        <p>{rantCreatedDate}</p>
                                        <ListGroup horizontal className="actions">
                                        {
                                        (hasJWT()) ? 
                                        <ListGroup horizontal className="actions">
                                            <ListGroup.Item>
                                                    <Button variant="outline-primary" href={`/rants/${r.rantId}`}>Edit This</Button>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Button variant="outline-danger" onClick={() => removeRant(`${r.rantId}`)}>Delete Rant</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                        :
                                        ''
                                        }
                                           
                                        </ListGroup>
                                    </ListGroup.Item>
                        </div>
                        } else{
                            <p>No Rants Available</p>
                        }
                        })}
                        </ListGroup>
                        </div>
                </Stack>
            </Container>
        );
};

export default RantList;