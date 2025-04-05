from django.db import models

# Create your models here.
from django.db import models

class Mortgage(models.Model):
    LOAN_TYPES = [('fixed', 'Fixed'), ('adjustable', 'Adjustable')]
    PROPERTY_TYPES = [('single_family', 'Single Family'), ('condo', 'Condo')]

    credit_score = models.IntegerField()
    loan_amount = models.FloatField()
    property_value = models.FloatField()
    annual_income = models.FloatField()
    debt_amount = models.FloatField()
    loan_type = models.CharField(max_length=10, choices=LOAN_TYPES)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_credit_rating(self):
        ltv = self.loan_amount / self.property_value  # Loan-to-Value Ratio
        dti = self.debt_amount / self.annual_income  # Debt-to-Income Ratio

        if self.credit_score >= 750 and ltv < 0.8 and dti < 0.35:
            return "AAA"
        elif self.credit_score >= 650 and ltv < 0.9 and dti < 0.45:
            return "BBB"
        else:
            return "C"
