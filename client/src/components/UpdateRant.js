import React, { useContext, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RantContext from '../contexts/RantContext';

const UpdateCoffee = (props) => {
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
        editRant(updateRant, updateRant.rantId).then(() => {
            navigate('/rants');
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    console.log(updateRant);

    function loading() {
        return <div className="w-25 text-center">Loading Yo</div>
      }
    
      function updateForm() {
        return (
            <form onSubmit={handleSubmit}>
            <h1>Update Rant</h1>
            <span>Rant Name  </span>
            <input placeholder="Enter rant" type="text" name="rantBody" value={updateRant.rantBody} onChange={handleChange} />
            <br></br><br></br>
            <button>Update Rant</button>
        </form>
        )
      }
      if (updateRant === undefined) return loading()
      return parseInt(updateRant.rantId) !== parseInt(params.rantId) ?  loading() : updateForm()
};

export default UpdateCoffee;