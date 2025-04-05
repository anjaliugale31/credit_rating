from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Mortgage
from .serializers import MortgageSerializer
import logging

logger = logging.getLogger(__name__)

class MortgageListCreateView(generics.ListCreateAPIView):
    queryset = Mortgage.objects.all()
    serializer_class = MortgageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        logger.info(f"New mortgage added: {instance.id} with rating {instance.calculate_credit_rating()}")

class MortgageRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mortgage.objects.all()
    serializer_class = MortgageSerializer

class CreditRatingView(APIView):
    def post(self, request):
        serializer = MortgageSerializer(data=request.data)
        if serializer.is_valid():
            rating = serializer.get_credit_rating(serializer.validated_data)
            return Response({"credit_rating": rating})
        return Response(serializer.errors, status=400)
