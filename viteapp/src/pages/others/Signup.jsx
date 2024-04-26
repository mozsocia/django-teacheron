import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main>
      <div className="relative flex items-center justify-center">
        <div className="w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="card">
              <div className="max-w-sm mx-auto w-full px-4 py-8">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                  Create your Account ✨
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        className="form-input w-full"
                        id="name"
                        type="text"
                        name="name"
                        required
                        autoFocus
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        className="form-input w-full"
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-input w-full"
                        id="password"
                        type="password"
                        name="password"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="password_confirmation">
                        Confirm Password
                      </label>
                      <input
                        className="form-input w-full"
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        required
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="mr-1">
                      <label className="flex items-center" htmlFor="newsletter">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={newsletter}
                          onChange={(e) => setNewsletter(e.target.checked)}
                        />
                        <span className="text-sm ml-2">Email me about product news.</span>
                      </label>
                    </div>
                    <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm">
                    Have an account?{' '}
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      href="http://127.0.0.1:8000/login"
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;