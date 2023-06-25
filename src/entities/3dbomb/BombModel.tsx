import { useRef, useEffect } from 'react';
import { useGLTF, useProgress } from '@react-three/drei'
import { getSmoothValue, IGetSmoothValueReturn } from './getSmoothValue';
import { animation } from './animation'

export default function BombModel(props: any) {
  const meshRef = useRef(null);
  const { nodes, materials }: any = useGLTF('/3dmodels/bomb/bomb.gltf')
  const { progress } = useProgress()
  const loaded = progress === 100
  const animationDependency = String(animation.id)
  
  // INIT_VALUES
  useEffect(() => {
    const mesh = meshRef.current

    if (mesh && animation) {
      animation.list.forEach(animation => {
        animation.callback(mesh, animation.fromTo[0])
      })
    }
  }, [meshRef, animationDependency])

  // INIT_ANIMATIONS
  useEffect(() => {
    const animationsList: IGetSmoothValueReturn[] = []

    const settings = animation.settings

    if (loaded && meshRef.current) {
      for (const elm of animation.list) {
        const timingFunction = elm?.timingFunction || settings.timingFunction
        const duration = elm?.duration || settings.duration
        const delay = elm?.delay || settings.delay
  
        animationsList.push(
          getSmoothValue(({ value }) => {
            elm.callback(meshRef.current, value)
          }, {
            ...elm, paused: !loaded,
            duration, delay, timingFunction
          })
        )
      }
    }

    return () => {
      animationsList.forEach(elm => {
        elm.stopCalculate()
      })
    }
  }, [loaded, animationDependency, meshRef])

  return (
    <group ref={meshRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[0, 0, 0]}>
          <group name="Root">
            <group name="Plane" position={[-1.429, -3.534, 1]} scale={0.405}>
              <mesh name="Plane_0" geometry={nodes.Plane_0.geometry} material={materials.Material} />
            </group>
            <group name="Plane001" position={[-0.296, 1.288, 2.056]} scale={0.994}>
              <mesh name="Plane001_0" geometry={nodes.Plane001_0.geometry} material={materials['Material.002']} />
            </group>
            <group name="Plane003" position={[2.226, -3.435, 0.931]} scale={0.349}>
              <mesh name="Plane003_0" geometry={nodes.Plane003_0.geometry} material={materials['Material.003']} />
            </group>
            <group name="Plane004" position={[-2.318, 0.097, 1.362]} scale={0.213}>
              <mesh name="Plane004_0" geometry={nodes.Plane004_0.geometry} material={materials['Material.010']} />
            </group>
            <group name="Plane005" position={[-2.222, 1.909, 2.127]} rotation={[-2.335, -1.547, 2.632]} scale={[0.144, 0.125, 0.125]}>
              <mesh name="Plane005_0" geometry={nodes.Plane005_0.geometry} material={materials['Material.011']} />
            </group>
            <group name="Plane010" position={[-1.297, 3.177, 1.634]} scale={0.302}>
              <mesh name="Plane010_0" geometry={nodes.Plane010_0.geometry} material={materials['Material.005']} />
            </group>
            <group name="Cylinder002" position={[1.335, 2.81, 1.501]} rotation={[1.619, 0, -0.002]} scale={[0.109, 0.109, 0.144]}>
              <mesh name="Cylinder002_0" geometry={nodes.Cylinder002_0.geometry} material={materials['Material.004']} />
            </group>
            <group name="Plane011" position={[0.509, 3.448, 1.586]} scale={0.294}>
              <mesh name="Plane011_0" geometry={nodes.Plane011_0.geometry} material={materials['Material.006']} />
            </group>
            <group name="Plane012" position={[1.33, 3.329, 1.526]} scale={0.18}>
              <mesh name="Plane012_0" geometry={nodes.Plane012_0.geometry} material={materials['Material.007']} />
            </group>
            <group name="Plane002" position={[-1.012, -0.486, 2.318]} scale={0.124}>
              <mesh name="Plane002_0" geometry={nodes.Plane002_0.geometry} material={materials['Material.012']} />
              <mesh name="Plane002_1" geometry={nodes.Plane002_1.geometry} material={materials['Material.013']} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/3dmodels/bomb/bomb.gltf')
