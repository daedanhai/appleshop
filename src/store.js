import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';

let user2 = createSlice({
    name : 'user2',
    initialState:'park',
})
let stock = createSlice({
    name: 'stock',
    initialState: [10,11,12],
})
let userCart = createSlice({
    name: 'userCart',
    initialState: [],
    reducers:{
        addCount(state, action){
            let findId = state.findIndex((data)=>{return data.id === action.payload});
            state[findId].count++
        },
        minusCount(state, action){
            let findId = state.findIndex((data)=>{return data.id === action.payload});
            if(state[findId].count > 0){
                state[findId].count--
            }
        },
        addItem( state,action ){
            let findIndex = state.findIndex( data => data.id === action.payload.id );
            if(findIndex >= 0){
                state[findIndex].count += 1;
                alert('중복된 상품입니다. 장바구니에 수량이 올라갑니다. 현재 상품 수량 ' + state[findIndex].count + ' 개');
            } else {
                state.push(action.payload)
            }
        },
        removeItem( state ,action ){
            let arr = state.filter((data)=>data.id !== action.payload);
            return arr;
        },
    }
})

export let { addCount,minusCount, addItem, removeItem } = userCart.actions;

export default configureStore({
    reducer: {
        user : user.reducer,
        user2 : user2.reducer,
        stock : stock.reducer,
        userCart : userCart.reducer,
    }
})