# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import *
from .serializers import *

@api_view(['GET'])
def api_brand_list(request):
    brands = Brand.objects.all()
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def api_brand_show(request, brand_id):
    try:
        brand = Brand.objects.get(id=brand_id)
        serializer = BrandSerializer(brand)
        return Response(serializer.data)
    except Brand.DoesNotExist:
        return Response({'message': 'Brand not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_brand_store(request):
    serializer = BrandSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_brand_edit(request, brand_id):
    try:
        brand = Brand.objects.get(id=brand_id)
        serializer = BrandSerializer(brand)
        return Response(serializer.data)
    except Brand.DoesNotExist:
        return Response({'message': 'Brand not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_brand_update(request, brand_id):
    try:
        brand = Brand.objects.get(id=brand_id)
    except Brand.DoesNotExist:
        return Response({'message': 'Brand not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BrandSerializer(brand, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_brand_destroy(request, brand_id):
    try:
        brand = Brand.objects.get(id=brand_id)
    except Brand.DoesNotExist:
        return Response({'message': 'Brand not found'}, status=status.HTTP_404_NOT_FOUND)

    brand.delete()
    return Response({'message': 'Brand deleted successfully'}, status=status.HTTP_204_NO_CONTENT)





# ========== Category model CRUD API VIEWs ============
@api_view(['GET'])
def api_category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
def api_category_store(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_category_show(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response({'message': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def api_category_edit(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response({'message': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_category_update(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'message': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_category_destroy(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'message': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return Response({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)




@api_view(['GET'])
def api_blog_list(request):
    if request.method == 'GET':
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def api_blog_related(request):
    # this is endpoint to get all foreign key field data for select input tag
    categories = Category.objects.all()
    brands = Brand.objects.all()

    category_serializer = CategorySerializer(categories, many=True)
    brand_serializer = BrandSerializer(brands, many=True)

    return Response({
        'categories': category_serializer.data,
        'brands': brand_serializer.data
    })

@api_view(['POST'])
def api_blog_store(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_blog_show(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
        serializer = BlogSerializer(blog)
        return Response(serializer.data)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def api_blog_edit(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
        serializer = BlogSerializer(blog)
        return Response(serializer.data)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def api_blog_update(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BlogSerializer(blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def api_blog_destroy(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

    blog.delete()
    return Response({'message': 'Blog deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    