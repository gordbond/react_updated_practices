import React, { useState, useEffect } from 'react';
import drawing from "./img/drawing_13.jpeg";

function Header(props) {
    return (
        <header>
            <h1>
                This is {props.name}'s Demo
      </h1>
        </header>
    );
}

function Body({ favThings, login }) { // Using destructured object instead of props

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);




    useEffect(() => {
        if (!login) return;
        setLoading(true);//set loading to be true at start 
        fetch(`https://api.github.com/users/${login}`)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))//Loading complete
            .catch(setError);//catch any errors
    }, [login]);

    if (loading) return <h1>Loading...</h1>;

    if (error)
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (!data) return null;


    return (
        <>
            <h3>My favourite things</h3>

            <ul>
                {favThings.map((thing) => ( // Normally would use props.favThings
                    <li key={thing.id}>{thing.title}</li>
                ))}
            </ul>
            <img src={drawing} alt="drawing by Gord Bond" height={200} />

            <h1>{data.name}</h1>
            <p>{data.location}</p>
            <img src={data.avatar_url} alt={data.login} />


        </>
    );
}

function Footer() {
    const [emotion, setEmotion] = useState("happy");
    return (
        <>
            <div><p>Current mood is {emotion}.</p></div>
            <button onClick={() => setEmotion("sad")}>sad</button>
            <button onClick={() => setEmotion("happy")}>happy</button>
        </>
    );
}



const favThings = ["Lisa and Remy", "Coffee", "Art"];

const favThingsObj = favThings.map((thing, i) => ({ id: i, title: thing }));

const [, shelter, light] = ["boots", "tent", "headlamp"]; // Can give variable names to items in array
console.log(light);


export function Home(){
    return( 
        <div>
            <Header name="Gordy" />
            <Body favThings={favThingsObj} login="gordbond" />
            <Footer />
        </div>
        );
}

export function About(){
    return(
        <div>
            <h1>This is the About Page.</h1>
            <Footer />
        </div>
    );
}