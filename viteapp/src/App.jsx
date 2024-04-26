import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import { publicRoutes } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/panel/dashboard" replace />} />
        <Route path="/panel" element={<Navigate to="/panel/dashboard" replace />} />
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<DefaultLayout>{route.component}</DefaultLayout>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
