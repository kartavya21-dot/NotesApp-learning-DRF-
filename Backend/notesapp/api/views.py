from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import NoteSerializer, RegisterSerializer
from .models import Note

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]


    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)