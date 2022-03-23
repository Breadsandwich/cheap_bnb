import { Modal } from '../../../context/Modal';
import { useState } from 'react';
import EditSpotForm from './EditForm';


function SpotFormModal({ name='Host', edit=false, spot }) {
    const [ showModal, setShowModal ] = useState(false);

    return (
            <div className='edit-spot-modal-button-container'>
                <button className='edit-spot-modal' onClick={e => setShowModal(true)}>{name}</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditSpotForm name={edit} edit={edit} spot={spot} closeModal={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
    );
}

export default SpotFormModal;
