import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login }  from '../actions/userAction'
import styles from './SigninScreen.module.css';
import Flash from '../components/Flash';
import {USER_LOGIN_FAIL} from "../constants/userConstant";



function SigninScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState(false);

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    console.log("error",error)

  useEffect(() => {
    if(Object.keys(userInfo).length!==0){
        navigate('/')
    }

    if(error){
      setVisibility(true)
      setMessage(error)
      setType("red")
      dispatch({type:USER_LOGIN_FAIL, payload:null})
      
    }
}, [userInfo, error])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password))
  }


  return (
  <div className={styles.formContainer}>
    <div className={styles.formWraper}>
    <form method='POST' onSubmit={submitHandler}>
      <div className={styles.in1}>
      <h1>Username</h1>
      <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username'></input>
      </div>
      <div className={styles.in2}>
        <h1>Password</h1>
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
      </div>
      <input type="submit" value={loading ? "loading" : "Signin"} disabled={loading ? true : false} className={styles.btn}></input>

    </form>
    <Flash visibility={visibility} setVisibility={setVisibility} type={type} message={message}/>
    
    </div>
  </div>  
  )
}

export default SigninScreen


/*
 <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>

            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>

            </Form.Group>
            <Button type='submit' variant='primary'>Sign In</Button>
*/ 