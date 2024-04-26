import React from 'react'
import toastr from 'toastr'
import SwalAlert from '@/utils/swalAlert'



function CardCom() {

  const showSuccessNotification = () => {
    toastr.success('This is a success notification!')
  }
  const showErrorNotification =() =>{
    toastr.error('This is an error notification!', 'Error Title', {
      timeOut: 5000, // Override the global timeOut option
      closeButton: true, // Override the global closeButton option
      progressBar: true, // Override the global progressBar option
      positionClass: 'toast-bottom-right' // Override the global positionClass option
    })
  }

  const showAlert = () => {
    SwalAlert('Are you sure?', 'This action cannot be undone.', 'warning')
      .then((result) => {
        if (result.isConfirmed) {
          // Perform the desired action
          SwalAlert('Success!', 'Your action has been completed.', 'success')
        }
      })
  }

  return (
    <>
      <header className="flex justify-between items-center mb-8 md:mb-4 md:flex-row md:items-center">


        <div className="mb-4 md:mb-0">
          <h1 className="text-slate-800 dark:text-slate-100 font-bold text-2xl md:text-3xl">Acme Inc. ✨</h1>
        </div>

        <div className="grid grid-cols-max-content gap-2 md:justify-end md:grid-flow-col">


          <form className="relative">
            <label htmlFor="action-search" className="sr-only">Search</label>
            <input id="action-search" className="form-input pl-3 dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium w-[15.5rem] flatpickr-input active" type="search" placeholder="Search…" />
              <button className="absolute right-0 top-0 bottom-0 flex items-center justify-center p-2" type="submit" aria-label="Search">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path>
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"></path>
                </svg>
              </button>
          </form>


          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 mr-1 md:mr-2" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
            </svg>
            <span className="hidden md:inline-block">Add Member</span>
          </button>

        </div>

      </header>

      <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent Activity</h2>
        </header>
        <div className="p-3">

          <div>
            <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Today</header>
            <ul className="my-1">
  
              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                  <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                    <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                  </svg>
                </div>
                <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center"><a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Nick Mark</a> mentioned <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Sara Smith</a> in a new post</div>
                    <div className="shrink-0 self-end ml-2">
                      <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">View<span className="hidden sm:inline"> -&gt;</span></a>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
                  <svg className="w-9 h-9 fill-current text-rose-50" viewBox="0 0 36 36">
                    <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                  </svg>
                </div>
                <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">The post <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Post Name</a> was removed by <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Nick Mark</a></div>
                    <div className="shrink-0 self-end ml-2">
                      <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">View<span className="hidden sm:inline"> -&gt;</span></a>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-emerald-500 my-2 mr-3">
                  <svg className="w-9 h-9 fill-current text-emerald-50" viewBox="0 0 36 36">
                    <path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z" />
                  </svg>
                </div>
                <div className="grow flex items-center text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center"><a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Patrick Sullivan</a> published a new <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">post</a></div>
                    <div className="shrink-0 self-end ml-2">
                      <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">View<span className="hidden sm:inline"> -&gt;</span></a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Yesterday</header>
            <ul className="my-1">

              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-sky-500 my-2 mr-3">
                  <svg className="w-9 h-9 fill-current text-sky-50" viewBox="0 0 36 36">
                    <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z" />
                  </svg>
                </div>
                <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center"><a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">240+</a> users have subscribed to <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Newsletter #1</a></div>
                    <div className="shrink-0 self-end ml-2">
                      <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">View<span className="hidden sm:inline"> -&gt;</span></a>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex px-2">
                <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                  <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                    <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                  </svg>
                </div>
                <div className="grow flex items-center text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center">The post <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Post Name</a> was suspended by <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">Nick Mark</a></div>
                    <div className="shrink-0 self-end ml-2">
                      <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">View<span className="hidden sm:inline"> -&gt;</span></a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>


        <footer className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 space-x-3 space-y-3">
          <button onClick={()=> showSuccessNotification()} className="btn bg-indigo-500 hover:bg-indigo-600 text-white" >Success</button>
          <button onClick={()=> showErrorNotification()} className="btn bg-indigo-500 hover:bg-indigo-600 text-white" >Error</button>

          <button onClick={()=> showAlert()} className="btn bg-indigo-500 hover:bg-indigo-600 text-white" >Show Alert</button>


          <h1 className="text-slate-800 dark:text-slate-100 font-bold ">This is footer </h1>

        </footer>

      </div>
    </>


  )
}

export default CardCom