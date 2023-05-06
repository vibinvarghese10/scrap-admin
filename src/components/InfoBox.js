import React from 'react'
import styles from './InfoBox.module.css';

function InfoBox(props) {
  return (
    <div className={styles.boxContainer}>

      <div className={styles.boxHead}><h5>{props.head}</h5></div>
      <div className={styles.boxData}>
        <p>{props.data}</p>
      </div>
      
  </div>
  )
}

export default InfoBox