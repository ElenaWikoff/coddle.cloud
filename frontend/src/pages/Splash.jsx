import { useEffect, useState } from "react";

const Splash = () => {
    const [text, setText] = useState("not received");

    useEffect(() => {
        fetch('http://localhost:8080/frontendhitme')
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