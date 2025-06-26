import React from 'react';
import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx"
import { Outlet } from "react-router";
import Stack from 'react-bootstrap/Stack';

const RootLayout = () => {
  return (
    <Stack className="layout">
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default RootLayout;