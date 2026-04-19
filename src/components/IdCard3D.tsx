import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type React from "react";
import { Canvas, extend, useFrame, useThree, type Object3DNode } from "@react-three/fiber";
import kImg from "../assets/k.jpg";
import { Environment, Lightformer, PerspectiveCamera, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
  type RigidBodyProps,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

const GLTF_PATH = "/assets/kartu.glb";
const TEXTURE_PATH = "/assets/bandd.png";

useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);

type IdCard3DProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function IdCard3D({ className, style }: IdCard3DProps) {
  const [rapierReady, setRapierReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    import("@dimforge/rapier3d-compat")
      .then((rapier) => rapier.init())
      .then(() => {
        if (mounted) setRapierReady(true);
      })
      .catch((error) => {
        console.error("Failed to initialize Rapier:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={className} style={{ touchAction: "none", ...style }}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", display: "block", minHeight: 320 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0.45, 0.35, 13.6]} fov={32} near={0.1} far={200} />
          <ambientLight intensity={Math.PI} />
          {rapierReady && (
            <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
              <Band />
            </Physics>
          )}
          <Environment background={false} blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  // ✅ Fix: type as Partial<RigidBodyProps> so `colliders: false` is accepted correctly
  const segmentProps: Partial<RigidBodyProps> = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(GLTF_PATH) as unknown as {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.MeshStandardMaterial & { map?: THREE.Texture }>;
  };
  const texture = useTexture(TEXTURE_PATH);
  const photoTexture = useTexture(kImg);
  const textCanvas = useRef<HTMLCanvasElement | null>(null);
  const textTexture = useRef<THREE.CanvasTexture | null>(null);
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (dragged) {
      document.body.style.cursor = "grabbing";
    } else if (hovered) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const mat = band.current?.material as MeshLineMaterial | undefined;
    if (mat) mat.resolution.set(width, height);

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current &&
      band.current
    ) {
      const j1Body = j1.current;
      const j2Body = j2.current;

      if (!(j1Body as unknown as { lerped?: THREE.Vector3 }).lerped) {
        (j1Body as unknown as { lerped: THREE.Vector3 }).lerped = new THREE.Vector3().copy(
          j1Body.translation(),
        );
      }
      if (!(j2Body as unknown as { lerped?: THREE.Vector3 }).lerped) {
        (j2Body as unknown as { lerped: THREE.Vector3 }).lerped = new THREE.Vector3().copy(
          j2Body.translation(),
        );
      }

      const j1Lerped = (j1Body as unknown as { lerped: THREE.Vector3 }).lerped;
      const j2Lerped = (j2Body as unknown as { lerped: THREE.Vector3 }).lerped;

      [j1Body, j2Body].forEach((ref) => {
        const lerped = (ref as unknown as { lerped: THREE.Vector3 }).lerped;
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, lerped.distanceTo(ref.translation())),
        );
        lerped.lerp(
          ref.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2Lerped);
      curve.points[2].copy(j1Lerped);
      curve.points[3].copy(fixed.current.translation());

      const geom = band.current.geometry as MeshLineGeometry;
      geom.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  photoTexture.colorSpace = THREE.SRGBColorSpace;

  if (!textCanvas.current) {
    textCanvas.current = document.createElement("canvas");
    textCanvas.current.width = 1024;
    textCanvas.current.height = 512;
  }

  if (!textTexture.current) {
    textTexture.current = new THREE.CanvasTexture(textCanvas.current);
    textTexture.current.colorSpace = THREE.SRGBColorSpace;
    textTexture.current.needsUpdate = true;
  }

  useEffect(() => {
    const canvas = textCanvas.current;
    const texture = textTexture.current;
    if (!canvas || !texture) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";

    ctx.fillStyle = "#18233d";
    ctx.font = "900 88px 'Bebas Neue', sans-serif";
    ctx.fillText("KRITIKA GURUNG", canvas.width / 2, 180);

    ctx.fillStyle = "#2e384a";
    ctx.font = "700 40px 'Outfit', sans-serif";
    ctx.fillText("BSC (HONS) COMPUTING", canvas.width / 2, 265);

    texture.needsUpdate = true;
  }, []);

  const cardMesh = nodes.card;

  return (
    <>
      <group position={[0.85, 4, 0]}>
        {/* Fixed anchor point */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        {/* Rope joints */}
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.11]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.11]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.11]} />
        </RigidBody>

        {/* ID Card */}
        <RigidBody
          position={[2, 0, 0]}
          rotation={[0, 0, -0.09]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1.05, 1.46, 0.015]} />
          <group
            scale={3.08}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement & { releasePointerCapture: (id: number) => void }).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement & { setPointerCapture: (id: number) => void }).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())));
            }}
          >
            <mesh geometry={cardMesh.geometry}>
              <meshPhysicalMaterial
                color="#f8f9fa"
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>

            <mesh position={[0, 0.56, 0.022]}>
              <circleGeometry args={[0.255, 64]} />
              <meshBasicMaterial color="#204788" toneMapped={false} />
            </mesh>

            <mesh position={[0, 0.56, 0.024]}>
              <circleGeometry args={[0.24, 64]} />
              <meshBasicMaterial map={photoTexture} toneMapped={false} />
            </mesh>

            <mesh position={[0, 0.10, 0.024]}>
              <planeGeometry args={[1.45, 0.5]} />
              <meshBasicMaterial map={textTexture.current!} transparent toneMapped={false} />
            </mesh>

            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* Lanyard band */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          transparent={true}
          opacity={1}
          resolution={new THREE.Vector2(width, height)}
          useMap={1}
          map={texture}
          repeat={new THREE.Vector2(-4, 1)}
          lineWidth={1.78}
        />
      </mesh>
    </>
  );
}
