from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Pondok
from .serializers import PondokSerializer
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import ValidationError

class PondokViewSet(viewsets.ModelViewSet):
    queryset = Pondok.objects.all()
    serializer_class = PondokSerializer

    def get_object(self):
        """Override get_object to provide a custom error message."""
        try:
            return super().get_object()
        except Exception:
            raise NotFound({"status_code": status.HTTP_404_NOT_FOUND, "message": "Pondok not found."})

    def create(self, request, *args, **kwargs):
        try :
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            response_data = {
                "data": serializer.data,
                "status_code": status.HTTP_201_CREATED,
                "message": "Pondok created successfully."
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            response_data = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "Bad request.",
                "errors": e.detail  # This will contain the validation errors
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "Pondok retrieved successfully."
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "Pondok updated successfully."
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        response_data = {
            "status_code": status.HTTP_204_NO_CONTENT,
            "message": "Pondok deleted successfully."
        }

        return Response(response_data, status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        response_data = {
            "data": serializer.data,
            "status_code": status.HTTP_200_OK,
            "message": "List of Pondoks retrieved successfully."
        }

        return Response(response_data, status=status.HTTP_200_OK)
