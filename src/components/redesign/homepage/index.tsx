/** @format */

import React from 'react';
import SideBar from '../sidebar';
import History from '../history';
import Chat from '../chat';

const App = () => {
  return (
    <React.Fragment>
      <section className='flex w-full overflow-hidden'>
        <SideBar />
        <History />
        <Chat />
      </section>
    </React.Fragment>
  );
};

export default App;
