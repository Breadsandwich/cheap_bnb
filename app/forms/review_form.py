from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired, NumberRange


class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired('Please leave a rating between 1 and 5.'), NumberRange(min=1, max=5, message='Please leave a rating between 1 and 5.')])
    review = StringField('review', validators=[DataRequired('Please leave a message for your review.')])
    submit = SubmitField('submit')
