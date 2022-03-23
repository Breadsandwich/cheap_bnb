from email import message
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def valid_email(form, field):
    email = field.data
    if '@' not in email or '.' not in email:
        raise ValidationError('must be valid email format: example@email.com')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message='username field is required'), Length(min=3, max=40, message='Username length must be between 3 and 40 characters long'), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email, Email()])
    password = StringField('password', validators=[DataRequired(message='Password field is required'), Regexp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", message='Mininium eight characters, one uppercase letter, one number, and one special character.')])
    repeated_password = StringField('repeated password', validators=[DataRequired(message='Repeated password field is required'), EqualTo('password', message='Passwords must be matching.')])
