import React from "react";
import Button from 'react-bootstrap/Button';
import HomeImage from '../Assets/DocFlow-Home.jpg';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container m-auto p-0">
            <div className="row d-flex flex-row-reverse">
                <div className="col-md-6 p-0">
                    <div className="text-white p-5">
                        <h1>Hello !!!</h1>
                        <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus, leo ac cursus mattis, ligula ligula vestibulum nisi, in venenatis neque turpis a nulla. Curabitur elementum facilisis tortor ac efficitur. Nullam iaculis consectetur tellus, et faucibus mi convallis sed. Curabitur lectus nisi, auctor sit amet sem ac, convallis tincidunt arcu.
                        </p>
                        <p className="mt-5">
                            <Link to={`/login`}>
                                <Button className="pl-4 pr-4 btn-hot">Login</Button>
                            </Link>
                        </p>
                    </div>
                </div>
                <img className="col-md-6 p-0" src={HomeImage} alt="Documents"></img>
            </div>
        </div>
    );
}

export default Home;