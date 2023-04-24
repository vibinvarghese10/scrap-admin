import React, {useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import styles from './Table.module.css';
import FilterButton from './FilterButton';



function OrderTable() {
  const dispatch = useDispatch()

  const allCompletedOrderList = useSelector(state => state.orderList)
  const {orders} = allCompletedOrderList

  console.log("orders", orders)

  useEffect(() => {
    dispatch(listOrders())

  }, [])


  return (
 


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


{orders.map((order, index) => (
          <tr>
          <td>{index+1}</td>
          <td>{order.id}</td>
          <td>
          {order.sellRequest.data.map((x, index) => (
            <>{x.itemName} | </>

          ))}
          </td>
          
          <td>{order.sellRequest.requestedUser.first_name}</td>
          <td>{order.acceptedUser}</td>
          <td>{order.acceptedDate}</td>
          <td>{order.requestStatus}</td>
          <td>{order.completedUser}</td>
          <td>{order.completedDate}</td>
          <td>Rs {order.totalPrice}</td>
        </tr>

        ))}



</table>
<FilterButton />
</div>

  )
}

export default OrderTable