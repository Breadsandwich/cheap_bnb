from app.models import db, Booking

def seed_bookings():
    booking_1 = Booking(
        user_id = 1,
        spot_id = 1,
        start_date = '2022-04-10',
        end_date = '2022-04-12',
        guests = 1
    )
    booking_2 = Booking(
        user_id = 1,
        spot_id = 2,
        start_date = '2022-05-09',
        end_date = '2022-05-15',
        guests = 1
    )
    booking_3 = Booking(
        user_id = 2,
        spot_id = 2,
        start_date = '2022-04-09',
        end_date = '2022-04-15',
        guests = 1
    )
    booking_4 = Booking(
        user_id = 2,
        spot_id = 2,
        start_date = '2022-05-20',
        end_date = '2022-05-22',
        guests = 1
    )
    booking_5 = Booking(
        user_id = 3,
        spot_id = 2,
        start_date = '2022-05-19',
        end_date = '2022-05-20',
        guests = 1
    )
    booking_6 = Booking(
        user_id = 3,
        spot_id = 2,
        start_date = '2022-06-09',
        end_date = '2022-06-15',
        guests = 1
    )

    db.session.add(booking_1)
    db.session.add(booking_2)
    db.session.add(booking_3)
    db.session.add(booking_4)
    db.session.add(booking_5)
    db.session.add(booking_6)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE the bookings table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
