import HomeStructureData from '../components/homepage-structured-data';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeStructureData />
      <h1>Next.js</h1>
    </div>
  )
}
