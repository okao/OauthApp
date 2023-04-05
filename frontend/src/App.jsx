import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  // const [name, setName] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('http://localhost:8000/api/user', {
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //     });

  //     const content = await response.json();

  //     setName(content.name);
  //   })();
  // });

  return <RouterProvider router={router} />;
}

export default App;
