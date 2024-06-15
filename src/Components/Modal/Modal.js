import ReactDom from 'react-dom'

import './Modal.css'

const Modal = ({probs,play}) => {
    console.log(probs);
  return ReactDom.createPortal(
    <>
    <div className='modal-container'>
       <div className="PlayBtn">
        <button onClick={play}>Play Now</button>
       </div>
    </div>
    </>
,document.getElementById('Modal')
  )
}

export default Modal
