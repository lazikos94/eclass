import React,{useState,useEffect} from 'react'
import styles from '../Styles/Register.module.css';
import DatePicker from "react-datepicker";
import useMain from '../context/main-context';
import "react-datepicker/dist/react-datepicker.css";
function Register() {

    const {Api,globalState} = useMain();
    const [roles,setRoles]=useState([]);
    const [register,setRegister] = useState();
    const [date,setDate] = useState(new Date());


    const handleChange = (e)=>{

        setRegister({...register,[e.target.name]:e.target.value})
        
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const results = await Api.post('/api/register',register);
        console.log(results)
    }
   
    useEffect(()=>{
        async function getRoles(){
            const roles =await Api.get('/api/getroles');
            console.log(roles)
            let temp_arr=[];
            temp_arr.push(roles.responseData.data.roles);
            setRoles(temp_arr[0])
            
        }
        getRoles();
    },[])

    return (<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>  
            <form className={styles['Register-Container']} onSubmit={handleSubmit}>
                <h1 className={styles['Register-Header']}>Register User</h1>
                <div className={styles['Register-Form-Container']}>
                    <div className={styles['Register-Input-Container']}>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>First Name</label>
                            <input className={styles['Register-Input']} name='firstname' placeholder='firstname' onChange={handleChange}/>
                        </div>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>Last Name</label>
                            <input className={styles['Register-Input']} name='lastname' placeholder='lastname' onChange={handleChange}/>
                        </div>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>Email</label>
                            <input className={styles['Register-Input']} name='email' placeholder='email' onChange={handleChange}/>
                        </div>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>Password</label>
                            <input className={styles['Register-Input']} name='password' placeholder='password' onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={styles['Register-Input-Container']}>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>Gender</label>
                            <select name='gender' id="gender" onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="NoSay">Not Say</option>
                            </select>
                        </div>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>Role</label>
                            <select name="role" id="role" onChange={handleChange}>
                                {roles.length !=0 ?
                                roles.map((role,key)=>{
                                    if(role.roleType!='admin'){
                                        return(
                                            <option value={role._id} key={role._id}>{role.name}</option>
    
                                        )
                                    }
                    
                                }):null}
                            </select>
                        </div>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>Date Of Birth</label>
                            <DatePicker selected={date} onChange={(date) => {
                                setDate(date)
                                setRegister({...register,dateOfBirth:date})
                            }} />
                        </div>
                        
                    </div>
                    <div className={styles['Register-Input-Container']}>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>City</label>
                            <input className={styles['Register-Input']} name='city' placeholder='city' onChange={handleChange}/>
                        </div>
                        <div className={styles['Register-Label-Input-Container']}>
                            <label className={styles['Register-Label']}>Address</label>
                            <input className={styles['Register-Input']} name='address' placeholder='address' onChange={handleChange}/>
                        </div>
                    </div> 
                    {
                        register && register.role && register.role =='610e97de12b21038a8270416'?<>
                        <div className={styles['Register-Input-Container']}>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Address</label>
                                <input className={styles['Register-Input']} name='studentPhoneNumber' placeholder='studentPhoneNumber' onChange={handleChange}/>
                            </div>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Address</label>
                                <input className={styles['Register-Input']} name='parentPhoneNumber' placeholder='parentPhoneNumber' onChange={handleChange}/>
                            </div>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Address</label>
                                <input className={styles['Register-Input']} name='parentFirstName' placeholder='parentFirstName' onChange={handleChange}/>
                            </div>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Address</label>
                                <input className={styles['Register-Input']} name='parentLastName' placeholder='parentLastName' onChange={handleChange}/>
                            </div>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Address</label>
                                <input className={styles['Register-Input']} name='parentEmail' placeholder='parentEmail' onChange={handleChange}/>
                            </div>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Address</label>
                                <input className={styles['Register-Input']} name='schoolClass' placeholder='schoolClass' onChange={handleChange}/>
                            </div>
                        </div>
                        <div className={styles['Register-Input-Container']}>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Student Details</label>
                                <textarea className={styles['Register-Textarea']} name='studentDetails' placeholder='studentDetails' onChange={handleChange}/>
                            </div>
                        </div></>
                        :
                        <div className={styles['Register-Input-Container']}>
                            <div className={styles['Register-Label-Input-Container']}>
                                <label className={styles['Register-Label']}>Phone Number</label>
                                <input className={styles['Register-Input']} name='teacherPhoneNumber' placeholder='teacherPhoneNumber' onChange={handleChange}/>
                            </div>
                        </div>
                    }
                    <button type="submit" className={styles['Register-Button']}>Register</button>
                </div>
            </form>
            </div>  
    )
}

export default Register