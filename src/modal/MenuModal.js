import React from 'react'
import Modal from 'react-modal';
import {Link} from 'react-router-dom'
import styles from './MenuModal.module.css';


function MenuModal(props) {
    const customStyles = {
      overlay: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },

    content: {
    width:"50%",
    top: '0',
    left: '50',
    right: '0',
    bottom: '0',
    padding:"0px",
    border:"none",
    borderRadius:"0px",
    backgroundColor: "#e7eae5",
    },
  };
  return (
    <Modal
    isOpen={props.modalOpen}
    //onAfterOpen={afterOpenModal}
    onRequestClose={() => props.setModalOpen(false)}
    style={customStyles}
    contentLabel="Example Modal"
    ariaHideApp={false}
  >
  <div className={styles.menuHeader}>
  <i className="fa fa-close fa-2x" onClick={() => props.setModalOpen(false)}></i>
  </div>
  <div className={styles.menuContainer}>
 <Link onClick={() => props.setModalOpen(false)} to={'/'} className={styles.menuItem}><h1>Dashboard</h1></Link>
        <Link onClick={() => props.setModalOpen(false)} to={'/items'} className={styles.menuItem}><h1>Items</h1></Link>
        <Link onClick={() => props.setModalOpen(false)} to={'/orders'} className={styles.menuItem}><h1>Orders</h1></Link>
        <Link onClick={() => props.setModalOpen(false)}  to={'/users'} className={styles.menuItem}><h1>Users</h1></Link>
    </div>


  </Modal>
  )
}

export default MenuModal