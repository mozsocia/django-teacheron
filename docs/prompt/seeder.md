in django give me a seeder like below for below "Blog" model

```py
class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    def __str__(self):
        return self.title

```

```py

def create_brands():
    brands = [
        {
            "name": "Nike",
            "img": "media/nike.jpg",
            "details": "Leading sportswear brand"
        },
        {
            "name": "Adidas",
            "img": "media/adidas.jpg",
            "details": "Innovative athletic apparel and accessories"
        },
        {
            "name": "Apple",
            "img": "media/apple.jpg",
            "details": "Iconic technology brand"
        }
    ]

    for brand in brands:
        Brand.objects.create(
            name=brand["name"],
            img=brand["img"],
            details=brand["details"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )

    print("Brand created successfully.")