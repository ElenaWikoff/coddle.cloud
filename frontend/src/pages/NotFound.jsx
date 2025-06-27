import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";

const NotFound = () => {
    
   return (
      <PageContainer>
         <Container className="mt-4 g-4 d-flex flex-column align-items-center">
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <img alt="Fish out of water gif" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGtnZmhhZDFjN2t0MDE5MDh0MGQ2OGVseGZocWk4M2ljdmdkNWxrdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7KeXynsjtYm2s/giphy.gif" />
         </Container>
      </PageContainer>
   );
};

export default NotFound;
