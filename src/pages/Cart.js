import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeAge } from './../store/userSlice.js';
import { addCount, minusCount, removeItem } from './../store.js';

const Cart = () => {

    let storeState = useSelector( state => state );
    let dispatch = useDispatch();

    return(
        <>
        <div>
            <h3> { storeState.user.name } ({storeState.user.age}) 님의 장바구니 </h3>
            <button onClick={()=>{dispatch(changeAge(100))}}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    storeState.userCart.map((el,i)=>{
                        return(
                            <tr key={i}>
                                <td>{el.id}</td>
                                <td>{el.name}</td>
                                <td>{el.count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(addCount(el.id));
                                    }}>+</button>
                                    <button onClick={()=>{
                                        dispatch(minusCount(el.id));
                                    }}>-</button>
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(removeItem(el.id));
                                    }}>삭제</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    
                </tbody>
            </Table> 
        </div>
        </>
    )
}
export default Cart;