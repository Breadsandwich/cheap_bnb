import { Modal } from '../../../context/Modal';
import { useState } from 'react';
import EditSpot from '../EditSpot/index';
import { useSelector } from 'react-redux';
// import match from '../../components/utils'



function EditSpotModal({ spot }) {
    const [ showModal, setShowModal ] = useState(false);

    const sessionId = useSelector(state => state?.session?.user?.id)
    // const userId = spot.user_id
    // console.log('##############', )

    // const matchingToSessionUser = match(sessionId, userId)

    return (
        // matchingToSessionUser &&(
            <div className='edit-spot-modal-button-container'>
                <button className='edit-spot-modal' onClick={e => setShowModal(true)}>Edit</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditSpot closeModal={() => setShowModal(false)} spot={spot} />
                    </Modal>
                )}
            </div>
        // )
    );
}

export default EditSpotModal;
