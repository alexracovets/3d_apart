import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as THREE from 'three'

import Interior from "../Interior/Interior";
import Panorama from "../Panorama/Panorama";
import InteractiveMesh from "../InteractiveMesh/InteractiveMesh";
import CircleHotspot from "../CircleHotspot/CircleHotspot";

import s from './MeCanvas.module.scss';
import MeCamera from "./MeCamera/MeCamera";

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
            className={cursorState ? s.onHover : s.unHover}
        >
            <ambientLight intensity={2} />
            <MeCamera />
            {modelRef && <InteractiveMesh intersect={modelRef.current.children} />}
            <Interior setModelRef={setModelRef} />
            {
                hotspotsState.hotspots?.map((hotspot, index) => {
                    if (hotspot.hideIs.includes(hotspotsState.current.id)) {
                        return
                    }
                    return <CircleHotspot key={index} hotspot={hotspot} />
                })
            }
            {texture && <Panorama panoram={texture} />}
            {/* <CircleHotspot position={[positionTest.x, positionTest.y, positionTest.z]} /> */}
        </Canvas>
    );
}
