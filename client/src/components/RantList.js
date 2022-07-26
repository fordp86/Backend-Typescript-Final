import React, { useContext} from 'react';
import RantContext from '../contexts/RantContext';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { format, parseISO } from 'date-fns'

const RantList = () => {

    let navigate = useNavigate();

    let { deleteRant } = useContext(RantContext);

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
                                <Button variant="primary" href="/rants/new">Add New Rant</Button>
                                    <ListGroup>
                            {rant.map((r) => {
                                let created = parseISO(r.createdAt);
                                let createdDate = format(created, 'M/dd/yyyy');
                                return ( 
                                        <ListGroup.Item key={r.rantId}>
                                            <p>{r.rantBody}</p>
                                            <p>{createdDate}</p>
                                            <div>
                                                <Button variant="outline-primary" href={`/rants/${r.rantId}`}>Edit This</Button>
                                                <br />
                                                <Button variant="outline-primary" href="#" onClick={() => removeRant(`${r.rantId}`)}>Delete Rant</Button>
                                            </div>
                                        </ListGroup.Item>
                                )
                                
                            })}
                            </ListGroup>
                        </Container>
                }
            }
    </RantContext.Consumer>
    );
};

export default RantList;