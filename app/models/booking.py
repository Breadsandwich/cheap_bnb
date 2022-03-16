from app.models.db import db
from datetime import datetime

class Booking(db.Model):
  __tablename__ = "bookings"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  spot_id = db.Column(db.Integer, db.ForeignKey("spots.id"), nullable=False)
  start_date = db.Column(db.Date, nullable=False)
  end_date = db.Column(db.Date, nullable=False)
  guests = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime(), nullable=True, default=datetime.now())

  # relationships
  users = db.relationship("User", back_populates="bookings")
  spots = db.relationship("Spot", back_populates="bookings")

  def to_dict(self):
    return {
      "id": self.id,
      'user_id': self.user_id,
      "spot_id": self.spot_id,
      "start_date": self.start_date,
      "end_date": self.end_date,
      "guests": self.guests,
      "created_at": self.created_at,
      "updated_at": self.updated_at,

    }
