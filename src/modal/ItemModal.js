import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem, addItem, deleteItem } from '../actions/itemAction';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const categoryList = [
  {
    categoryName:"Plastic",
    categoryId:1,
  },
  {
    categoryName:"Metals",
    categoryId:2,
  },
  {
    categoryName:"Clothes",
    categoryId:3,
  },
  {
    categoryName:"Paper",
    categoryId:4,
  },
  {
    categoryName:"Electronics",
    categoryId:5,
  },
] 



function ItemModal(props) {
    const [itemId, setItemId] = useState(null)
    const [itemName, setItemName] = useState("")
    const [rate, setRate] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [category, setCategory] = useState("")

    const dispatch = useDispatch()

    React.useEffect(() => {
      if(props.actionType==="edit" || props.actionType==="add"){
        setItemId(props.item.id ? props.item.id : null)
        setItemName(props.item.itemName ? props.item.itemName : "")
        setRate(props.item.rate ? props.item.rate : "")
        setMeasurement(props.item.measurementType ? props.item.measurementType : "")
        setCategory(props.item?.category?.id ? props.item.category.id : null)
      }
    }, [props.item])


    const updateSubmitHandler = () => {
      dispatch(updateItem({"itemName":itemName, "rate":rate, "category":category, "measurementType":measurement, "itemId":itemId}))
      props.closeModal()
    }

    const addSubmitHandler = () => {
      dispatch(addItem({"itemName":itemName, "rate":rate, "category":category, "measurementType":measurement}))
      props.closeModal()
    }

    const deleteSubmitHandler = () => {
      dispatch(deleteItem(props.item.id))
      props.closeModal()
    }

  return (
    <Modal
    isOpen={props.modalIsOpen}
    //onAfterOpen={afterOpenModal}
    //onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
     {props.actionType === "delete" ? (
       <div>
       <h4>Do you want to delete this item</h4>
       <Button onClick={() => deleteSubmitHandler()} variant="danger">
        Delete
      </Button>
      </div>

     ) : (
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

      <Button onClick={() => props.actionType==="edit" ? updateSubmitHandler() : addSubmitHandler()} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
     )}
     


  </Modal>
  )
}

export default ItemModal