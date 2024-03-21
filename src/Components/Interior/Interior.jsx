import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

Interior.propTypes = {
    setModelRef: PropTypes.func,
}

export default function Interior({ setModelRef }) {
    const modelRef = useRef();
    const { nodes, materials } = useGLTF('/model/apartment/ofice.gltf');
    const hotspotsStateCurrent = useSelector((state) => state.stateHotspots.current);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        modelRef && setModelRef(modelRef)
    }, [setModelRef])

    useEffect(() => {
        if (materials['My_UV-texture_UVMAT']) {
            const material = materials['My_UV-texture_UVMAT'];
            material.transparent = true;
            material.opacity = 1;
            material.needsUpdate = true;
            material.emissiveIntensity = 0.5
        }
    }, [materials]);

    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 800)
    }, [hotspotsStateCurrent])

    return (
        <group ref={modelRef}>
            <mesh geometry={nodes.Plane4.geometry} visible={isVisible}>
                <primitive object={materials['My_UV-texture_UVMAT']} attach="material" />
            </mesh>
        </group>
    )
}

useGLTF.preload('/model/apartment/ofice.gltf') 