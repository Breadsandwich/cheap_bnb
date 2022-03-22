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

# -- create reviews --
@review_routes.route('/new', methods=['POST'])
# @login_required
def create_review():
    data = request.json
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id = data['user_id'],
            spot_id = data['spot_id'],
            review = data['review'],
            rating = data['rating']
        )

        db.session.add(new_review)
        db.session.commit()

        return {'new_review': new_review.to_dict()}
        # return {**new_review.to_dict()}
        # return data

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# -- read reviews --
@review_routes.route('/<int:id>', methods=['GET'])
def get_reviews(id):
  all_reviews = Review.query.filter(Review.spot_id == int(id)).all()

  return {"spot_reviews": [review.to_dict() for review in all_reviews]}

# -- update reviews --
@review_routes.route("/<int:id>", methods=['PUT'])
# @login_required
def update_review(id):
    data = request.json
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      updated_review = Review.query.get(id)
      # updated_review.user_id = data['user_id']
      # updated_review.spot_id = data['spot_id']
      updated_review.rating = data['rating']
      updated_review.review = data['review']

      db.session.commit()

      # return {}
      # return { 'updated_review': update_review.to_dict() }
      return updated_review.to_dict()
      # return { 'review': data }


    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# -- delete reviews --
@review_routes.route("/<int:reviewId>", methods=['DELETE'])
# @login_required
def delete_review(reviewId):
  review = Review.query.get(reviewId)
  db.session.delete(review)
  db.session.commit()

  return {'reviewId': reviewId}
