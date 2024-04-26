import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Banner from './Banner';

function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-2 sm:px-4 lg:px-4 py-3 w-full max-w-9xl mx-auto">
            {/* Render children components */}
            {children}
          </div>
        </main>


      </div>
    </div>
  );
}

export default DefaultLayout;
