import { useHistory } from 'react-router-dom';
// import { deleteSpot } from "../../store/spots";
import { deleteSpot } from '../../../store/spots';
import { deleteReview } from '../../../store/reviews';
import { useDispatch } from "react-redux";


export const DeleteButton = ({ thisId, deleteThunk, config }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  config = { buttonName: 'Delete', newRoute: null, ...config }

  const handleDelete = async () => {
    const deleted = await dispatch(deleteThunk(thisId));
    return config.newRoute ? history.push(config.newRoute) : deleted;
  }

  return (
    <button className='delete' onClick={handleDelete}>{config.buttonName}</button>
  )
}


export const SpotDeleteButton = ({ spotId }) => (
  <DeleteButton thisId={spotId} deleteThunk={deleteSpot} config={{  buttonName: 'Delete Spot', newRoute: '/spots' }} />
)

// export const ReviewDeleteButton = ({ reviewId, spotId }) => (
//   <DeleteButton thisId={reviewId} deleteThunk={deleteReview} config={{  buttonName: 'Delete Review', newRoute: `/spots/${spotId}`}} />
// )
