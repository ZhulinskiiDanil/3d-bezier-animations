import styles from './main.module.css'
import { Canvas } from "@react-three/fiber";

// Models
import BombModel from "./BombModel";

interface I3dBombProps {
  fill?: boolean
}

export default function Bomb3d({ fill }: I3dBombProps) {
  return <div className={[
    styles.canvas,
    String(fill ? styles.fill : "")
  ].join(" ")}>
    <Canvas
        camera={{
          fov: 90,
          position: [0, 0, 3],
        }}
      >
      <mesh position={[0, 0, -2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 3]} intensity={0.8} />
        <BombModel position={[0, 0, -2]} rotation={[Math.PI * 2, 0, 0]} />
      </mesh>
    </Canvas>
  </div>
}