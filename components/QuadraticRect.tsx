"use client";

import { LayoutCamera, motion } from "framer-motion-3d";
import { MotionConfig, useAnimationControls } from "framer-motion";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, MeshProps, useFrame, useThree } from "@react-three/fiber";
import useMeasure from "react-use-measure";
import { degToRad } from "three/src/math/MathUtils.js";
import { OrbitControls } from "@react-three/drei";
import { BoxGeometry, Matrix4 } from "three";

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

export function QuadraticRectScene() {
  // const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  // const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);
  return (
    <MotionConfig transition={transition}>
      <Suspense fallback={null}>
        <QCanvas />
      </Suspense>
    </MotionConfig>
  );
}

const MAX_H = 15;
function QuadraticRect(props: { companies: string[]; n: number }) {
  const { n, companies } = props;

  const meshRefs = useRef<MeshProps[][]>([]);
  const MeshQuad = useMemo(() => {
    const meshes = [];
    const gapX = 7.5;
    const gapY = 1;
    for (let x = 0; x < companies.length; x++) {
      meshRefs.current[x] = [];
      for (let y = 0; y < n; y++) {
        meshes.push(
          <motion.mesh
            key={`${x}-${y}`}
            position-x={x * gapX}
            position-z={y * gapY}
            ref={(ref) => {
              if (ref) {
                meshRefs.current[x][y] = ref;
              }
            }}
          >
            <boxGeometry args={[5, 1, 1, 1, 1, 1]} />
            {/* <meshStandardMaterial color="#736fbd" /> */}
            <meshStandardMaterial color="#2c2e2c" />
          </motion.mesh>
        );
      }
    }
    return meshes;
  }, [n, companies]);

  const getHGradualIncrease = (elapsedTime: number, x: number, y: number) =>
    Math.abs(Math.sin(elapsedTime) + x * 1 + ((y * 1 * MAX_H) % MAX_H));

  const getHRandom = (elapsedTime: number, x: number, y: number) =>
    Math.abs(Math.sin(elapsedTime + Math.random() * 0.01) * MAX_H);

  function linearRamp(
    elapsedTime: number,
    min: number,
    max: number,
    isCos = false
  ) {
    // Calculate the output value using a sine wave
    const value =
      min +
      (max - min) *
        0.5 *
        (1 + (isCos ? Math.cos(elapsedTime) : Math.sin(elapsedTime)));

    return value;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRefs.current.forEach((row, x) => {
      row.forEach((mesh, y) => {
        const g = mesh.geometry as BoxGeometry;
        const p = g.parameters;
        // const height = Math.sin(time + x * 0.1 + y * 0.1) * MAX_H;
        const isCos = (x + y) % 2 !== 0;
        const height = linearRamp(time + x * 0.1 + y * 0.1, 0, MAX_H, isCos);
        mesh.geometry = new BoxGeometry(p.width, height, p.depth);
      });
    });
  });

  return <>{MeshQuad}</>;
}

function QCanvas() {
  // useFrame(({ gl, scene, camera }) => {
  //   gl.render(scene, camera);
  // }, 1);

  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      <perspectiveCamera position={[0, 0, 5]} />
      <OrbitControls enableDamping />
      <Lights />
      <group position={[-8, 0, -5]}>
        {/* <mesh
          receiveShadow
          castShadow
          rotation-x={-Math.PI / 2}
          position-z={2}
          scale={[4, 20, 0.2]}
        >
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh> */}
        <QuadraticRect companies={["a", "b", "c", "d"]} n={2} />
        {/* <mesh
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
        </mesh> */}
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
