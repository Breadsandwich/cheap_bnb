import { useEffect, useState } from 'react';
import { createReview, getReviews } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewFormModal from './EditReview/ReviewModal';
import { ReviewDeleteButton } from '../utils/Buttons';
import DeleteReviewButton from './DeleteReview';
import './Reviews.css'

const ReviewsComponent = ({ spot }) => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state?.session?.user)
    const user_id = useSelector(state => state?.session?.user?.id)


    const reviewsObj = useSelector(state => state?.reviewReducer);
    const reviews = Object.values(reviewsObj)


    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [ dispatch, spotId ])

    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('0');

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
            setRating('')
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

                    <form className='create_review_form' onSubmit={handleNewReview}>
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
                        <button type='submit'>New Review</button>
                    </form>
                </div>


            <ul className='posted_reviews_container'>
                {reviews?.map(singleReview => (
                    <li className='listed_reviews' key={singleReview?.id}>
                        <h3>Review by: {singleReview?.owner}</h3>
                        <div className='review_box'>
                            <p>{singleReview?.review}</p>
                        </div>
                            rating: {singleReview?.rating}/5
                        <div>
                        </div>
                        <div className='review_edit_delete_btn'>
                            <ReviewFormModal singleReview={singleReview} />
                            <DeleteReviewButton singleReview={singleReview} spot={spot} />
                            {/* <ReviewDeleteButton reviewId={singleReview?.id} spotId={spot?.id}/> */}

                        </div>
                    </li>
                ))}
            </ul>
          </div>
        </>
    )
}

export default ReviewsComponent
