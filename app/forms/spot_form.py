from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class SpotForm(FlaskForm):
    user_id = IntegerField('user_id')
    spot_name = StringField('spot_name')
