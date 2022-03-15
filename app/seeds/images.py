from app.models import db, Image

def seed_images():
    spot1_image1 = Image(
        spot_id = 1,
        url = 'http://2.bp.blogspot.com/-pspybnFG5F4/TfGgqcoEWlI/AAAAAAAACbw/NV0o7Tmhl6s/s1600/FF-Cardboard-Fort.jpg'
    )

    spot2_image1 = Image(
        spot_id = 2,
        url = 'https://a0.muscache.com/im/pictures/miso/Hosting-49946887/original/b179070f-3942-443b-a21b-cb2d01969175.jpeg'
    )
    spot2_image2 = Image(
        spot_id = 2,
        url = 'https://a0.muscache.com/im/pictures/miso/Hosting-49946887/original/cdf9a93f-1d87-4d08-ae14-ecc386925348.jpeg'
    )
    # db.session.add()

    db.session.add(spot1_image1)
    db.session.add(spot2_image1)
    db.session.add(spot2_image2)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE the cheatsheets table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE cheatsheets RESTART IDENTITY CASCADE;')
    db.session.commit()
