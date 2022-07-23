import React, { useContext, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RantContext from '../contexts/RantContext';

const UpdateRant = (props) => {
    let params = useParams();
    let navigate = useNavigate();

    let { editRant, getRants, rant } = useContext(RantContext);

    let { rantId, rantBody  } = rant;

    useEffect(() => {
        async function fetch() {
          await getRants(params.rantId)
            .then((rant) => setUpdateRant(rant));
        }
        fetch()
      }, [params.rantId, getRants]);

    console.log(rant);

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
        editRant(updateRant, updateRant.id).then(() => {
            navigate('/rants');
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    console.log(updateRant);

    function loading() {
        return <div className="w-25 text-center">Loading Rants</div>
      }
    
      function updateForm() {
        return (
        <form onSubmit={handleSubmit}>
            <h1>Update Rant</h1>
            <span>Rant Body </span>
            <input placeholder="Enter you rant" type="text" name="rantBody" value={updateRant.body} onChange={handleChange} />
            <br></br><br></br>
            <button>Update Rant</button>
        </form>
        )
      }
      //if (updateRant === undefined) return loading()
      return parseInt(updateRant.rantId) !== parseInt(params.rantId) ?  loading() : updateForm()
};

export default UpdateRant;