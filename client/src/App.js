import React ,{Suspense, useEffect, useState} from 'react'
import {BrowserRouter,Switch,Route,Redirect, useHistory} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import useMain from './Components/context/main-context';
import Homepage from './Components/Pages/Homepage';
import Header from './Components/Sub-Components/Header';
import Footer from './Components/Sub-Components/Footer';
import MyCalendar from './Components/Pages/MyCalendar';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import SideNavBar from './Components/Sub-Components/SideNavBar';
import CreateClass from './Components/Pages/CreateClass';
import Class from './Components/Pages/Class';

function App() {
  const {globalState} = useMain();

  return (
    <div className='App-Container'>
    <BrowserRouter>
      {globalState.isAuth?<Header/>:null}
      <div style={{width:'80%',height:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        {globalState.isAuth?<SideNavBar />:null}
        <Switch>
          <Route exact path='/' render={()=><div style={{width:'90%'}}>{globalState.isAuth?<Homepage />:<Redirect to='/login'/>}</div>}/>
          <Route exact path='/calendar' render={()=><div style={{width:'90%'}}>{globalState.isAuth?<MyCalendar/>:<Redirect to='/login'/>}</div>} />
          <Route exact path='/login' render={()=><div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>{globalState.isAuth?<Redirect to='/'/>:<Login/>}</div>} />
          <Route exact path='/register' render={()=><div style={{width:'90%'}}>{globalState.isAuth && globalState.user.role.roleType=='admin'?<Register/>:<Redirect to='/login'/>}</div>} />       
          <Route exact path='/createclass' render={()=><div style={{width:'90%'}}>{globalState.isAuth && globalState.user.role.roleType!='student'?<CreateClass/>:<Redirect to='/login'/>}</div>} />
          <Route exact path='/class/:id' render={()=><div style={{width:'90%'}}>{globalState.isAuth?<Class/>:<Redirect to='/login'/>}</div>} />
        </Switch>
      </div>
      {globalState.isAuth?<Footer/>:null}
    </BrowserRouter>
    </div>
  );
}

export default App;
