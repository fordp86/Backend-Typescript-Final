import React, { useContext} from 'react';
import RantContext from '../contexts/RantContext';
import { Link, useNavigate } from 'react-router-dom';

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
                return <div>
                    <h1>Rant List</h1>
                    <Link to="/rants/new">Add New Rant</Link>
                    <div>
                        {rant.map((r) => {
                            return (
                                <div key={r.rantId}>
                                    <p>{r.rantBody}</p>
                                    <p>{r.createdAt}</p>
                                    <div>
                                        <a href ={`/rants/${r.rantId}`}>Edit This</a>
                                        <br />
                                        <Link to={{}} onClick={() => removeRant(`${r.rantId}`)}>Delete Rant</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        }
        </RantContext.Consumer>
    );
};

export default RantList;