import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../routes/sidebarLink'
import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const uiComponents = [
    {
      key: 'ui',
      label: 'Ui Components',
      icon: 'bxs-cake',
      submenu: [
        {
          label: 'Card Empty',
          path: '/panel/ui/card-empty',
        },
        {
          label: 'Card Com',
          path: '/panel/ui/card-com',
        },
        {
          label: 'DataTable',
          path: '/panel/ui/datatable-new',
        },
      ],
    },

  ];

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto  w-52 lg:w-16 lg:sidebar-expanded:!w-52 2xl:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 dark:bg-slate-900/90 
        bg-slate-900/95 border-r-[1px] border-r-slate-700 p-2 2xl:p-4 transition-all duration-200 ease-in-out    
        [&::-webkit-scrollbar]:w-2 
      [&::-webkit-scrollbar-track]:bg-slate-800
      [&::-webkit-scrollbar-thumb]:bg-slate-500/40
      [&::-webkit-scrollbar-thumb]:rounded-md
      dark:[&::-webkit-scrollbar-track]:bg-slate-700
      dark:[&::-webkit-scrollbar-thumb]:bg-slate-600" ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="sidebar-heading">
              <span className="sidebar-heading-mobile" aria-hidden="true">•••</span>
              <span className="sidebar-heading-desktop">Pages</span>
            </h3>
            <ul className="mt-3">


              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname.includes('dashboard')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`moz-nav-link ${pathname.includes('dashboard') ? 'moz-nav-link--active' : 'moz-nav-link--inactive'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className={`bx bxs-dashboard moz-nav-icon ${pathname.includes('dashboard') ? 'moz-nav-icon--active' : 'moz-nav-icon--inactive'}`}></i>
                            <span className="moz-nav-text">Dashboard</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`moz-nav-arrow ${open && 'moz-nav-arrow--open'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/panel/dashboard"
                              className={({ isActive }) =>
                                `moz-nav-child-link ${isActive ? 'moz-nav-child-link--active' : 'moz-nav-child-link--inactive'}`
                              }
                            >
                              <span className="moz-nav-child-text">Main</span>
                            </NavLink>
                          </li>

                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>






              {sidebarLinks.map((component) => (
                <SidebarLinkGroup key={component.key} activecondition={pathname.includes(component.key)}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`moz-nav-link ${pathname.includes(component.key) ? 'moz-nav-link--active' : 'moz-nav-link--inactive'
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <i
                                className={`bx ${component.icon} moz-nav-icon ${pathname.includes(component.key) ? 'moz-nav-icon--active' : 'moz-nav-icon--inactive'
                                  }`}
                              ></i>
                              <span className="moz-nav-text">{component.label}</span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg className={`moz-nav-arrow ${open && 'moz-nav-arrow--open'}`} viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            {component.submenu.map((item) => (
                              <li key={item.label} className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to={item.path}
                                  className={({ isActive }) =>
                                    `moz-nav-child-link ${isActive ? 'moz-nav-child-link--active' : 'moz-nav-child-link--inactive'}`
                                  }
                                >
                                  <span className="moz-nav-child-text">{item.label}</span>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ))}



              {/* Messages */}
              {/* <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/test"
                  className={`block text-slate-200 truncate transition duration-150 ${pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <i className={`bx bxs-chat  text-2xl fill-current ${pathname.includes('tasks') ? 'text-indigo-500' : 'text-slate-400'}`}></i>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Messages
                      </span>
                    </div>

                    <div className="flex flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">4</span>
                    </div>
                  </div>
                </NavLink>
              </li>
 */}




            </ul>
          </div>
          {/* More group */}

        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
