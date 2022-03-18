import { Modal } from '../../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import match from '../../components/utils'
import SpotForm from '../SpotForm/Spot_form';



function SpotFormModal({ name='Host', edit=false, spot=null }) {
    const [ showModal, setShowModal ] = useState(false);

    // const sessionId = useSelector(state => state?.session?.user?.id)
    // const userId = spot.user_id
    // console.log('##############', )

    // const matchingToSessionUser = match(sessionId, userId)

    return (
        // matchingToSessionUser &&(
            <div className='edit-spot-modal-button-container'>
                <button className='edit-spot-modal' onClick={e => setShowModal(true)}>{name}</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SpotForm name={edit} edit={edit} spot={spot} closeModal={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
        // )
    );
}

export default SpotFormModal;
