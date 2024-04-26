give me a vue 3 componet to show data from below "Blog" details by fetching from below url and data
- use  <script setup>
- take id from route params
- use below vue template
```
url = /api/posts/blogs/6/show
data = 
{
  "id": 6,
  "title": "Third Blog Post",
  "content": "This is the content of the third blog post.",
  "image": "/media/blog_images/blog3.png"
}

```

```vue

<template>
    <div class="card-body">
      <!-- Card content -->
      <div v-if="blog"  class="space-y-4">
        <h1><strong>Title :</strong> {{ blog.title }}</h1>
        <div class="flex">
        <strong>Image :</strong> <img :src="blog.image" width="50px" alt="Blog Image">
        </div>

        <p><strong>Content :</strong> {{ blog.content }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const blogId = route.params.id
const blog = ref(null)

onMounted(async () => {
  try {
    const response = await fetch(`/api/posts/blogs/${blogId}/show`)
    const data = await response.json()
    blog.value = data
  } catch (error) {
    console.error('Error fetching blog data:', error)
  }
})
</script>
```