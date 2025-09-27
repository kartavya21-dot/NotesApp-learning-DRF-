from django.shortcuts import render
from rest_framework import viewsets
from .serializers import NoteSerializer
from .models import Note

# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.all()