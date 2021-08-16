import React,{useState,useEffect} from 'react'
import styles from '../Styles/Homepage.module.css'
import useMain from '../context/main-context';
import {Link} from 'react-router-dom'
function Homepage() {
    const [classes,setClasses] = useState([]);
    const {Api,globalState} = useMain();

    useEffect(()=>{
        async function createClass(){
            const results = await Api.get('/api/getclasses');
            console.log(results);
            let temp_arr=[];
            if(results.responseData){
                temp_arr.push(results.responseData.data.classes);
                setClasses(temp_arr[0]);
            }

            
        }
        createClass();
    },[])

    return (
        <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div className={styles['Homepage-Container']}>         
            <h1 className={styles['Homepage-Header']}>E-Class</h1>         
            <div className={styles['Homepage-Modules']}>
                {classes.length!=0?classes.map((item)=>{
                    return(
                        <Link to={'/class/'+item._id}><div className={styles['Homepage-Item']} key={item}>
                            <h2 className={styles['Homepage-h2']}>{item.name}</h2>
                            <h3 className={styles['Homepage-h3']}>{item.teachers.length!=0 ?item.teachers[0].firstname+' ' +item.teachers[0].lastname:null}</h3>
                        </div></Link>
                    )
                }):null}
                         
            </div>
        </div></div>
    )
}

export default Homepage