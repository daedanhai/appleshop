import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import{ Nav } from 'react-bootstrap'
import { Context1 } from './../App.js';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './../store.js';

// class Detail2 extends React.Component{
//     componentDidMount(){}
//     componentDidUpdate(){}
//     componentWillUnmount(){}
// }

const Detail = (props) => {
    let [count, setCount] = useState(0);
    let [alert2s, setAlert] = useState(true);
    let [num, setNum] = useState(0);
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');

    let { 재고 } = useContext(Context1);

    let dispatch = useDispatch();
   
    useEffect(()=>{
      let endTimer = setTimeout(()=>{ setFade2('end') },100);
      return () => {
        setFade2('');
        clearTimeout(endTimer);
      }
    },[]);
  
    const { id } = useParams();
    const findItem = props.shoes.find( el => el.id == id );

    useEffect(()=>{
      let getItem = localStorage.getItem('watched');
      getItem = JSON.parse(getItem);
      getItem.push(findItem.id);
      getItem = new Set(getItem);
      getItem = Array.from(getItem);
      localStorage.setItem('watched',JSON.stringify(getItem));
    },[])

    //누가 Detail 페이지 접속하면
    // 그 페이지에 보이는 상품 id 가 가져와서
    // localstorage에 watched 항목에
    // 만약 상품ID가 중복되면 추가하지 마라.


    useEffect(()=>{
        setTimeout(()=>{
            setAlert(false)
        },2000)
        return () => {
        //useEffect가 실행되기 전에 실행됨
        //cleanup function
        //ex - Timer
        }
    },[])

    useEffect(()=>{
        if(isNaN(num) == true){
            alert('그러지마용');
        }
    },[num]);

    return(
      <div className={`container start ${fade2}`}>
        <input onChange={(e)=>{setNum(e.target.value)}}/>
        {
            alert2s === true && <div className="alert alert-warning">2초이내 구매시 할인</div>
        }
        <p>{count}</p>
        <button onClick={()=>{setCount(count++)}}>추가</button>
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+ ( findItem.id + 1 )+".jpg"} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{ findItem.title }</h4>
            <p>{ findItem.content }</p>
            <p>{ findItem.price }</p>
            <button className="btn btn-danger"
              onClick={()=>{
                dispatch(addItem( {id : findItem.id , name : findItem.title , count : 1} ));
              }}
            >주문하기</button> 
          
          </div>
          <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>버튼2</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tabcon tab={tab}/>
        </div>
      </div> 
    )
}

const Tabcon = ({tab}) => {

  let [fade, setFade] = useState('');
  let { 재고 } = useContext(Context1);

  useEffect(()=>{
    let endTimer = setTimeout(()=>{setFade('end');},100);
    return () => {
      setFade('');
      clearTimeout(endTimer);
    }
  },[tab]);

  return (
  <div className={`start ${fade}`}>
    { [<div>{재고[0]}</div>,<div>{재고[1]}</div>,<div>{재고[2]}</div>][tab] }
  </div>
  )
}

export default Detail;