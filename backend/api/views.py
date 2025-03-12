from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.middleware.csrf import rotate_token
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Item
from .serializers import ItemSerializer, UserSerializer

# Get CSRF token
@api_view(['GET'])
@permission_classes([AllowAny])
def csrf_token(request):
    """
    Get a CSRF token for use with unsafe methods (POST, PUT, DELETE)
    """
    token = rotate_token(request)
    return Response({'csrfToken': token})

# Authentication views
@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def login_view(request):
    """Handle login requests and OPTIONS preflight requests"""
    if request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({'detail': 'Login successful'})
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST', 'OPTIONS'])
def logout_view(request):
    """Handle logout requests and OPTIONS preflight requests"""
    if request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    logout(request)
    return Response({'detail': 'Logout successful'})

@api_view(['GET', 'OPTIONS'])
@permission_classes([AllowAny])
def user_view(request):
    """Handle user info requests and OPTIONS preflight requests"""
    if request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    else:
        return Response({'detail': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

# Items views
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-created_at')
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]  # Require authentication for all CRUD operations

    def dispatch(self, request, *args, **kwargs):
        """Handle OPTIONS requests"""
        if request.method == 'OPTIONS':
            response = Response(status=status.HTTP_200_OK)
            return response
        return super().dispatch(request, *args, **kwargs)

@api_view(['GET', 'OPTIONS'])
@permission_classes([IsAuthenticated])  # Require authentication
def items_list(request):
    """Protected endpoint for listing items, only for authenticated users"""
    if request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    items = Item.objects.all().order_by('-created_at')
    serializer = ItemSerializer(items, many=True)
    return Response({'items': serializer.data})

@api_view(['GET', 'PUT', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def item_detail(request, pk):
    """Get or update a specific item by ID"""
    if request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    # Get the item or return 404
    item = get_object_or_404(Item, pk=pk)

    if request.method == 'GET':
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
