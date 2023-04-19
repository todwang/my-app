import styles from './page.module.css'
import Editor from '@/components/editor'

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Editor></Editor>        
      </div>
    </main>
  )
}
