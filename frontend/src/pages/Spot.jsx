import { useParams } from "react-router";

const Spot = () => {
    const {id} = useParams();
    return (
        <main>
            Spot Page, id {id}
        </main>
    )
};

export default Spot;