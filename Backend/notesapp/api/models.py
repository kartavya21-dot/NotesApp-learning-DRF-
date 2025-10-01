from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes', null=True, blank=True)
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=1000, default="")
    attachment = CloudinaryField('attachment', null=True, blank=True, resource_type='auto')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title