import styles from './main.module.css'

// React
import { Suspense, lazy } from 'react'

const Bomb3d = lazy(() => import('@/entities/3dbomb'))

export default function App() {
  return <div className={styles.app}>
    <div className={styles.bomb}>
      <Suspense fallback={null}>
        <Bomb3d fill />
      </Suspense>
    </div>
  </div>
}