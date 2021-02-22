import React from 'react';
import { useSelector } from 'react-redux';
import Auth from './components/Auth/Auth';
import Main from './components/Main/Main';

function App() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <div>
         {isAuth ? <Main/> : <Auth/>}
    </div>
  );
}

export default App;
