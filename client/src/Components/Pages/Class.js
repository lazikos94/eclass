import React,{useState,useEffect} from 'react'
import styles from '../Styles/Class.module.css';
import Announcements from '../Sub-Components/Announcements';
import useMain from '../context/main-context';
import {useParams} from 'react-router-dom';

function Class() {
    const [classInfo,setClassInfo]=useState();
    const {Api,globalState}=useMain();
    let {id}=useParams();
    useEffect(()=>{

        
        async function getClassInfo(id){
            console.log(id)
            const results = await Api.get(`/api/class/${id}`);
            console.log(results);
        }
        console.log(id)
        getClassInfo(id);
    },[])
    return (
        <div className={styles['Class-Container']}>
            <div>
                <h1>Class</h1>
                <h2>Teacher</h2>
            </div>
            <div className={styles['Classes-MyClasses']}>
                <div className={styles['Lesson']}>
                    <div className={styles['Lesson-Details']}>
                        
                    </div>
                </div>
            </div>
            <div className={styles['Class-Announcements-Container']}>
                {/* <Announcements/> */}
                <div className={styles['Students']}>

                </div>
            </div>
        </div>
    )
}

export default Class;
