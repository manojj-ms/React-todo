import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTutorial, deleteTutorial } from "../actions/tutorials";
import TutorialDataService from "../services/TutorialService";
import { Redirect } from 'react-router-dom';

const Tutorial = (props) => {
    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getTutorial = id => {
        TutorialDataService.get(id)
            .then(response => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTutorial(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTutorial({ ...currentTutorial, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            published: status
        };

        dispatch(updateTutorial(currentTutorial.id, data))
            .then(response => {
                console.log(response);

                setCurrentTutorial({ ...currentTutorial, published: status });
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateTutorial(currentTutorial.id, currentTutorial))
            .then(response => {
                console.log(response);

                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeTutorial = () => {
        dispatch(deleteTutorial(currentTutorial.id))
            .then(() => {
                props.history.push("/tutorials");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }


    return (
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTutorial.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentTutorial.description}
                                onChange={handleInputChange}
                            />
                        </div>


                    </form>



                    <button className="btn btn-danger m-2" onClick={removeTutorial}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success m-2"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
            )}
        </div>
    );
};

export default Tutorial;