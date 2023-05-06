import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import styles from './Table.module.css';
import OrderTableFilter from './OrderTableFilter';
import { filterOrderList } from '../actions/orderActions';




function OrderTable() {
  const dispatch = useDispatch()

  const [orderStatus, setOrderStatus] = useState("")
  const [orderId, setOrderId] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)
  const [acceptedDate, setAcceptedDate] = useState(null)
  const [completedDate, setCompletedDate] = useState(null)


  const allCompletedOrderList = useSelector(state => state.orderList)
  const {orders} = allCompletedOrderList

  const {orders:filteredOrder, loading} = useSelector(state => state.orderFilter)



  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch])

  useEffect(() => {

      dispatch(filterOrderList(orderStatus, orderId, totalPrice, acceptedDate, completedDate))


  }, [orderStatus, dispatch, orderId, totalPrice, acceptedDate, completedDate])


  return (
 

<>
{loading && <h1>Loading...</h1>}
<OrderTableFilter setAcceptedDate={setAcceptedDate} setCompletedDate={setCompletedDate} orderStatus={orderStatus} setOrderStatus={setOrderStatus} orderId={orderId} setOrderId={setOrderId} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
<div className={styles.tableContainer}>
<table>

<tr>
<th></th>
          <th>id</th>
          <th>Items</th>
          <th>Seller</th>
          <th>Buyer</th>
          <th>Accepted date</th>
          <th>Order status</th>
          <th>Completed by</th>
          <th>Completed date</th>
          <th>Total price</th>
</tr>


{orderStatus || orderId || totalPrice || acceptedDate || completedDate ? ( filteredOrder.map((order, index) => (
          <tr>
          <td>{index+1}</td>
          <td>{order.id}</td>
          <td className={styles.itemColumn}>
          {order.sellRequest.data.length} Items
          <div className={styles.itemColumnContainer}>
          {order.sellRequest.data.map((x, index) => (
            <div>{x.itemName}</div>
          ))}
          </div>
          </td>
          
          <td>{order.sellRequest.requestedUser.first_name}</td>
          <td>{order.acceptedUser}</td>
          <td>{order.acceptedDate}</td>
          <td>{order.requestStatus}</td>
          <td>{order.completedUser}</td>
          <td>{order.completedDate?.slice(0, 10)}</td>
          <td>Rs {order.totalPrice}</td>
        </tr>

        ))) : (
          orders.map((order, index) => (
            <tr>
            <td>{index+1}</td>
            <td>{order.id}</td>
            <td className={styles.itemColumn}>
            {order.sellRequest.data.length} Items
            <div className={styles.itemColumnContainer}>
            {order.sellRequest.data.map((x, index) => (
              <div>{x.itemName}</div>
  
            ))}
            </div>
            </td>
            
            <td>{order.sellRequest.requestedUser.first_name}</td>
            <td>{order.acceptedUser}</td>
            <td>{order.acceptedDate}</td>
            <td>{order.requestStatus}</td>
            <td>{order.completedUser}</td>
            <td>{order.completedDate?.slice(0, 10)}</td>
            <td>Rs {order.totalPrice}</td>
          </tr>
  
          ))

        )}



</table>

</div>
</>

  )
}

export default OrderTable