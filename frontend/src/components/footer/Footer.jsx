import Container from 'react-bootstrap/Container';
import "./footer.css"

const Footer = () => {
    return (
        <footer className=''>
            <Container fluid className='d-flex flex-column align-items-center'>
                Discover top fishing spots, explore local species, and find the best lures—all in one place.
            </Container>
        </footer>
    );
};

export default Footer;