import { deleteReview, getReviews } from "../../store/reviews"
import { useDispatch } from "react-redux"



const DeleteReviewButton = ({ singleReview, spot }) => {
    const dispatch = useDispatch();


    const handleDelete = async (e) => {

        await dispatch(deleteReview(singleReview?.id))
        dispatch(getReviews(spot?.id))
    }

    return (
        // matchingToSessionUser && (
            <button className='review_delete_btn' onClick={() => handleDelete(singleReview?.id)}
            >Delete</button>
        // )
    )
}

export default DeleteReviewButton
