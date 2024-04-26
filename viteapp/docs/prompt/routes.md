
give me below codes for Entity  "Product"
```
import ListBlog from '../pages/blogs/ListBlog'
import AddBlog from '../pages/blogs/AddBlog'


  { path: "/panel/blogs/list", component: <ListBlog/> },
  { path: "/panel/blogs/add", component: <AddBlog/> },


    {
      key: 'blog',
      label: 'Blog',
      icon: 'bxl-steam',
      submenu: [
        {
          label: 'Blog List',
          path: '/panel/blogs/list',
        },
        {
          label: 'Add Blog',
          path: '/panel/blogs/add',
        },

      ],
    },
```
