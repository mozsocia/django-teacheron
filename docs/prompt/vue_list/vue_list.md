modify below vue 3 component code to work with below url and data
- give only the script tag code
- show image in img tag

```
url = /api/posts/blogs/
data = 
[
    {
        "id": 5,
        "title": "Second Blog Post",
        "content": "This is the content of the second blog post.",
        "image": "/media/blog_images/blog2.png"
    },
]

```

```
<template>

    <div class="card">
      <div class="card-body">
        <!-- Card content -->
        <div>
        <div class="mb-5">
          <input v-model="params.search" type="text" class="form-input max-w-xs" placeholder="Search..." />
        </div>
        <vue3-datatable :rows="rows" :columns="cols" :loading="loading" :totalRows="total_rows" :sortable="true" :search="params.search" skin="bh-table-bordered">
          <template #id="data">
            <strong>{{ data.value.id }}</strong>
          </template>
          <template #actions="data">
            <div class="flex gap-4">
              <button type="button" class="btn btn-sm soft-btn-emerald" @click="viewUser(data.value)">View</button>
              <button type="button" class="btn btn-sm soft-btn-red" @click="deleteUser(data.value)">Delete</button>
            </div>
          </template>
        </vue3-datatable>
      </div>
    </div>
  </template>
  

  <script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import '@bhplugin/vue3-datatable/dist/style.css';
  import { usersData } from '../others/data'
  
  const params = reactive({
    current_page: 1,
    pagesize: 10,
    search: '',
    column_filters: [],
  });
  
  onMounted(() => {
    getUsers();
  });
  
  const loading: any = ref(true);
  const total_rows = ref(0);
  
  const rows: any = ref(null);
  
  
  const cols =
    ref([
      { field: 'id', title: 'ID', isUnique: true, type: 'number' },
      { field: 'firstName', title: 'First Name' },
      { field: 'lastName', title: 'Last Name' },
      { field: 'email', title: 'Email' },
      { field: 'age', title: 'Age', type: 'number' },
      { field: 'dob', title: 'Birthdate', type: 'date' },
      { field: 'address.city', title: 'City' },
      { field: 'isActive', title: 'Active', type: 'bool' },
      { field: 'actions', title: 'Actions' },
    ]) || [];
  
  const getUsers = async () => {
    try {
      loading.value = true;
  
      // Delay for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      rows.value = usersData;
      total_rows.value = usersData?.length;
    } catch { }
  
    loading.value = false;
  };
  
  const viewUser = (user: any) => {
    alert('View User \n' + user.id + ', ' + user.firstName + ', ' + user.lastName + ', ' + user.email);
  };
  const deleteUser = (user: any) => {
    alert('Delete User \n' + user.id + ', ' + user.firstName + ', ' + user.lastName + ', ' + user.email);
  };
  
  </script>
  

  ```