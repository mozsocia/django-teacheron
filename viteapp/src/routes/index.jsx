import React from "react"
import Dashboard from '../pages/Dashboard'
import CardCom from '../pages/others/CardCom'
import CardEmpty from '../pages/others/CardEmpty'
import DatatableNew from '../pages/others/DatatableNew'
import AddProduct from '../pages/others/AddProduct'
import AddProductValid from '../pages/others/AddProductValid'
import Login from '../pages/others/Login'
import Signup from '../pages/others/Signup'

import ListBlog from '../pages/blogs/ListBlog'
import AddBlog from '../pages/blogs/AddBlog'
import BlogDetails from '../pages/blogs/BlogDetails'
import EditBlog from '../pages/blogs/EditBlog'









const publicRoutes = [
  { path: "/panel/dashboard", component: <Dashboard/> },
  { path: "/test", component: <Dashboard/> },



  { path: "/panel/ui/card-com", component: <CardCom/> },
  { path: "/panel/ui/card-empty", component: <CardEmpty/> },
  { path: "/panel/ui/datatable-new", component: <DatatableNew/> },
  { path: "/panel/ui/add-product", component: <AddProduct/> },
  { path: "/panel/ui/add-product-valid", component: <AddProductValid/> },
  { path: "/panel/ui/login", component: <Login/> },
  { path: "/panel/ui/signup", component: <Signup/> },

  { path: "/panel/blogs/list", component: <ListBlog/> },
  { path: "/panel/blogs/add", component: <AddBlog/> },
  { path: '/panel/blogs/:id/show', component: <BlogDetails/> },
  { path: '/panel/blogs/:id/edit', component: <EditBlog/> },




]

export { publicRoutes }