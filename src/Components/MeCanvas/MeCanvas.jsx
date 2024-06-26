import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as THREE from 'three'

import Interior from "../Interior/Interior";
import Panorama from "../Panorama/Panorama";
import InteractiveMesh from "../InteractiveMesh/InteractiveMesh";
import CircleHotspot from "../CircleHotspot/CircleHotspot";
import MeCamera from "./MeCamera/MeCamera";

import s from './MeCanvas.module.scss';
import Computers from "../Computers/Computers";

export default function MeCanvas() {
    const [modelRef, setModelRef] = useState(null);
    const cursorState = useSelector((state) => state.stateCursor.isCursorHover);
    const hotspotsState = useSelector((state) => state.stateHotspots);
    const [texture, setTexture] = useState(null);

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        const loadTexture = async () => {
            const texturePromises = hotspotsState.hotspots.map(async (item) => {
                const texture = await textureLoader.loadAsync(`panorams/${item.id}.jpg`);
                return {
                    texture,
                    id: item.id
                };
            });

            const loadedTextures = await Promise.all(texturePromises);
            setTexture(loadedTextures);
        };

        loadTexture();
    }, [hotspotsState.hotspots]);
    return (
        <Canvas
            dpr={window.devicePixelRatio}
            gl={{ preserveDrawingBuffer: true }}
            camera={{ fov: 90, near: 0.1, far: 1000 }}
            className={cursorState ? s.onHover : s.unHover}
        >
            <ambientLight intensity={2} />
            <MeCamera />
            <InteractiveMesh intersect={modelRef?.current?.children} />
            <Interior setModelRef={setModelRef} />
            <Panorama panoram={texture} />
            {
                hotspotsState.hotspots?.map((hotspot, index) => {
                    if (hotspot.hideIs.includes(hotspotsState.current.id)) {
                        return
                    }
                    return <CircleHotspot key={index} hotspot={hotspot} />
                })
            }
            {
                hotspotsState.current.computers?.map((computer, index) => {
                    return <Computers key={index} computer={computer} />
                })
            }

        </Canvas>
    );
}
