import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert'
import { GetRandomFact } from "../Services/AnimalsFactsService";
import Spinner from "../Components/Spinner/Spinner";

function AnimalFacts() {
    let fact = GetRandomFact();
    let content = null;

    if (fact.loading) {
        content = <Spinner/>
    }

    if (fact.error) {
        content =
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    There was an error please refresh or try again later.
                </p>
            </Alert>
    }

    if (fact.data) {
        content =
            <Jumbotron>
                <h1>Did you know ?</h1>
                <h4 className="p-5 font-weight-normal">
                    {fact.data.text}
                </h4>
            </Jumbotron>
    }
    
    return (
        <div>
            {content}
        </div>
    );
}

export default AnimalFacts;