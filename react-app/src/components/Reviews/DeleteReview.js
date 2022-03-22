import { deleteReview, getReviews } from "../../store/reviews"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
// import match from "../../utils/match"



const DeleteReviewButton = ({ singleReview, spot }) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    // console.log('@@@@@@@@@@@@@',spot)

    // const sessionId = useSelector(state => state?.session?.user?.id)
    // const writerId = singleReview.writer_id

    // const matchingToSessionUser = match(sessionId, writerId)


    const handleDelete = async (e) => {

        await dispatch(deleteReview(singleReview?.id))
        dispatch(getReviews(spot?.id))
    }

    return (
        // matchingToSessionUser && (
            <button className='comment-delete-btn' onClick={() => handleDelete(singleReview?.id)}
            >Delete</button>
        // )
    )
}

export default DeleteReviewButton
