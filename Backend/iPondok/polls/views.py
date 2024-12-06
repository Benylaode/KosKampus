from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets, permissions, serializers, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Pondok, Order, UserProfile, PondokImage
from .serializers import PondokSerializer, OrderSerializer, RegisterSerializer, UserProfileSerializer
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import BasePermission
from rest_framework.decorators import permission_classes
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class IsAdminGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Admin').exists()
class IsStafGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Staf').exists()
    
class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.userprofile.role == 'admin'
        return False
class IsStaff(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.userprofile.role in ['staf', 'admin']
        return False

class PondokPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'  
    max_page_size = 100  
    
class PondokSearchView(APIView):
    def get(self, request):
        query = request.GET.get('q', '')  # Ambil parameter 'q' dari URL query string
        if query:
            pondoks = Pondok.objects.prefetch_related('gambar').filter(nama__icontains=query)  # Sertakan gambar
        else:
            pondoks = Pondok.objects.prefetch_related('gambar').all()  # Jika tidak ada query, tampilkan semua pondok
        
        paginator = PondokPagination()
        paginated_pondoks = paginator.paginate_queryset(pondoks, request, view=self)
        
        serializer = PondokSerializer(paginated_pondoks, many=True)
        return paginator.get_paginated_response(serializer.data)
    
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            response_data = {
                "data": {
                    "access_token": tokens["access"],
                    "refresh_token": tokens["refresh"]
                },
                "status_code": status.HTTP_200_OK,
                "message": "Token retrieved successfully."
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            response_data = {
                "data": None,
                "status_code": status.HTTP_401_UNAUTHORIZED,
                "message": "Invalid credentials."
            }
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            response_data = {
                "data": {
                    "access_token": tokens["access"],
                },
                "status_code": status.HTTP_200_OK,
                "message": "Token refreshed successfully."
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            response_data = {
                "data": None,
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to refresh token."
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

class PondokViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser]
    queryset = Pondok.objects.prefetch_related('gambar').all()
    serializer_class = PondokSerializer

    def get_queryset(self):
        """
        Filter queryset berdasarkan query parameter 'q' (search).
        """
        queryset = Pondok.objects.all()  # Ambil semua Pondok

        # Ambil query 'q' dari URL
        query = self.request.GET.get('q', '')
        if query:
            queryset = queryset.filter(nama__icontains=query)  # Filter berdasarkan nama Pondok
        
        return queryset

    @method_decorator(receiver(post_migrate))
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()  # Mendapatkan queryset berdasarkan query string

        paginator = PondokPagination()
        page = paginator.paginate_queryset(queryset, request, view=self)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response_data = {
                "data": serializer.data,
                "status_code": status.HTTP_200_OK,
                "message": "List of Pondoks retrieved successfully."
            }
            return paginator.get_paginated_response(response_data)

        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "List of Pondoks retrieved successfully."
        }
        return Response(response_data, status=status.HTTP_200_OK)

    @method_decorator(receiver(post_migrate))
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "Pondok retrieved successfully."
        }
        return Response(response_data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated, IsStafGroup, IsStaff])
    @method_decorator(receiver(post_migrate))
    def create(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"detail": "Anda tidak memiliki izin untuk membuat data."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pondok = serializer.save()

        # Handle uploaded images
        uploaded_images = request.FILES.getlist('gambar')
        for image in uploaded_images:
            PondokImage.objects.create(pondok=pondok, image=image)

        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_201_CREATED,
            "message": "Pondok created successfully."
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    @permission_classes([IsAuthenticated, IsStafGroup, IsStaff])
    @method_decorator(receiver(post_migrate))
    def update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"detail": "Anda tidak memiliki izin untuk membuat data."}, status=status.HTTP_403_FORBIDDEN)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        serializer.is_valid(raise_exception=True)

        # Handle uploaded images
        uploaded_images = request.FILES.getlist('images')
        for image in uploaded_images:
            PondokImage.objects.create(pondok=instance, image=image)

        self.perform_update(serializer)

        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "Pondok berhasil diperbarui."
        }

        return Response(response_data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated, IsStafGroup])
    @method_decorator(receiver(post_migrate))
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        response_data = {
            "status_code": status.HTTP_204_NO_CONTENT,
            "message": "Pondok deleted successfully."
        }
        return Response(response_data, status=status.HTTP_204_NO_CONTENT)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_object(self):
        """Override get_object to provide a custom error message."""
        try:
            return super().get_object()
        except Exception:
            raise NotFound({"status_code": status.HTTP_404_NOT_FOUND, "message": "Order not found."})
        

    @method_decorator(receiver(post_migrate))
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            response_data = {
                "data": serializer.data,
                "status_code": status.HTTP_201_CREATED,
                "message": "Pondok created successfully."
            }

            # Kirim email notifikasi menggunakan django.core.mail
            send_mail(
                'Pesanan Anda Telah Dibuat',
                f'Order baru dengan ID {serializer.data["id"]} telah berhasil dibuat.',
                'ba',  # Ganti dengan email pengirim
                [request.data['email_buyer']],  # Ganti dengan daftar penerima
                fail_silently=False,
            )

            return Response(response_data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            # ... (bagian penanganan error lainnya)
                response_data = {
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": "Bad request.",
                    "errors": e.detail  # This will contain the validation errors
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    # def send_pondok_creation_email(self, pondok_data):
    #     """
    #     Sends an email notification upon successful Order creation.

    #     Args:
    #         pondok_data (dict): Dictionary containing the created Pondok data.
    #     """

    #     # Import necessary libraries for email functionality
    #     import smtplib
    #     from email.mime.text import MIMEText

    #     # Replace with your actual email configuration (sender, receiver, etc.)
    #     sender_email = "your_email@example.com"
    #     receiver_email = "recipient_email@example.com"
    #     email_password = "your_email_password"  # Consider using a secure method for passwords
    #     smtp_server = "smtp.example.com"  # Replace with your SMTP server address

    #     # Construct email message content
    #     email_subject = "New Pondok Created"
    #     email_body = f"A new Pondok has been created with the following details:\n\n{pondok_data}"

    #     message = MIMEText(email_body, 'plain')
    #     message['Subject'] = email_subject
    #     message['From'] = sender_email
    #     message['To'] = receiver_email

    #     # Create a secure connection with the SMTP server
    #     with smtplib.SMTP_SSL(smtp_server) as server:
    #         server.login(sender_email, email_password)
    #         server.sendmail(sender_email, receiver_email, message.as_string())

    #     print(f"Email notification sent for newly created Pondok with data: {pondok_data}")



    @method_decorator(receiver(post_migrate))
    def retrieve(self, request, *args, **kwargs):
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            

            response_data = {
                "data": serializer.data,
                "status_code": status.HTTP_200_OK,
                "message": "Order retrieved successfully."
            }

            return Response(response_data, status=status.HTTP_200_OK)
    


    @method_decorator(receiver(post_migrate))
    @permission_classes([IsAuthenticated, IsStafGroup, IsStaff])
    def update(self, request, *args, **kwargs):
        if not request.user.is_staff:
                return Response({"detail": "Anda tidak memiliki izin untuk membuat data."}, status=status.HTTP_403_FORBIDDEN)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "Order updated successfully."
        }

        return Response(response_data, status=status.HTTP_200_OK)



    @method_decorator(receiver(post_migrate))
    def destroy(self, request, *args, **kwargs):
        if not request.user.is_staff:
                return Response({"detail": "Anda tidak memiliki izin untuk membuat data."}, status=status.HTTP_403_FORBIDDEN)

        instance = self.get_object()
        self.perform_destroy(instance)

        response_data = {
            "status_code": status.HTTP_204_NO_CONTENT,
            "message": "Order deleted successfully."
        }

        return Response(response_data, status=status.HTTP_204_NO_CONTENT)



    @method_decorator(receiver(post_migrate))
    def list(self, request, *args, **kwargs):
        if not request.user.is_staff:
                return Response({"detail": "Anda tidak memiliki izin untuk membuat data."}, status=status.HTTP_403_FORBIDDEN)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "List of Orders retrieved successfully."
        }

        return Response(response_data, status=status.HTTP_200_OK)
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Tidak memerlukan autentikasi
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Membuat refresh token dan access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            # Menyusun data response
            response_data = {
                "data": {
                    "user": serializer.data,
                    "access_token": access_token,
                    "refresh_token": str(refresh),
                },
                "status_code": status.HTTP_201_CREATED,
                "message": "User registered successfully."
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        # Jika serializer tidak valid
        response_data = {
            "data": serializer.errors,
            "status_code": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to register user."
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]


    
    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    
class UploadImageView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, pondok_id, *args, **kwargs):
        # Validasi izin pengguna
        if not request.user.is_staff:
            response_data = {
                "data": None,
                "status_code": status.HTTP_403_FORBIDDEN,
                "message": "Anda tidak memiliki izin untuk mengunggah gambar."
            }
            return Response(response_data, status=status.HTTP_403_FORBIDDEN)

        # Validasi keberadaan pondok
        try:
            pondok_instance = Pondok.objects.get(id=pondok_id)
        except Pondok.DoesNotExist:
            response_data = {
                "data": None,
                "status_code": status.HTTP_404_NOT_FOUND,
                "message": "Pondok tidak ditemukan."
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        # Validasi file yang diunggah
        uploaded_images = request.FILES.getlist('gambar')
        if not uploaded_images:
            response_data = {
                "data": None,
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "Tidak ada gambar yang diunggah."
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # Proses penyimpanan gambar
        saved_images = []
        for image in uploaded_images:
            pondok_image = PondokImage.objects.create(pondok=pondok_instance, image=image)
            saved_images.append({
                "id": pondok_image.id,
                "image_url": pondok_image.image.url,
                "uploaded_at": pondok_image.uploaded_at
            })

        # Respons sukses
        response_data = {
            "data": saved_images,
            "status_code": status.HTTP_200_OK,
            "message": "Gambar berhasil diunggah."
        }
        return Response(response_data, status=status.HTTP_200_OK)