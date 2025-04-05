from django.test import TestCase
from .models import Mortgage

class MortgageModelTest(TestCase):

    def test_high_credit_rating(self):
        mortgage = Mortgage(
            credit_score=780,
            loan_amount=200000,
            property_value=300000,
            annual_income=100000,
            debt_amount=30000,
            loan_type='fixed',
            property_type='single_family'
        )
        self.assertEqual(mortgage.calculate_credit_rating(), "AAA")

    def test_medium_credit_rating(self):
        mortgage = Mortgage(
            credit_score=680,
            loan_amount=250000,
            property_value=290000,
            annual_income=80000,
            debt_amount=35000,
            loan_type='adjustable',
            property_type='condo'
        )
        self.assertEqual(mortgage.calculate_credit_rating(), "BBB")

    def test_low_credit_rating(self):
        mortgage = Mortgage(
            credit_score=600,
            loan_amount=270000,
            property_value=280000,
            annual_income=60000,
            debt_amount=40000,
            loan_type='fixed',
            property_type='single_family'
        )
        self.assertEqual(mortgage.calculate_credit_rating(), "C")

    def test_edge_case_high_ltv(self):
        mortgage = Mortgage(
            credit_score=760,
            loan_amount=290000,
            property_value=300000,
            annual_income=90000,
            debt_amount=20000,
            loan_type='fixed',
            property_type='condo'
        )
        self.assertEqual(mortgage.calculate_credit_rating(), "C")

    def test_edge_case_high_dti(self):
        mortgage = Mortgage(
            credit_score=770,
            loan_amount=230000,
            property_value=300000,
            annual_income=50000,
            debt_amount=30000,
            loan_type='adjustable',
            property_type='condo'
        )
        self.assertEqual(mortgage.calculate_credit_rating(), "C")

    def test_invalid_credit_score(self):
        mortgage = Mortgage(
            credit_score=-50,
            loan_amount=100000,
            property_value=200000,
            annual_income=70000,
            debt_amount=10000,
            loan_type='fixed',
            property_type='single_family'
        )
        self.assertEqual(mortgage.calculate_credit_rating(), "C")

    def test_negative_loan_amount(self):
        mortgage = Mortgage(
            credit_score=700,
            loan_amount=-100000,
            property_value=200000,
            annual_income=80000,
            debt_amount=10000,
            loan_type='adjustable',
            property_type='condo'
        )
        rating = mortgage.calculate_credit_rating()
        self.assertIn(rating, ["AAA", "BBB", "C"])
