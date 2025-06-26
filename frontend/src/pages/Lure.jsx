import { useParams } from "react-router";

const Lure = () => {
    const {id} = useParams();
    return (
        <main>
            Lure Page, id {id}
        </main>
    )
};

export default Lure;