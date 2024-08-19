import CreateBlogForm from '@/components/forms/CreateBlogForm'
import style from './createblog.module.css'

const NewBlog = () => {
  return (
    <section className={style.create_blog}>
      <h1>Create Blog</h1>
      <br/>
      <div className={style.create_wrapper}>
        <CreateBlogForm/>
      </div>
    </section>
  )
}

export default NewBlog