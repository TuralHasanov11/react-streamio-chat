import { useState, useContext } from "react"
import AuthContext from '../store/auth-context';
import RegisterImage from '../assets/signup.png'
import Video from '../assets/video.mp4'
import './Auth.css'


function Auth(){

    const authCtx = useContext(AuthContext)

    const [form, setForm] = useState({
        fullName:'',username:'',password:'',confirmPassword:'',avatarURL:''
    })

    const [isRegister, setIsRegister] = useState(true)

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }

    function submitForm(e){
        e.preventDefault()
        
        const {fullName, username, password, avatarURL, confirmPassword } = form
        
        if(isRegister && password !== confirmPassword){
            setForm({...form, password:'', confirmPassword:''})
            alert('Password confirmation is not the same as Password')
        }else{
            authCtx.authenticate({formData:{fullName, username, password, avatarURL}, isRegister})
                .then(()=>{
                    window.location.replace('')
                })
                .catch((e)=>{
                    alert(e.message)
                })
        }
        

    }

    function switchMode(){
        setIsRegister(prev => !prev)
    }

    return (
        <div style={{'zIndex':2}} className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isRegister ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={submitForm} autoComplete="off">
                        {isRegister && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input name="fullName"
                                    type='text'
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    value={form.fullName}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input name="username"
                                type='text'
                                placeholder="Username"
                                onChange={handleChange}
                                value={form.username}
                                required
                            />
                        </div>
                        {isRegister && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar</label>
                                <input name="avatarURL"
                                    type='text'
                                    placeholder="Avatar Url"
                                    onChange={handleChange}
                                    value={form.avatarURL}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input name="password"
                                type='password'
                                placeholder="Password"
                                onChange={handleChange}
                                value={form.password}
                                required
                            />
                        </div>
                        {isRegister && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Confirm Password</label>
                                <input name="confirmPassword"
                                    type='password'
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    value={form.confirmPassword}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isRegister?'Register':'Login'}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isRegister ? 'Already have an account ? ' : 'No account ? '}
                            <span onClick={switchMode}>
                                {isRegister?'Login':'Register'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_info">
                {/* <img src={RegisterImage} alt="" /> */}
            </div>
            <div className="video-container">
            <video autoPlay muted loop id="myVideo">
                <source src={Video} type="video/mp4" />
            </video>
            </div>
        </div>
    )

}

export default Auth