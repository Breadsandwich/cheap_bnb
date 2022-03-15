from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
import psycopg2
from app.forms.spot_form import SpotForm
from app.models import Spot, Review, User, db
from datetime import datetime

spot_routes = Blueprint('spots', __name__)


def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{field.capitalize()} : {error}')
  return errorMessages


# CRUD routes

# -- create spots --
@spot_routes('/', methods=['POST'])
@login_required
def create_spot():



# -- read spots --

# -- update spots --

# -- delete spots --
