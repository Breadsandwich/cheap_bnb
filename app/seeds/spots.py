from app.models import db, Spot

def seed_spots():
    spot_1 = Spot(
        user_id = 1,
        spot_name = 'compfy box near south moutain',
        description = 'Big enough to curl into a ball and enough breathing room. Box in backyard to keep you off the streets.',
        address = '545 E Dobbins Rd',
        city = 'Phoenix',
        state = 'AZ',
        price = 2,
        guest_limit = 1,
        image_url = 'http://2.bp.blogspot.com/-pspybnFG5F4/TfGgqcoEWlI/AAAAAAAACbw/NV0o7Tmhl6s/s1600/FF-Cardboard-Fort.jpg'
    )
    spot_2 = Spot(
        user_id = 1,
        spot_name = 'Broadway Midtown Studio',
        description = 'New and nicely furnished studio apartment.',
        address = '555 8th ave #2310',
        city = 'New York',
        state = 'NY',
        price = 39,
        guest_limit = 2,
        image_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-49946887/original/b179070f-3942-443b-a21b-cb2d01969175.jpeg'
    )

    db.session.add(spot_1)
    db.session.add(spot_2)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE the spots table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()
