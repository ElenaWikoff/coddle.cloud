import { useParams } from "react-router";
import PageContainer from "../components/PageContainer";

const Lure = () => {
    const {id} = useParams();
    return (
        <PageContainer>
            Lure Page, id {id}
        </PageContainer>
    )
};

export default Lure;