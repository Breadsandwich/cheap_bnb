import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './index'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className='navButton' onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
