import LoginForm from '@/components/forms/LoginForm'
import style from './login.module.css'
const Login = () => {
  return (
    <section className={style.login_wrapper}>
    <div className={style.login_container}>
    <h1>Login</h1>
    <br/>
      <LoginForm page={"login"}/>
    </div>

    </section>
  )
}

export default Login