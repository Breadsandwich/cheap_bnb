from crypt import methods
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
# @login_required
def create_booking():
  form = BookingForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_booking = Booking(
      user_id = form.data['user_id'],
      spot_id = form.data['spot_id'],
      start_date = form.data['start_date'],
      end_date = form.data['end_date'],
      guests = form.data['guests'],
      created_at = datetime.now(),
      updated_at = datetime.now()
    )

    db.session.add(new_booking)
    db.session.commit()

    return { 'booking': new_booking.to_dict()}



# -- read bookings --
@booking_routes.routes('/<int:id>', methods=['GET'])
# @login_required
def get_bookings(id):
  all_my_bookings = Booking.query.filter(Booking.user_id == id).all()

  return {'all_my_bookings': [booking.to_dict() for booking in all_my_bookings]}

# -- update bookings --
@booking_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_booking():
  form = BookingForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    booking = Booking.query.get(id)
    booking.user_id = form.data['user_id']
    booking.spot_id = form.data['spot_id']
    booking.start_date = form.data['start_date']
    booking.end_date = form.data['end_date']
    booking.guests = form.data['guests']
    booking.updated_at = datetime.now()

    db.session.commit()

    return { 'booking': booking.to_dict() }

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# -- delete bookings --

@booking_routes.route("/<int:bookingId>", methods=['DELETE'])
@login_required
def delete_booking(bookingId):
  booking = Booking.query.get(bookingId)
  db.session.delete(booking)
  db.session.commit()

  return {'bookingId': bookingId}
