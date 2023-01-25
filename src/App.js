import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar,Container,Nav } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import Detail from './pages/Detail.js';
import Cart from './pages/Cart.js';

import axios from 'axios';

export let Context1 = createContext();

function App() {
  useEffect(()=>{
    if(localStorage.length === 0){
      localStorage.length !== 0 && localStorage.setItem('watched',JSON.stringify([]))
    }
  },[])

  let [ shoes, setShoes] = useState(data);
  let [ 재고 ] = useState([10,11,12]);

  let [ more, setMore ] = useState(0);

  const navigate = useNavigate();

  function clickMore(){
    const get1 = 'https://codingapple1.github.io/shop/data2.json';
    const get2 = 'https://codingapple1.github.io/shop/data3.json';
    setMore(more+1);
    console.log(more);
    axios.get(more === 0 ? get1 : get2)
    .then((res) => {
      let copy = [...shoes,...res.data];
      setShoes(copy);
    })
    .catch((err) => {console.log(err.message)})
  }
  return (
    <div className="App">
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to='/'>Navbar</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path='/' element={
          <>
          <div className='main-bg'></div>
            <div className='continer'>
              <div className='row'>
                {
                  shoes.map(x => {
                    return(
                      <Card shoes={x} key={x.id} navigate={navigate}/>
                    )
                  })
                }
              </div>
            </div>
            {
              more <= 1 ?
              <button onClick={()=>{
                clickMore();
              }}>버튼</button>
              : null
            }
            
          </>
        }/>
        <Route path='/detail/:id' element={
          <Context1.Provider value={{ 재고 }}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
        }/>
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>}></Route>
          <Route path='location' element={<div>장소임</div>}></Route>
        </Route>
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path='two' element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>

        <Route path='/cart' element={<Cart />}/>
        <Route path='*' element={<div>404 지롱</div>}/>

      </Routes>
    </div>
  );
}

const Event = () => {
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

const About = () => {
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

const Card = (props) => {
  return(
    <div className='col-md-4' onClick={()=>{props.navigate('/detail/'+ props.shoes.id)}}>
      <img src={'https://codingapple1.github.io/shop/shoes' + ( props.shoes.id+1 ) + '.jpg'} width='100%'/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  )
}

export default App;
