import {createContext,useState,useEffect,useContext,useReducer} from 'react';
import {auth_reducer,auth_Initialstate} from './reducers/reducer';
import types from './reducers/types';
import getCookie from '../Helpers/cookie';
import ApiRequest from '../Helpers/ApiRequest';
import {dictionaryList} from '../configs/language/languages';
const cookie = getCookie('jwtToken');

const AuthContext = createContext();

export const Provider  = ({children})=>{
    const [globalState,dispatchGlobalState] = useReducer(auth_reducer,auth_Initialstate);
    const currentLanguage = localStorage.getItem('cruise-language') ?? 'gr';
    const [language,setLanguage] = useState({
        userLanguage: currentLanguage,
        dictionary: dictionaryList[currentLanguage]
    })
    const [token, setToken] = useState(cookie);
    const [Api, setApi] = useState(new ApiRequest);

    useEffect(() => {
        if(token){
            authApiRequest(dispatchGlobalState,Api)
        }else{
            dispatchGlobalState({key:types.LOADING})
        }

    }, [])
    if(globalState.isLoading) return <div>Loading...</div>
    return(
        <AuthContext.Provider value={{globalState,dispatchGlobalState,language,setLanguage,Api}}>
            {children}
        </AuthContext.Provider>
    )

}

export default function useMain (){
    const { globalState,dispatchGlobalState,language,setLanguage,Api} = useContext(AuthContext);
    return { globalState,dispatchGlobalState,language,setLanguage,Api};
}

async function authApiRequest(dispatchGlobalState,Api){
    const Response = await Api.get('/api/auth');
    if(Response.error || Response.status !== 200){
        dispatchGlobalState({key:types.NOTAUTHENTICATED})
    }else{
        dispatchGlobalState({key:types.AUTHENTICATED, payload:{token:'default', isAuth:true, user:Response.responseData.data.user}})
    }
}
