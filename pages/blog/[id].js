import { client } from '../../libs/client'
import styles from '../../styles/Home.module.scss'
export const getStaticProps = async (context) => {
  const id = context.params.id
  // idに基づいたデータ取得
  const data = await client.get({ endpoint: 'itol-blog', contentId: id })

  return {
    props: { blog: data },
  }
}
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'itol-blog' })

  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return {
    paths,
    fallback: false,
  }
}
export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className={styles.post}
      ></div>
    </main>
  )
}
