from flask import Blueprint, request
from flask_login import login_required, current_user
import psycopg2
import os
from app.forms.spot_form import SpotForm
from app.models import Spot, User, db
from datetime import datetime
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

spot_routes = Blueprint('spots', __name__)


def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages


# CRUD routes

#--- test create with photo upload ---
@spot_routes.route('/new', methods=['POST'])
# @login_required
def create_spot():
  form = SpotForm()
  # Try to get CSRF token from form data first (for file uploads), then from cookies
  if 'csrf_token' in request.form:
    form['csrf_token'].data = request.form['csrf_token']
  else:
    form['csrf_token'].data = request.cookies['csrf_token']

  # Debug: Print form data to understand what's being received
  print("Form data:", form.data)
  print("Image URL type:", type(form.data['image_url']))
  print("Request form:", request.form)
  print("Request files:", request.files)
  print("S3 Bucket:", os.environ.get("AWS_S3_BUCKET"))
  print("AWS Access Key:", "Set" if os.environ.get("AWS_ACCESS_KEY_ID") else "Not Set")
  if form.data['image_url']:
    print("Image filename:", getattr(form.data['image_url'], 'filename', 'No filename'))

  url = 'no data provided'
  if type(form.data['image_url']) is not str:
    image = form.data['image_url']

    if not image or not image.filename:
      return {"errors": "No image file provided"}, 400

    if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400

    unique_filename = get_unique_filename(image.filename)
    if not unique_filename:
      return {"errors": "Invalid filename or file type"}, 400

    image.filename = unique_filename
    upload = upload_file_to_s3(image)
    if "url" not in upload:
      return upload, 400
    url = upload["url"]

  try:
    if form.validate_on_submit():
      new_spot = Spot(
        user_id = form.data['user_id'],
        spot_name = form.data['spot_name'],
        description = form.data['description'],
        address = form.data['address'],
        city = form.data['city'],
        state = form.data['state'],
        price = form.data['price'],
        guest_limit = form.data['guest_limit'],
        image_url = url,
        created_at = datetime.now(),
        updated_at = datetime.now()
      )

      db.session.add(new_spot)
      db.session.commit()
      return {**new_spot.to_dict()}

    # If form validation fails, return the errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
  except Exception as e:
    print("Error during form validation:", str(e))
    return {'errors': [str(e)]}, 400



# -- read spots --
@spot_routes.route("/all", methods=["GET"])
def get_all_spots():
  all_spots = Spot.query.all()

  return {"all_spots": [spot.to_dict() for spot in all_spots]}
  # return {'all_spots': all_spots.to_dict()}

  # return {'all_spots': spots}


#-----------------------------
@spot_routes.route("/<int:spotId>", methods=["GET"])
def get_one_spot(spotId):
  one_spot = Spot.query.get(spotId)

  return {**one_spot.to_dict()}

# -- update spots --
@spot_routes.route("/<int:spotId>", methods=['PUT'])
# @login_required
def update_spot(spotId):
  form = SpotForm()
  # Try to get CSRF token from form data first (for file uploads), then from cookies
  if 'csrf_token' in request.form:
    form['csrf_token'].data = request.form['csrf_token']
  else:
    form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    spot = Spot.query.get(spotId)
    spot.spot_name = form.data['spot_name']
    spot.description = form.data['description']
    spot.address = form.data['address']
    spot.city = form.data['city']
    spot.state = form.data['state']
    spot.price = form.data['price']
    spot.guest_limit = form.data['guest_limit']
    spot.updated_at = datetime.now()

    db.session.commit()

    return {**spot.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# -- delete spots --

@spot_routes.route("/<int:spotId>", methods=['DELETE'])
# @login_required
def delete_spot(spotId):
  spot = Spot.query.get(spotId)
  db.session.delete(spot)
  db.session.commit()

  return {'id': spotId}




#------------ for testing copy paste purposes --------------

# {
#     "address": "12345",
#     "city": "Phoenix",
#     "description": "test spot listing... new spot got updated",
#     "guest_limit": 5,
#     "host": "Demo",
#     "price": "300.00",
#     "spot_name": "test spot 12345 updated",
#     "state": "AZ",
#     "user_id": 1
# }
