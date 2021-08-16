import React, {useState} from 'react'
import styles from '../Styles/Login.module.css';
import useMain from '../context/main-context';
import types from '../context/reducers/types';
import { useHistory } from 'react-router'; 

function Login() {
    const [login,setLogin] = useState();
    const {Api,globalState,dispatchGlobalState} = useMain();
    const History = useHistory();
    
    const handleChange =(e)=>{
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await Api.post("/api/login",login)
        console.log(response)
        if(response.status==200){
            let token = response.responseData.data.token;
            document.cookie = `jwtToken=${token}; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/`;
            dispatchGlobalState({key: types.AUTHENTICATED, payload:{token:'default', isAuth:true, user:response.responseData.data.user}});
        }
    }
    if(globalState.isAuth){
        History.push('/')
    }
    return (
        <form className={styles['Login-Container']} onSubmit={handleSubmit}>
                <h1 className={styles['Login-Header']}>Sign In</h1>
                <div className={styles['Login-Form-Container']}>
                    <input className={styles['Login-Input']} name='email' placeholder='email' onChange={handleChange}/>
                    <input className={styles['Login-Input']} name='password' placeholder='password' onChange={handleChange}/>
                    <button type="submit" className={styles['Login-Button']}>Login</button>
                </div>
        </form>
    )
}

export default Login