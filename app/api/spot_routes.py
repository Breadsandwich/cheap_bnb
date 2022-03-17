from crypt import methods
from flask import Blueprint, request
from flask_login import login_required, current_user
import psycopg2
from app.forms.spot_form import SpotForm
from app.models import Spot, User, db, Image
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

# -- create spots --
@spot_routes.route('/new', methods=['POST'])
# @login_required
def create_spot():
  form = SpotForm()
  form['csrf_token'].data = request.cookies['csrf_token']

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
      # created_at = datetime.now(),
      # updated_at = datetime.now()
    )

    db.session.add(new_spot)
    db.session.commit()
    return {**new_spot.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@spot_routes.route('/<int:spotId>/photos', methods=['POST'])
def upload_images(spotId):
  photo_list = []

  if 'images' not in request.files:
    return {'errors': 'images required'}, 400

  images = request.files.getlist('images')

  for image in images:
    if not allowed_file(image.filename):
      return {'errors': 'file type not permitted'}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    if "url" not in upload:
      return upload, 400
    url = upload["url"]
    new_image = Image(spot_id=spotId, url=url)

    db.session.add(new_image)
    db.session.commit()

    photo_list.append(url)

  return {'photo_list': photo_list}


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
