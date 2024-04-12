import { motion } from "framer-motion-3d";
import { useState } from "react";
import { degToRad } from "three/src/math/MathUtils";

export function LuckyBox(props: {
  fetchResult: Promise<string | number>;
  position: [number, number, number];
  initRotation: [number, number, number];
}) {
  const [inProgress, setInProgress] = useState(false);
  const [result, setResult] = useState<string | number | null>(null);

  return (
    <motion.mesh
      position={props.position}
      rotation={props.initRotation}
      onTap={(evt, info) => {
        console.log("tap", evt, info);
        setInProgress(true);
        props.fetchResult.then((res) => {
          setResult(res);
          setInProgress(false);
          console.log("result", res);
        });
      }}
      variants={{
        hidden: { opacity: 0, scale: 0 },
        show: { opacity: 1, scale: 1 },
        dance: {
          scale: 1.5,
          rotateX: [degToRad(0), degToRad(90), degToRad(180), degToRad(270)],
          transition: {
            duration: 1,
            repeat: Infinity,
            // staggerChildren: 10,
            repeatType: "reverse",
          },
        },
      }}
      animate={inProgress ? "dance" : "show"}
      // initial="dance"
      initial={false}
      exit="hidden"
    ></motion.mesh>
  );
}
export default LuckyBox;
