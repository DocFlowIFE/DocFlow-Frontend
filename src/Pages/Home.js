import React from "react";
import Button from 'react-bootstrap/Button';
import video from '../Assets/DocFlow_Video.mp4';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="showcase">
            <video src={video} muted loop autoPlay></video>
            <div className="overlay"></div>
            <div className="overlay-content text-white m-3 p-5">
                <h1 className="text-title">Hello !!!</h1>
                <p className="font-big">
                    DocFlow is a platform for handling documents delivery in your institution. <br/> We strive to provide an effortless and efficient system for files exchange and their tracking. <br/> Please log in to proceed to your assigned tickets or create a new one.
                </p>
                <p className="mt-5">
                    <Link to={`/login`}>
                        <Button className="pl-5 pr-5 pt-3 pb-3 btn-hot">Login</Button>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Home;