import { useEffect, useState } from 'react';
import { createReview, getReviews } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewFormModal from './EditReview/ReviewModal';
import DeleteReviewButton from './DeleteReview';
import './Reviews.css'

const ReviewsComponent = ({ spot }) => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state?.session?.user)
    // const user_id = useSelector(state => state?.session?.user?.id)


    const reviewsObj = useSelector(state => state?.reviewReducer);
    const reviews = Object.values(reviewsObj)


    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [ dispatch, spotId ])

    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('1');

    const handleNewReview = async (e) => {
        e.preventDefault();
        // const formData = new FormData();

        // formData.append('owner', user_id);
        // formData.append('review', review);
        // formData.append('rating', parseInt(rating))

        const payload = {
            user_id: sessionUser.id,
            spot_id: spotId,
            review,
            rating
        }

        const postReview = await dispatch(createReview(payload));

        if (postReview) {
            await dispatch(getReviews(spotId))
            if (postReview?.errors) setErrors(postReview?.errors)
            setRating('1')
            setReview('')
        }
    }

    return (
        <>
            <div className='reviews_component'>
                <div className='create_review_container'>
                <div>
                        {errors.map((error, ind) => (
                        <div className='errors' key={ind}>{error}</div>
                        ))}
                    </div>

                    {sessionUser !== null && <>
                    <form className='create_review_form' onSubmit={handleNewReview}>
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
                        <button type='submit' className='new_review_btn'>New Review</button>
                    </form>
                    </>}
                </div>


            <div className='posted_reviews_container'>
                {reviews?.reverse().map(singleReview => (
                    <div className='single_review' key={singleReview?.id}>
                        <div className='review_box'>
                            <h3>Review by: {singleReview?.owner}</h3>
                                <p>{singleReview?.review}</p>
                            </div>
                                rating: {singleReview?.rating}/5
                            <div>
                            </div>
                            <div className='review_edit_delete_btn'>
                            {sessionUser?.id === singleReview?.user_id && <>
                                <ReviewFormModal singleReview={singleReview} />
                                <DeleteReviewButton singleReview={singleReview} spot={spot} />
                            </>}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </>
    )
}

export default ReviewsComponent
