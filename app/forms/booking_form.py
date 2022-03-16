from datetime import datetime
from email.policy import default
from sqlite3 import Date
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, ValidationError, DateField
from wtforms.validators import DataRequired, NumberRange

def valid_date(form, field):
    if field.data < datetime.date.today():
        raise ValidationError('You cannot book a date in the past.')

class BookingForm(FlaskForm):
    spot_id = IntegerField('Spot Id')
    user_id = IntegerField('User Id')
    start_date = DateField('Start Date', validators=[DataRequired(message='Please select a valid start Date'), valid_date])
    end_date = DateField('End Date', validators=[DataRequired(message='Please select a valid end date.'), valid_date])
    guests = IntegerField('Guests', default=1, validators=[DataRequired(message='Number of guests cannot be blank.'), NumberRange(min=1, max=15, message='The number of guests must be between 1 and 15 guests.')])
    submit = SubmitField('submit')
