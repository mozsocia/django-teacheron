import React from "react";
import Dashboard from "../pages/Dashboard";
import CardCom from "../pages/others/CardCom";
import CardEmpty from "../pages/others/CardEmpty";
import DatatableNew from "../pages/others/DatatableNew";
import AddProduct from "../pages/others/AddProduct";
import AddProductValid from "../pages/others/AddProductValid";
import Login from "../pages/others/Login";
import Signup from "../pages/others/Signup";

import ListBlog from "../pages/blogs/ListBlog";
import AddBlog from "../pages/blogs/AddBlog";
import BlogDetails from "../pages/blogs/BlogDetails";
import EditBlog from "../pages/blogs/EditBlog";
import AddBrand from "../pages/brands/AddBrand";
import ListBrand from "../pages/brands/ListBrand";
import BrandDetails from "../pages/brands/BrandDetails";
import EditBrand from "../pages/brands/EditBrand";
import AddCategories from "../pages/category/AddCategories";
import ListCategories from "../pages/category/ListCategories";
import CategoriesDetails from "../pages/category/CategoriesDetails";
import EditCategories from "../pages/category/EditCategories";
import AddProducts from "../pages/products/AddProducts";
import ListProducts from "../pages/products/ListProducts";
import ProductsDetails from "../pages/products/ProductsDetails";
import EditProducts from "../pages/products/EditProducts";
import AddStudent from "../pages/students/AddStudent";
import StudentLists from "../pages/students/ListStudents";
import StudentDetails from "../pages/students/StudentDetails";
import EditStudents from "../pages/students/EditStudents";
import ListStudents from "../pages/students/ListStudents";
import ListTeachers from "../pages/teachers/ListTeachers";
import AddTeacher from "../pages/teachers/AddTeacher";
import TeacherDetails from "../pages/teachers/TeacherDetails";
import EditTeacher from "../pages/teachers/EditTeacher";

const publicRoutes = [
  { path: "/panel/dashboard", component: <Dashboard /> },
  { path: "/test", component: <Dashboard /> },

  { path: "/panel/ui/card-com", component: <CardCom /> },
  { path: "/panel/ui/card-empty", component: <CardEmpty /> },
  { path: "/panel/ui/datatable-new", component: <DatatableNew /> },
  { path: "/panel/ui/add-product", component: <AddProduct /> },
  { path: "/panel/ui/add-product-valid", component: <AddProductValid /> },
  { path: "/panel/ui/login", component: <Login /> },
  { path: "/panel/ui/signup", component: <Signup /> },

  { path: "/panel/blogs/list", component: <ListBlog /> },
  { path: "/panel/blogs/add", component: <AddBlog /> },
  { path: "/panel/blogs/:id/show", component: <BlogDetails /> },
  { path: "/panel/blogs/:id/edit", component: <EditBlog /> },

  { path: "/panel/brands/add", component: <AddBrand /> },
  { path: "/panel/brands/list", component: <ListBrand /> },
  { path: "/panel/brands/:id/show", component: <BrandDetails /> },
  { path: "/panel/brands/:id/edit", component: <EditBrand /> },

  { path: "/panel/categories/add", component: <AddCategories /> },
  { path: "/panel/categories/list", component: <ListCategories /> },
  { path: "/panel/categories/:id/show", component: <CategoriesDetails /> },
  { path: "/panel/categories/:id/edit", component: <EditCategories /> },

  { path: "/panel/products/add", component: <AddProducts /> },
  { path: "/panel/products/list", component: <ListProducts /> },
  { path: "/panel/products/:id/show", component: <ProductsDetails /> },
  { path: "/panel/products/:id/edit", component: <EditProducts /> },

  { path: "panel/students/add", component: <AddStudent /> },
  { path: "panel/students/list", component: <ListStudents /> },
  { path: "panel/students/:id/show", component: <StudentDetails /> },
  { path: "panel/students/:id/edit", component: <EditStudents /> },
  
  { path: "panel/teachers/add", component: <AddTeacher/> },
  { path: "panel/teachers/list", component: <ListTeachers /> },
  { path: "panel/teachers/:id/show", component: <TeacherDetails /> },
  { path: "panel/teachers/:id/edit", component: <EditTeacher /> },
  
];

export { publicRoutes };
