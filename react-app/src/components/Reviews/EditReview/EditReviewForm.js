import React from 'react'
import { useState } from 'react'
import { useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateReview, getReviews } from '../../../store/reviews';

const EditReviewForm = ({singleReview, closeModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const id = singleReview.id
    const sessionUser = useSelector((state) => state?.session?.user)
    const user_id = useSelector(state => state?.session?.user?.id)

    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(singleReview.rating)
    const [review, setReview] = useState(singleReview.review)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id,
            spot_id: spotId,
            review,
            rating
        }

        const updatedReview = await dispatch(updateReview(payload))

        if (updatedReview?.errors) {
            setErrors(updatedReview?.errors)
        } else {
            await dispatch(getReviews(spotId))

            closeModal();
        }

    }


    return (
        <>
            <div className='create_review_container'>
                <div>
                    {errors.map((error, ind) => (
                    <div className='errors' key={ind}>{error}</div>
                    ))}
                </div>

                <form className='create_review_form' onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder='rating: 1 - 5'
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    />

                    <textarea
                        className='review_textarea'
                        placeholder='This place is...'
                        cols="50"
                        rows="5"
                        value={review}
                        onChange={e => setReview(e.target.value)}
                    >
                    </textarea>
                    <button type='submit'>Edit Review</button>
                </form>
            </div>
        </>
    )
}


export default EditReviewForm;
