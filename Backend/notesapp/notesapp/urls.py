from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from api.views import NoteViewSet, RegisterView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register("notes", NoteViewSet, basename='notes')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)