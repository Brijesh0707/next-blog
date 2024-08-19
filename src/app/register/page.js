import LoginForm from '@/components/forms/LoginForm'
import style from './register.module.css'
const Register = () => {
  return (
    <section className={style.login_wrapper}>
    <div className={style.login_container}>
    <h1>Register</h1>
    <br/>
      <LoginForm page={"register"}/>
    </div>

    </section>
  )
}

export default Register