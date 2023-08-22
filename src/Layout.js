import React from 'react';
import { Footer } from './comps/Footer';
import { Nav } from './comps/Nav';

const Layout = ({ children }) => {
  return (
    <>
      {' '}
      <Nav />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
