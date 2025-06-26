import { useEffect, useState } from "react";

const Splash = () => {
    const [text, setText] = useState("not received");

    useEffect(() => {
        fetch(`http://${window.location.hostname}:8080/api`)
        .then((res) => res.text())
        .then((text) => setText(text));
    }, []);

    return (
        <main>
            <p>{`${text}`}</p>
        </main>
    );
};

export default Splash;