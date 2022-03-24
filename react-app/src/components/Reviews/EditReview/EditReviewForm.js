import React from 'react'
import { useState } from 'react'
import { useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateReview, getReviews } from '../../../store/reviews';

const EditReviewForm = ({singleReview, closeModal}) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { spotId } = useParams();
    const id = singleReview.id
    // const sessionUser = useSelector((state) => state?.session?.user)
    // const user_id = useSelector(state => state?.session?.user?.id)

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
                    <fieldset>
                            <div className='rating_container'>
                                <span>rating</span>
                                <select name="rating" id="select_rating" value={rating} onChange={e => setRating(e.target.value)}>
                                    <option value="1">★</option>
                                    <option value="2">★★</option>
                                    <option value="3">★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="5">★★★★★</option>
                                </select>
                            </div>

                            <textarea
                                className='review_textarea'
                                placeholder='Write a quick review?'
                                cols="50"
                                rows="5"
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                >
                            </textarea>
                        </fieldset>
                    <button type='submit'>Edit Review</button>
                </form>
            </div>
        </>
    )
}


export default EditReviewForm;
