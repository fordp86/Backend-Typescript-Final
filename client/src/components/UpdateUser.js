import React, { useContext, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';

const UpdateUser = (props) => {
    let params = useParams();
    let navigate = useNavigate();

    let { editUser, getOneUser, user } = useContext(UserContext);

    useEffect(() => {
        async function fetch() {
          await getOneUser(params.userId)
            .then((user) => setUpdateUser(user))
        }
        fetch()
      }, [params.userId, getOneUser]);

    let { userId, username, firstName, lastName } = user;

    //console.log(user);

    let [ updateUser, setUpdateUser ] = useState({
        id: userId,
        username: username,
        firstName: firstName,
        lastName: lastName
    });

    function handleChange(event) {
        setUpdateUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        editUser(updateUser, updateUser.userId).then(() => {
            navigate(`/users/profiles/${updateUser.userId}`);
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    //console.log(updateUser);

    function loading() {
        return <Container>
                <Stack gap={3} className="col-md-7 mx-auto p-3 updaterant">
                    <div className="w-25 text-center">Loading Yo</div>
                </Stack>
            </Container>
      }
    
      function updateForm() {
        return (
        <Container>
             <Stack gap={3} className="col-md-7 mx-auto p-3 updateuser">
                <h1>Update Profile</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Update Username" name="username" value={updateUser.username} onChange={handleChange} />
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" placeholder="Update First Name" name="firstName" value={updateUser.firstName} onChange={handleChange} />
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" placeholder="Update Last Name" name="lastName" value={updateUser.lastName} onChange={handleChange} />
                    <br />
                    <Button variant="primary" type="submit">
                        Update User
                    </Button>
                </Form>
            </Stack>
        </Container>
        )
      }
      if (updateUser === undefined) return loading()
      return parseInt(updateUser.userId) !== parseInt(params.userId) ?  loading() : updateForm()
};

export default UpdateUser;