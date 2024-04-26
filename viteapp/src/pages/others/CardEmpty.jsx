import React from 'react';

const CardEmpty = () => {
  return (
    <>
      <header className="page-header">
        {/* Left: Title */}
        <div className="mb-4 md:mb-0">
          <h1 className="page-title">Acme Inc. ✨</h1>
        </div>

        {/* Right: Actions */}
        <div className="page-header-right-actions grid grid-cols-max-content gap-2">
          {/* Add member button */}
          <button className="page-header-btn">
            <svg className="page-header-svg" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="page-header-span">Add Member</span>
          </button>
        </div>
      </header>

      <div className="card">
        <header className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </header>
        <div className="card-body">
          {/* Card content */}
          <h1>This is main content</h1>
        </div>
      </div>
    </>
  );
};

export default CardEmpty;