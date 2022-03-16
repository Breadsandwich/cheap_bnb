from app.models import db, Review

def seed_reviews():
    spot1_review1 = Review(
        user_id = 1,
        spot_id = 1,
        review = 'this place was super affordable.',
        rating = 5
    )
    spot1_review2 = Review(
        user_id = 2,
        spot_id = 1,
        review = 'This box was too small for me.',
        rating = 2
    )
    spot2_review1 = Review(
        user_id = 1,
        spot_id = 2,
        review = 'This spot is very close to so many good places to eat!',
        rating = 4
    )
    spot2_review2 = Review(
        user_id = 2,
        spot_id = 2,
        review = 'The studio is well decorated!',
        rating = 5
    )

    db.session.add(spot1_review1)
    db.session.add(spot1_review2)
    db.session.add(spot2_review1)
    db.session.add(spot2_review2)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
