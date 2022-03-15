from app.models.db import db
from datetime import datetime

class Spot(db.Model):
    __tablename__ = 'spots'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    spot_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    guest_limit = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

    users = db.relationship('User', back_populates='spots')
    bookings = db.relationship('Booking', back_populates='spots', cascade="all, delete")
    reviews = db.relationship('Review', back_populates='spots', cascade="all, delete")
    images = db.relationship('Image', back_populates='spots', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'spot_name': self.spot_name,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'price': self.price,
            'guest_limit': self.guest_limit,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            'host': self.users.username
        }
