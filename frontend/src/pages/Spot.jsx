import { useParams } from "react-router";
import PageContainer from "../components/PageContainer";

const Spot = () => {
    const {id} = useParams();
    return (
        <PageContainer>
            Spot Page, id {id}
        </PageContainer>
    )
};

export default Spot;