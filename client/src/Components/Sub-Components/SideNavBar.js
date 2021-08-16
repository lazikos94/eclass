import React, {useState} from 'react'
import styles from '../Styles/SideNavBar.module.css'
import hamburger from '../Assets/Images/hamburger.png'
import calendar from '../Assets/Images/calendar.png'
import myclasses from '../Assets/Images/myclasses.png'
import badges from '../Assets/Images/badges.png'
import { useHistory } from "react-router-dom";
const images = {
    calendar,
    myclasses,
    badges
}


const MenuItem = ({menuitem,navOpen,history}) =>{
    return(
        <li className={styles['Side-Li']} onClick={()=>history.push(menuitem.url)}>
            {
                navOpen?
                    <button className={styles['Side-Images']} >
                        <img style={{width:'50px',height:'50px',verticalAlign:'middle'}} src={images[menuitem.icon]} alt={menuitem.name} />
                    </button>
                :   
                    <button className={styles['Side-Images-2']}>
                        <img style={{width:'50px',height:'50px',verticalAlign:'middle'}} src={images[menuitem.icon]} alt={menuitem.name} />
                        <h4 style={{marginLeft:'10px',color:'#9B4A85'}}>{menuitem.label}</h4>
                    </button>
                        
                  
            }
        </li>
    )
}

function SideNavBar() {
    const [navOpen,setNavOpen]=useState(true)
    const History = useHistory()
    const menu1 = [
        {label:'My Classes',url:'/',name:'MyClasses',icon:'myclasses'},
        {label:'Calendar',url:'/calendar',name:'Calendar',icon:'calendar'},
        {label:'Badges',url:'/',name:'Badges',icon:'badges'}
    ]
    
    return (
        <div className={styles['Side-Container']}>
            <button className={navOpen?styles['Side-Images-Ham']:styles['Side-Images-Closed']} onClick={()=>setNavOpen(!navOpen)} ><img style={{width:'40px',height:'40px'}}src={hamburger} alt="Hamburger" /></button>
            <ul className={navOpen?styles['Side-Open']:styles['Side-Closed']}>
                {menu1.map((menuitem,key)=><MenuItem menuitem={menuitem} key={key} history={History} navOpen={navOpen}/>)}
            </ul>
        </div>
    )
}

export default SideNavBar
