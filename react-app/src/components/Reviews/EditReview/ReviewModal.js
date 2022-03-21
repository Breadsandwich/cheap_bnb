import { Modal } from '../../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import match from '../../components/utils'
import EditReviewForm from './EditReviewForm';



function ReviewFormModal({singleReview}) {
    const [ showModal, setShowModal ] = useState(false);

    // const sessionId = useSelector(state => state?.session?.user?.id)
    // const userId = spot.user_id
    // console.log('##############', )

    // const matchingToSessionUser = match(sessionId, userId)

    return (
        // matchingToSessionUser &&(
            <div className='edit-spot-modal-button-container'>
                <button className='edit-spot-modal' onClick={e => setShowModal(true)}>Edit</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditReviewForm singleReview={singleReview}  closeModal={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
        // )
    );
}

export default ReviewFormModal;
