import { useGLTF } from '@react-three/drei';
import PropTypes from "prop-types";

Computers.propTypes = {
    computer: PropTypes.object,
};

export default function Computers({ computer }) {
    const { nodes, materials } = useGLTF('./model/computer/computer.glb');
    return (
        <group position={computer.position} scale={[0.002, 0.002, 0.002]} rotation={computer.rotation}>
            <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
            <mesh geometry={nodes.Mouse_MouseTop_0.geometry} material={materials.MouseTop} />
        </group>
    );
}

useGLTF.preload('./model/computer/computer.glb');