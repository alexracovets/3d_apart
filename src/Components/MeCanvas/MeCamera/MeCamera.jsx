import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from "gsap";

export default function MeCamera() {
    const cameraState = useSelector((state) => state.stateCamera);
    const [animPosition, setAnimPosition] = useState({
        x: 2.206,
        y: 1.32,
        z: -2.276
    });

    useEffect(() => {
        const onUpdate = () => {
            setAnimPosition({
                x: animPosition.x,
                y: animPosition.y,
                z: animPosition.z
            });
        };

        const onComplete = () => {
            setAnimPosition({
                x: cameraState.position[0],
                y: cameraState.position[1],
                z: cameraState.position[2]
            });
        };

        gsap.to(animPosition, {
            x: cameraState.position[0],
            y: cameraState.position[1],
            z: cameraState.position[2],
            ease: "power2.inOut",
            duration: 1,
            onUpdate: onUpdate,
            onComplete: onComplete
        });
    }, [cameraState.position]);

    return (
        <OrbitControls
            minPolarAngle={Math.PI / 2.6}
            maxPolarAngle={Math.PI / 1.65}
            position={[animPosition.x, animPosition.y, animPosition.z]}
            target={[animPosition.x, animPosition.y, animPosition.z]}
            far={1000}
            near={0.1}
            fov={58.716}
            maxDistance={0.1}
            minDistance={-1}
            rotateSpeed={-0.3}
        />
    )
}
