for below blog code , replace blog with reseller
- change all 'Blog','blog' and 'blogs' words, do not skip any, IMPORTANT
- also change word after '/pages/' and '/panel/'
```js
import ListBlog from '../pages/blogs/ListBlog.vue'
import AddBlog from '../pages/blogs/AddBlog.vue'
import BlogDetails from '../pages/blogs/BlogDetails.vue'
import EditBlog from '../pages/blogs/EditBlog.vue'


  { path: "/panel/blogs/list", component: <ListBlog /> },
  { path: "/panel/blogs/add", component: <AddBlog /> },
  { path: "/panel/blogs/:id/show", component: <BlogDetails /> },
  { path: "/panel/blogs/:id/edit", component: <EditBlog /> },


  {
    key: "blog",
    label: "Blog",
    icon: "bxl-steam",
    submenu: [
      {
        label: "Blog List",
        path: "/panel/blogs/list",
      },
      {
        label: "Add Blog",
        path: "/panel/blogs/add",
      },
    ],
  },
```