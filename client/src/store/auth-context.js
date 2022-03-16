import {useState, createContext} from 'react'
import Cookies from "universal-cookie"
import axios from 'axios'

const cookies = new Cookies()

const AuthContext = createContext({
    user:{},
    isAuth:false,
    token:null,
    authenticate:()=>{},
    logout:()=>{},
    connectUser:()=>{}
})

export function AuthContextProvider(props){

    const [token, setToken] = useState(cookies.get('token'))
    const [user, setUser] = useState(cookies.get('user'))

    const isAuth = token

    function connectUser(client){
        if(isAuth){
            client.connectUser({
              id:user.userId,
              username: user.username,
              fullName: user.fullName,
              userId: user.userId,
              image: user.avatarURL,
              hashedPassword: user.hashedPassword,
            }, token)
        }
    }

    async function authenticate({formData, isRegister}){
        const URL = 'http://localhost:5000/auth'

        try {
            const {data} = await axios.post(`${URL}/${isRegister?'register':'login'}`, {
                ...formData
            })
    
            setToken(data.token)
            cookies.set('token', data.token)
    
            delete data['token']
            setUser(data)
            cookies.set('user',JSON.stringify(data))
        } catch (error) {
            return Error('Invalid login credentials')
        }
    }

    function logout(){
        cookies.remove('token')
        cookies.remove('user')
    }

    return <AuthContext.Provider value={{
        user,
        isAuth,
        token:null,
        authenticate,
        logout,
        connectUser
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext