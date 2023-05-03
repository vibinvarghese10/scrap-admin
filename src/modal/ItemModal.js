import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem, addItem, deleteItem } from '../actions/itemAction';
import styles from './ItemModal.module.css';




const customStyles = {

  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
},
  
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      borderRadius: "10px",
      borderWidth: "1px",
      backgroundColor: "#e7eae5",
      transform: 'translate(-50%, -50%)',
      flexBasis:"200px",
      maxWidth:"350px",
      borderColor:"#dddddd"
    },
  };




function ItemModal(props) {
    const [itemId, setItemId] = useState(null)
    const [itemName, setItemName] = useState("")
    const [rate, setRate] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [category, setCategory] = useState("")

    const dispatch = useDispatch()

    const {categories} = useSelector(state => state.categoryList)

    console.log("ppo", props.itemModalType)

    useEffect(() => {
      if(props.itemModalType==="Update" || props.itemModalType==="Create"){
        setItemId(props.item.id ? props.item.id : null)
        setItemName(props.item.itemName ? props.item.itemName : "")
        setRate(props.item.rate ? props.item.rate : "")
        setMeasurement(props.item.unit ? props.item.unit : "")
        setCategory(props.item?.category?.id ? props.item.category.id : "")
      }
    }, [props.itemModalType, props.item])


    const updateSubmitHandler = () => {
      dispatch(updateItem({"itemName":itemName, "rate":rate, "categoryId":category, "unit":measurement, "itemId":itemId}))
      props.setItemModalStatus(false)
      
    }

    const addSubmitHandler = () => {
      dispatch(addItem({"itemName":itemName, "rate":rate, "categoryId":category, "unit":measurement}))
     props.setItemModalStatus(false)
     props.setSelectedItem({})
    }

    const deleteSubmitHandler = () => {
      dispatch(deleteItem(props.item.id))
     props.setItemModalStatus(false)
    }

  return (
    <Modal
    isOpen={props.itemModalStatus}
    //onAfterOpen={afterOpenModal}
    //onRequestClose={props.setItemModalStatus(false)}
    style={customStyles}
    contentLabel="Example Modal"
  >
     { props.itemModalType==="Delete" ? (
       <div className={styles.dltContainer}>
       <input type={"text"}  placeholder={'type "'+props.item.itemName +'"'} value={itemName}/>
       <div className={styles.btnContainer}>
         <button className={styles.cancelBtn} onClick={() => props.itemModalType==="Create" ? addSubmitHandler() : props.itemModalType==="Update" ? updateSubmitHandler() : null}><h1>Delete</h1></button>
         <button className={styles.confirmBtn} onClick={() => (props.setItemModalStatus(false), props.setSelectedItem({}))}><h1>Cancel</h1></button>
         </div>
      </div>

     ) : (
       <form>
         <input type={"text"} onChange={(e) => setItemName(e.target.value)} placeholder='name' value={itemName}/>
         <input type={"text"} onChange={(e) => setRate(e.target.value)} placeholder='rate' value={rate}/>
         <input type={"text"} onChange={(e) => setMeasurement(e.target.value)} placeholder='unit' value={measurement}/>
         <select name="categories" onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">---------</option>
          {categories.map((category) => (
            <option value={category.id}>{category.categoryName}</option>

          ))}
  
</select>
        <div className={styles.btnContainer}>
         <button className={styles.confirmBtn} onClick={() => props.itemModalType==="Create" ? addSubmitHandler() : props.itemModalType==="Update" ? updateSubmitHandler() : null}><h1>Submit</h1></button>
         <button className={styles.cancelBtn} onClick={() => (props.setItemModalStatus(false), props.setSelectedItem({}))}><h1>Cancel</h1></button>
         </div>
       </form>

     )}
     


  </Modal>
  )
}

export default ItemModal

/*
<Form>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Item Name</Form.Label>
  <Form.Control onChange={(e) => setItemName(e.target.value)} type="text" placeholder="Name" value={itemName}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Rate</Form.Label>
  <Form.Control onChange={(e) => setRate(e.target.value)} type="text" placeholder="Rate" value={rate}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Measurement Type</Form.Label>
  <Form.Control onChange={(e) => setMeasurement(e.target.value)} type="text" placeholder="type" value={measurement}/>
</Form.Group>
<Form.Group className="mb-3">
    <Form.Label htmlFor="disabledSelect">Category</Form.Label>
    <Form.Select id="disabledSelect" value={category} onChange={(e) => setCategory(e.target.value)}>
      {props.actionType==="add" && <option>Open this select menu</option>}
      {categoryList.map((category) => (
        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>

      ))}

      
    </Form.Select>
  </Form.Group>

<Button onClick={() => props.itemModalType==="Update" ? updateSubmitHandler() : addSubmitHandler()} variant="primary" type="submit">
  Submit
</Button>
</Form>
*/