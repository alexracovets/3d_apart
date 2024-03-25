import { useEffect, useState, memo, useRef, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Plane, Ring } from "@react-three/drei";
import { DoubleSide } from "three";
import gsap from "gsap";

import { setIsCursorHover } from '../../store/reducers/stateCursor';
import { setPosition } from '../../store/reducers/stateCamera';
import { setCurrent } from '../../store/reducers/stateHotspots';

const CircleHotspot = memo(({ hotspot }) => {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);
    const animParameter = useRef({ opacity: 0 }).current;

    const ringArgs = useMemo(() => [0.1, 0.17, 50, 1], []);
    const planeArgs = useMemo(() => [0.5, 0.5], []);

    const changeCameraPosition = useCallback(() => {
        dispatch(setPosition(hotspot.cameraPosition));
        dispatch(setCurrent(hotspot));
    }, [hotspot, dispatch]);

    useEffect(() => {
        const animation = gsap.to(animParameter, {
            opacity: isHover ? 1 : 0.3,
            duration: 0.3,
        });
        return () => animation.kill();
    }, [isHover, animParameter]);

    useEffect(() => {
        dispatch(setIsCursorHover(isHover));
    }, [isHover, dispatch]);

    return (
        <mesh
            position={hotspot.position}
            rotation={[Math.PI / 2, 0, 0]}
            onPointerEnter={() => setIsHover(true)}
            onPointerLeave={() => setIsHover(false)}
            onClick={changeCameraPosition}
        >
            <Ring args={ringArgs}>
                <meshBasicMaterial color="white" side={DoubleSide} opacity={animParameter.opacity} transparent />
            </Ring>
            <Plane args={planeArgs}>
                <meshNormalMaterial side={DoubleSide} visible={false} />
            </Plane>
        </mesh>
    );
});

CircleHotspot.displayName = 'CircleHotspot';
CircleHotspot.propTypes = {
    hotspot: PropTypes.object.isRequired,
};

export default CircleHotspot;
