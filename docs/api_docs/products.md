Sure, here's a complete API documentation including sample JSON payloads for creating and updating a product:
# Product API Documentation

## API Endpoints

---

### Get Product List
- **URL:** `/products/list/`
- **Method:** `GET`
- **Description:** Retrieves a list of all products.

---

### Get Related Data
- **URL:** `/products/related/`
- **Method:** `GET`
- **Description:** Retrieves related data such as categories, brands, and choices for the 'remark' field.

##### Response Example:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Category A"
    },
    {
      "id": 2,
      "name": "Category B"
    }
  ],
  "brands": [
    {
      "id": 1,
      "name": "Brand X"
    },
    {
      "id": 2,
      "name": "Brand Y"
    }
  ],
  "remark_choices": [
    {
      "id": "popular",
      "name": "Popular"
    },
    {
      "id": "new",
      "name": "New"
    },
    {
      "id": "top",
      "name": "Top"
    },
    {
      "id": "special",
      "name": "Special"
    },
    {
      "id": "trending",
      "name": "Trending"
    }
  ]
}
```

---

### Create a New Product
- **URL:** `/products/store/`
- **Method:** `POST`
- **Description:** Creates a new product.

#### Request Body (JSON)
```json
{
  "title": "New Product",
  "slug": "new-product",
  "short_details": "This is a new product",
  "sku": "SKU123",
  "points": 100,
  "price": 49.99,
  "discount": false,
  "previous_price": null,
  "image": "path/to/image.jpg",
  "stock_count": 100,
  "rating": 4.5,
  "remark": "new",
  "category": 1,  // Category ID
  "brand": 1,     // Brand ID
  "color": "Red",
  "size": "Large",
  "is_active": true,
  "is_reseller": false,
  "reseller_price": null,
  "variations": null,
  "additional_info": "Additional information about the product"
}
```

---

### Get Product Details
- **URL:** `/products/<int:product_id>/show/`
- **Method:** `GET`
- **Description:** Retrieves details of a specific product.

---

### Edit Product
- **URL:** `/products/<int:product_id>/edit/`
- **Method:** `GET`
- **Description:** Retrieves data of a specific product for editing.

---

### Update Product
- **URL:** `/products/<int:product_id>/update/`
- **Method:** `POST`
- **Description:** Updates data of a specific product.

#### Request Body (JSON)
```json
{
  "title": "Updated Product Name",
  "short_details": "Updated short description",
  "points": 150,
  "price": 59.99,
  "discount": true,
  "previous_price": 69.99,
  "stock_count": 80,
  "rating": 4.8,
  "remark": "special",
  "category": 1,  // Updated Category ID
  "brand": 1,     // Updated Brand ID
  "color": "Blue",
  "size": "Medium",
  "is_active": true,
  "additional_info": "Updated additional information"
}
```

---

### Delete Product
- **URL:** `/products/<int:product_id>/destroy/`
- **Method:** `POST`
- **Description:** Deletes a specific product.

---

This documentation provides a clear overview of each API endpoint, including their URLs, HTTP methods, descriptions, and example request bodies where applicable. Adjust the descriptions and examples as needed based on your specific API implementation and requirements.
```

This markdown file contains the complete API documentation with descriptions and example JSON payloads for creating and updating a product. Adjust the fields and descriptions as necessary for your specific application.