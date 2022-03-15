from .db import db


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey('spots.id'), nullable=False)
    url = db.Column(db.String, nullable=False)

    spots = db.relationship("Spot", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "spot_id": self.spot_id,
            "url": self.url,
        }
