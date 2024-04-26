import React from "react"
import Dashboard from '../pages/Dashboard'
import CardCom from '../pages/CardCom'
import CardEmpty from '../pages/CardEmpty'
import DatatableNew from '../pages/DatatableNew'
import AddProduct from '../pages/AddProduct'
import AddProductValid from '../pages/AddProductValid'
import Login from '../pages/Login'
import Signup from '../pages/Signup'








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







]

export { publicRoutes }