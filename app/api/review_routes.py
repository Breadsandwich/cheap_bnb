from flask import Blueprint, request
from flask_login import login_required, current_user
import psycopg2
from app.forms.review_form import ReviewForm
from app.models import Spot, User, db,
from datetime import datetime

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages
