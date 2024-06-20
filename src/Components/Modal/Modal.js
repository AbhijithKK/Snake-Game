import ReactDom from 'react-dom'

import './Modal.css'

const Modal = ({probs}) => {
  return ReactDom.createPortal(
    <>
    <div className='modal-container'>
       {probs}
    </div>
    </>
,document.getElementById('Modal')
  )
}

export default Modal
