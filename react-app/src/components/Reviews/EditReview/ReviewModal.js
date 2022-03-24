import { Modal } from '../../../context/Modal';
import { useState } from 'react';
import EditReviewForm from './EditReviewForm';



function ReviewFormModal({singleReview}) {
    const [ showModal, setShowModal ] = useState(false);


    return (
            <div className='edit-spot-modal-button-container'>
                <button className='edit-spot-modal' onClick={e => setShowModal(true)}>Edit</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditReviewForm singleReview={singleReview}  closeModal={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
    );
}

export default ReviewFormModal;
