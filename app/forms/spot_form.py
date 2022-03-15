from flask_wtf import FlaskForm
from sqlalchemy import String
from wtforms import StringField, IntegerField, SubmitField, DecimalField, FileField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange

class SpotForm(FlaskForm):
    user_id = IntegerField('user_id')
    spot_name = StringField('spot_name', validators=[DataRequired(message='Please provide a name for your spot.'), Length(min=3, max=50, message='Your spot name must be between 3 and 50 characters.')])
    description = StringField('description', validators=[Length(max=255, message='Your description must be under 255 characters.')])
    address = StringField('address',  validators=[Length(max=255, message='Your address must be under 255 characters.')])
    city = StringField('city', validators=[DataRequired(message='City field cannot be left blank')])
    state = StringField('state', validators=[DataRequired(message='State field cannot be left blank')])
    price = DecimalField('price', validators=[DataRequired(message='Price field cannot be left blank'), NumberRange(min=1, max=1000, message='Price must be between $1 and $1000.')])
    guest_limit = IntegerField('guests', validators=[DataRequired(message='Please enter a guest limit'), NumberRange(min=1, max=15, message='Guest limit must be between 1 and 15 guests.')])
    images = StringField('images')
    submit = SubmitField('submit')
