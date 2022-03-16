import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './index'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className='navButton' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
