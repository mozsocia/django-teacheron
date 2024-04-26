for this below django Blog model, give me create vue component using below vue template

```py
class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    def __str__(self):
        return self.title
```
```vue
<template>
  <form @submit="onSubmit" class="p-4">
    <div class="space-y-4">
      <div>
        <label class="form-label">Brand</label>
        <VueMultiselect v-model="brand" v-bind="brandAttrs" :options="options"
          :class="{ 'error-class': errors.brand }" />
        <div class="error-class">{{ errors.brand }}</div>
      </div>

      <div>
        <label class="form-label" for="name">
          Full Name <span class="text-rose-500">*</span>
        </label>
        <input class="form-input w-full" id="name" type="text" v-model="name" v-bind="nameAttrs"
          :class="{ 'error-class': errors.name }" />
        <div class="error-class">{{ errors.name }}</div>
      </div>

      <div>
        <label class="form-label" for="message">
          Message
        </label>
        <textarea class="form-textarea w-full" id="message" v-model="message" v-bind="messageAttrs"
          :class="{ 'error-class': errors.message }" rows="3"></textarea>
        <div class="error-class">{{ errors.message }}</div>
      </div>

      <div class="mt-6">
        <label class="flex items-center" name="newsletter" id="newsletter">
          <input type="checkbox" class="form-checkbox mr-2" v-model="newsletter" v-bind="newsletterAttrs"
            :class="{ 'error-class': errors.newsletter }" />
          <span class="text-sm">Email me about product news.</span>
        </label>
        <div class="error-class">{{ errors.newsletter }}</div>
      </div>


      <div>
        <label class="form-label">
          Profile Image <span class="text-rose-500">*</span>
        </label>
        <input type="file" class="form-input w-full form-upload"
          name="profile_image"
          v-on:change="handleFileChange('profile_image', $event)"
          :class="{ 'error-class': errors.profile_image }" />
        <div class="error-class">{{ errors.profile_image }}</div>
      </div>


      <div>
        <span class="form-label">Choose One</span>
        <div class="flex items-center space-x-8">
          <div class="flex items-center space-x-2">
            <input type="radio" class="form-radio text-indigo-500" name="radio_option" id="radio_option1"
              value="option1" v-model="radio_option" v-bind="radio_optionAttrs"
              :class="{ 'error-class': errors.radio_option }" />
            <label class="inline-block" for="radio_option1">Option 1</label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" class="form-radio text-indigo-500" name="radio_option" id="radio_option2"
              value="option2" v-model="radio_option" v-bind="radio_optionAttrs"
              :class="{ 'error-class': errors.radio_option }" />
            <label class="inline-block" for="radio_option2">Option 2</label>
          </div>
        </div>
        <div class="error-class">{{ errors.radio_option }}</div>
      </div>
    </div>

    <button type="submit" class="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
      Save Product
    </button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import VueMultiselect from 'vue-multiselect';
import { ref } from 'vue';
import { newImagePreview } from '../../utils/Utils'


// Define the validation schema
const schema = yup.object({
  brand: yup.string().required(),
  name: yup.string().required(),
  message: yup.string().required(),
  newsletter: yup.boolean().required(),
  profile_image: yup.mixed().required().test(
    'fileType',
    'Unsupported File Format',
    (value) => !value || (value && (value.type === 'image/jpeg' || value.type === 'image/png'))
  ),
  radio_option: yup.string().required(),
});

// Use the useForm function
const { errors, handleSubmit, defineField,  setFieldValue } = useForm({
  validationSchema: schema,
});

// Define fields for validation
const [brand, brandAttrs] = defineField('brand');
const [name, nameAttrs] = defineField('name');
const [message, messageAttrs] = defineField('message');
const [newsletter, newsletterAttrs] = defineField('newsletter');
const [profile_image, profile_imageAttrs] = defineField('profile_image');
const [radio_option, radio_optionAttrs] = defineField('radio_option');


const options = ['apple', 'samsung', 'realme'];

const handleFileChange = (name, event) => {
  const file = event.target.files[0];
  setFieldValue(name, file);
  imagePreview(name, file)

};

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const formData = new FormData();

  // Append other form fields
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Log the contents of the FormData object
  for (const entry of formData.entries()) {
    console.log(entry[0], entry[1]);
  }
});

</script>

```