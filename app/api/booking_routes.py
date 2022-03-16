from flask import Blueprint, request
from flask_login import login_required, current_user
import psycopg2
from app.forms.booking_form import BookingForm
from app.models import Spot, User, db, Booking
from datetime import datetime

booking_routes = Blueprint('bookings', __name__)


def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages


# CRUD routes

# -- create bookings --
@booking_routes.route('/new', methods=['POST'])
@login_required
def create_booking():
    data = request.json
    form = BookingForm()



# -- read bookings --

# -- update bookings --

# -- delete bookings --
