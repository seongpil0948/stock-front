"use client";

import { LayoutCamera, motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useMeasure from "react-use-measure";
import { degToRad } from "three/src/math/MathUtils.js";
import { OrbitControls } from "@react-three/drei";

export const transition = {
  type: "spring",
  duration: 0.7,
  bounce: 0.2,
};
// const spring = { stiffness: 600, damping: 30 };
// const mouseToLightRotation = (v: any) => (-1 * v) / 140;
// function useSmoothTransform(
//   value: any,
//   springOptions: any,
//   transformer: any
// ): any {
//   return useSpring(useTransform(value, transformer), springOptions);
// }

export function QuadraticRect() {
  // const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  // const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);
  return (
    <MotionConfig transition={transition}>
      <Suspense fallback={null}>
        <QuadraticRectScene />
      </Suspense>
    </MotionConfig>
  );
}
function QuadraticRectScene() {
  const RectQuad = useMemo(() => {
    const n = 10;
    const gapX = 2;
    const gapY = 2;
    const rects: any[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rects.push(
          <motion.mesh
            key={i + j}
            position-x={i * gapX}
            position-y={j * gapY}
            scale={[1, 1, 1]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </motion.mesh>
        );
      }
    }
    return rects;
  }, []);

  return (
    <Canvas dpr={[1, 2]} shadows>
      <perspectiveCamera position={[0, 0, 5]} />
      <OrbitControls enableDamping />
      <Lights />
      <group position={[0, -0.9, -3]}>
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position-z={2}
          scale={[4, 20, 0.2]}
        >
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        {...RectQuad}
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position-y={1}
          scale={[4.2, 0.2, 4]}
        >
          <boxGeometry />
          <meshStandardMaterial color="#e4be00" />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position={[-1.7, 1, 3.5]}
          scale={[0.5, 4, 4]}
        >
          <boxGeometry />
          <meshStandardMaterial color="#736fbd" />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position={[0, 2.5, 3]}
          scale={[2, 0.03, 4]}
        >
          <boxGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </Canvas>
  );
}

function Lights() {
  const three = useThree();
  useFrame(() => {
    three.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[-10, -10, 10]} intensity={2} color="#ff20f0" />
      <pointLight
        position={[0, 0.5, -1]}
        distance={1}
        intensity={2}
        color="#e4be00"
      />
      <motion.directionalLight
        castShadow
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        initial={false}
        // animate={isFullscreen ? { x: 0, y: 8, z: 5 } : { x: 4, y: 3, z: 3 }}
        animate={{ x: 0, y: 8, z: 5 }}
      />
    </>
  );
}
