from flask import Blueprint, request
from flask_login import login_required, current_user
import psycopg2
from app.forms.review_form import ReviewForm
from app.models import Spot, User, db, Review
from datetime import datetime

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages


# CRUD routes

# -- create bookings --
@review_routes.route('/new', methods=['POST'])
@login_required
def create_booking():
    data = request.json
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id = data['user_id'],
            spot_id = data['spot_id']
            review = data['review'],
            rating = data['rating'],
            created_at = datetime.now(),
            updated_at = datetime.now()
        )

        db.session.add(new_review)
        db.session.commit()

        return data

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# -- read bookings --
@review_routes.route('/<int:spotId>', methods=['GET'])
def get_reviews(spotId):
  all_reviews = Review.query.filter(Review.spot_id == int(spotId)).all()

  return {"spot_reviews": [review.to_dict() for review in all_reviews]}

# -- update bookings --


# -- delete bookings --
