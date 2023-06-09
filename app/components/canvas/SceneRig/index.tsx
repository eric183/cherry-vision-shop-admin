import { useFrame, useThree } from "@react-three/fiber";
import { FC } from "react";

// const SceneRig: FC<any> = () => {
//   return useFrame((state) => {
//     state.camera.position.lerp(
//       {
//         x: 0,
//         y: -state.pointer.y / 4,
//         z: state.pointer.x / 2,
//       } as THREE.Vector3,
//       0.1
//     );
//     state.camera.lookAt(-1, 0, 0);
//   });

//   // return <></>;
// };

// export default SceneRig;

const SceneRig = (props: any) => {
  const { scene } = useThree();

  return useFrame((state) => {
    // state.camera.position.lerp(
    //   {
    //     x: 0,
    //     y: -state.pointer.y / 4,
    //     z: state.pointer.x / 2,
    //   } as THREE.Vector3,
    //   0.1
    // );
    state.camera.lookAt(0, 0.8, 0);
    // head?.position && state.camera.lookAt(head?.position);
  });

  // return <></>;
};

export { SceneRig };
