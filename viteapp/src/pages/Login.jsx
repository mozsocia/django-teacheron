import React from 'react';

const Login = () => {
  return (
    <main>
      <div className="relative flex items-center justify-center">
        {/* Content */}
        <div className="w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="card">
              <div className="max-w-sm mx-auto w-full px-4 py-8">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! ✨</h1>

                {/* Form */}
                <form method="POST" action="http://127.0.0.1:8000/login">
                  <input type="hidden" name="_token" value="bbCHNqGPsFzSszvH3gHTOZSJLTfaBMxCFgcsBUDe" autoComplete="off" />
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                      </label>
                      <input className="form-input w-full" id="email" type="email" name="email" required autoFocus />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                      </label>
                      <input className="form-input w-full" id="password" type="password" name="password" required autoComplete="current-password" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="mr-1">
                      <a className="text-sm underline hover:no-underline" href="http://127.0.0.1:8000/forgot-password">
                        Forgot Password?
                      </a>
                    </div>

                    <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap ml-3">
                      Sign in
                    </button>
                  </div>
                </form>

                {/* Footer */}
                <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm">
                    Don't you have an account? <a
                      className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                      href="http://127.0.0.1:8000/register">Sign Up</a>
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

export default Login;