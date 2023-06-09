import {
  TransformControls,
  OrbitControls,
  FlyControls,
} from "@react-three/drei";
import { Camera, useFrame, useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Euler,
  Matrix4,
  PerspectiveCamera,
  Quaternion,
  Vector3,
  Vector4,
} from "three";
import { useSpring, animated } from "@react-spring/three";

const Controls: FC<{
  target: any;
}> = (props) => {
  const [useRoll, setUseRoll] = useState(0);

  const threeInstance = useThree();

  // const { mode, openCamerationRotation } = useControls({
  //   mode: {
  //     value: "translate",
  //     options: ["translate", "rotate", "scale"],
  //   },
  //   openCamerationRotation: false,
  //   getCamera: button(() => {
  //     console.log(threeInstance.camera);
  //   }),
  //   set: button(() => {
  //     localStorage.setItem(
  //       "threeInfo",
  //       JSON.stringify({
  //         position: threeInstance.camera.position.toArray(),
  //         quaternion: threeInstance.camera.quaternion.toArray(),
  //         matrix: threeInstance.camera.matrixWorld.elements,
  //         rotation: threeInstance.camera.rotation.toArray(),
  //         scale: threeInstance.camera.scale,
  //       })
  //     );

  //     console.log(threeInstance.camera);
  //   }),
  //   get: button((get) => {
  //     const threeInfo: string = localStorage.getItem("threeInfo")!;
  //     const camera = JSON.parse(threeInfo);

  //     threeInstance.camera.position.fromArray(camera.position);
  //     threeInstance.camera.rotation.fromArray(camera.rotation);
  //     threeInstance.camera.updateProjectionMatrix();
  //     consolePositionAndRoation();
  //   }),
  // });

  const setCameraRotation = (event: any) => {
    if (!event.ctrlKey) {
      const euler = new Euler(0, 0, 0, "YXZ");
      euler.setFromQuaternion(threeInstance.camera.quaternion);
      euler.y -= event.movementX / 500;
      euler.x -= event.movementY / 500;
      euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

      threeInstance.camera.setRotationFromEuler(euler);
      return;
    }
    const euler = new Euler(0, 0, 0, "YXZ").setFromQuaternion(
      threeInstance.camera.quaternion
    );
    euler.x = 0;
    threeInstance.camera.setRotationFromEuler(euler);
  };

  const consolePositionAndRoation = () => {
    console.log(threeInstance.camera.position, "position");
    console.log(threeInstance.camera.rotation, "rotation");
    console.log(threeInstance.camera.matrixWorld.elements, "matrixWorld");
    // localStorage.setItem(
    //   "threeInfo",
    //   JSON.stringify({
    //     position: threeInstance.camera.position.toArray(),
    //     quaternion: threeInstance.camera.quaternion.toArray(),
    //     matrix: threeInstance.camera.matrixWorld.elements,
    //     rotation: threeInstance.camera.rotation.toArray(),
    //     scale: threeInstance.camera.scale,
    //   })
    // );
  };

  useLayoutEffect(() => {
    document.body.addEventListener("mousemove", setCameraRotation, false);
    document.body.addEventListener("click", consolePositionAndRoation, false);
    return () => {
      document.body.addEventListener("click", consolePositionAndRoation, false);
      document.body.removeEventListener("mousemove", setCameraRotation, false);
    };
  }, []);
  return (
    <group>
      {/* {props.target && (
        <TransformControls
          mode={mode as any}
          object={props.target as any}
          onObjectChange={(e) => {
            console.log(e?.target.worldPosition);
            localStorage.setItem(
              "pos",
              JSON.stringify(e?.target.worldPosition)
            );
          }}
        />
      )} */}
      {/* <Rig from={-Math.PI / 2} to={Math.PI / 2.66} /> */}
      {/* <FlyControls rollSpeed={useRoll} dragToLook movementSpeed={2} />
      <OrbitControls /> */}
      {/* <DragControls /> */}
      {/* <FlyControls /> */}
      {/* <Effects /> */}
      {/* <CameraControls
        target={props.target}
        mode="translate"
        useRoll={Math.PI / 24}
      />  

      <ThirdPersonCameraControls target={props.target} /> */}
      {/* <CameraSpring
        quaternion={threeInstance.camera.quaternion}
        matrixworld={threeInstance.camera.matrixWorld}
      /> */}
      {/* <OrbitControls makeDefault /> */}
      <FlyControls
        rollSpeed={useRoll}
        dragToLook
        movementSpeed={10}
        makeDefault
      />
    </group>
  );
};

export default Controls;
