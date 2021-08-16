import React,{useState,useEffect} from 'react';
import styles from '../Styles/CreateClass.module.css';
import useMain from '../context/main-context';
import Multiselect from 'multiselect-react-dropdown';

function CreateClass() {

    const {Api,globalState} = useMain();
    const [createClass,setCreateClass] = useState();
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectTeachers,setSelectedTeachers] = useState([]);
    const [selectStudents,setSelectedStudents] = useState([]);

    useEffect(()=>{
        async function getUsers(){
            const results = await Api.get('/api/users');
            console.log(results)
            let temp_arr1=[];
            let temp_arr2=[];
            results.responseData.data.users.forEach((user)=>{
                if(user.role.roleType=='teacher'){
                    temp_arr1.push(user)
                }else if(user.role.roleType=='student'){
                    temp_arr2.push(user)
                }
            })
            console.log(temp_arr1,temp_arr2)
            setStudents(temp_arr2);
            setTeachers(temp_arr1);
        }
        getUsers();
    },[])
    const handleChange=(e)=>{
        setCreateClass({...createClass,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const results = await Api.post('/api/createclass',{name:createClass.name,students:selectStudents,teachers:selectTeachers});
    }
    const selectedTeachers = (selectedList,selectedItem) =>{
        setSelectedTeachers(selectedList)
    }
    const selectedStudents = (selectedList,selectedItem) =>{
        setSelectedStudents(selectedList)
    }
    const removedTeachers = (selectedList,removedItem) =>{
        setSelectedTeachers(selectedList)
    }
    const removedStudents = (selectedList,removedItem) =>{
        setSelectedStudents(selectedList)
    }
    return (
        <div div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <form className={styles['Class-Container']} onSubmit={handleSubmit}>
                <h1 className={styles["Class-Header"]}>Create Class</h1>
                <div className={styles["Class-Form-Container"]}>
                    <div className={styles["Class-Input-Container"]}>
                        <div className={styles["Class-Label-Input-Container"]}>
                            <label className={styles["Class-Label"]}>Name</label>
                            <input className={styles["Class-Input"]} name='name' placeholder='name' onChange={handleChange}/>
                        </div>
                        <div className={styles["Class-Label-Input-Container"]}>
                            <label className={styles["Class-Label"]}>Teacher/Teachers</label>
                            {teachers.length!=0?
                            <Multiselect
                                options={teachers} // Options to display in the dropdown
                                onSelect={selectedTeachers} // Function will trigger on select event
                                onRemove={removedTeachers} // Function will trigger on remove event
                                displayValue="email" // Property name to display in the dropdown options
                            />:null}                          
                        </div>
                        <div className={styles["Class-Label-Input-Container"]}>
                            <label className={styles["Class-Label"]}>Students</label>
                            {students.length!=0?
                            <Multiselect
                                options={students} // Options to display in the dropdown
                                onSelect={selectedStudents} // Function will trigger on select event
                                onRemove={removedStudents} // Function will trigger on remove event
                                displayValue="email" // Property name to display in the dropdown options
                            />:null}   
                        </div>
                    </div>
                    <button type="submit" className={styles['Class-Button']}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default CreateClass;
