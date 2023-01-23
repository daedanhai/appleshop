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
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 1, name : 'Grey Yordan', count : 1},
    ]
})

export let { changeName, changeAge } = user.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        user2 : user2.reducer,
        stock : stock.reducer,
        userCart : userCart.reducer,
    }
})