import { useParams } from "react-router";

const Fish = () => {
    const {id} = useParams();
    return (
        <main>
            Fish Page, id {id}
        </main>
    )
};

export default Fish;