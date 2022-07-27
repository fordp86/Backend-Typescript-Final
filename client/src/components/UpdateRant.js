import React, { useContext, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RantContext from '../contexts/RantContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';

const UpdateRant = (props) => {
    let params = useParams();
    let navigate = useNavigate();

    let { editRant, getOneRant, rant } = useContext(RantContext);

    useEffect(() => {
        async function fetch() {
          await getOneRant(params.rantId)
            .then((rant) => setUpdateRant(rant))
        }
        fetch()
      }, [params.rantId, getOneRant]);

    let { rantId, rantBody } = rant;

    //console.log(rant);

    let [ updateRant, setUpdateRant ] = useState({
        id: rantId,
        body: rantBody
    });

    function handleChange(event) {
        setUpdateRant((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        editRant(updateRant, updateRant.rantId).then(() => {
            navigate('/rants');
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    //console.log(updateRant);

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
             <Stack gap={3} className="col-md-7 mx-auto p-3 updaterant">
                <h1>Update Rant</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Label></Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Update Rant" name="rantBody" value={updateRant.rantBody} onChange={handleChange} />
                    <br/>
                    <Button variant="primary" type="submit">
                        Update Rant
                    </Button>
                </Form>
            </Stack>
        </Container>
        )
      }
      if (updateRant === undefined) return loading()
      return parseInt(updateRant.rantId) !== parseInt(params.rantId) ?  loading() : updateForm()
};

export default UpdateRant;