"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { DoubleSide, Group, Mesh, SRGBColorSpace } from "three";
import type { MeshStandardMaterial } from "three";
import { useAvatarStore } from "./avatarStore";

const ESCAPE_THRESHOLD = 7; // Ajusta este valor para cambiar cuántas persecuciones activan la pausa
const FLIGHT_DURATION_MS = 4500;
const GREETING_DURATION_MS = 10000; // Duración del saludo inicial en milisegundos
const FINAL_BOTTOM_MARGIN = 25; // Ajusta este valor para bajar o subir el asistente en reposo
const CAPE_VERTICAL_OFFSET = 0.42; // Ajusta este valor para posicionar la capa más abajo o arriba
const DIALOG_TOP_MARGIN = 16;
const BASE_SIZE_PX = 224;
const MIN_SIZE_RATIO = 0.68;
const TOUCH_LONG_PRESS_MS = 240;
const TOUCH_MOVE_THRESHOLD_PX = 12;
const FLING_VELOCITY_THRESHOLD = 280;
const FLING_FRICTION = 2.4;
const FLING_RESTITUTION = 0.64;
const FLING_MIN_SPEED = 22;
const FLING_GRAVITY = 1800;
const FLING_SURFACE_DAMPING = 0.78;
const FLING_SETTLE_VELOCITY = 38;

function Hoverbot({
  tiltOffset,
  tiltTarget,
  flightPhase,
  flightProgress,
}: {
  tiltOffset: MutableRefObject<{ x: number; y: number }>;
  tiltTarget: MutableRefObject<{ x: number; y: number }>;
  flightPhase: "in" | "settling" | "idle";
  flightProgress: MutableRefObject<number>;
}) {
  const groupRef = useRef<Group>(null);
  const chestRef = useRef<Mesh>(null);
  const visorRef = useRef<Mesh>(null);
  const thrusterRef = useRef<Mesh>(null);
  const outerFlameRef = useRef<Mesh>(null);
  const innerFlameRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Group>(null);
  const rightArmRef = useRef<Group>(null);
  const capeRef = useRef<Mesh>(null);
  const capeBasePositions = useRef<Float32Array | null>(null);
  const armLift = useRef(0);
  const flightPhaseRef = useRef(flightPhase);
  useEffect(() => {
    flightPhaseRef.current = flightPhase;
  }, [flightPhase]);
  const { currentAction } = useAvatarStore();
  const logoTexture = useTexture("/textures/logo_colegio.png");
  useEffect(() => {
    if (!logoTexture) return;
    logoTexture.flipY = false;
    logoTexture.colorSpace = SRGBColorSpace;
    logoTexture.needsUpdate = true;
  }, [logoTexture]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const phase = flightPhaseRef.current;
    const isFlying = phase !== "idle";
    const flightIntensity = phase === "in" ? 1 : phase === "settling" ? 0.45 : 0;
    const targetLift = flightIntensity;
    armLift.current += (targetLift - armLift.current) * 0.18;

    tiltOffset.current.x += (tiltTarget.current.x - tiltOffset.current.x) * 0.12;
    tiltOffset.current.y += (tiltTarget.current.y - tiltOffset.current.y) * 0.12;

    if (groupRef.current) {
      const baseFloat = 0.1 + Math.sin(t * 1.2) * 0.05;
      const flightBob = isFlying ? Math.sin(t * 1.8) * 0.035 : 0;
      const forwardLean = -0.9 * armLift.current + (phase === "settling" ? -0.08 : 0);
      const forwardOffset = isFlying ? -0.1 * armLift.current : 0;
      const climbOffset = isFlying ? 0.12 * armLift.current : 0;
      groupRef.current.position.y = baseFloat + flightBob + climbOffset - tiltOffset.current.y * 0.12;
      groupRef.current.position.x = tiltOffset.current.x;
      groupRef.current.position.z = tiltOffset.current.y * 0.5 + forwardOffset;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.03 + tiltOffset.current.x * 0.18;
      groupRef.current.rotation.x = forwardLean + Math.sin(t * 0.35) * 0.02 - tiltOffset.current.y * 0.25;
      groupRef.current.rotation.z = Math.sin(t * 0.32) * 0.02 + tiltOffset.current.x * 0.18;
    }

    if (leftArmRef.current && rightArmRef.current) {
      const idleSwing = phase === "idle" ? Math.sin(t * 1.4) * 0.08 : 0;
      const reach = -1.2 * armLift.current - 0.2;
      leftArmRef.current.rotation.set(reach, 0.1 * armLift.current, -0.1 * armLift.current + idleSwing);
      rightArmRef.current.rotation.set(reach, -0.1 * armLift.current, 0.1 * armLift.current - idleSwing);
    }

    if (capeRef.current) {
      const geometry = capeRef.current.geometry;
      const position = geometry.attributes.position;
      if (!capeBasePositions.current) {
        capeBasePositions.current = new Float32Array(position.array as Float32Array);
      }
      const baseArray = capeBasePositions.current;
      const height = 1.6;
      const halfHeight = height / 2;

      for (let i = 0; i < position.count; i += 1) {
        const idx = i * 3;
        const baseX = baseArray[idx];
        const baseY = baseArray[idx + 1];
        const baseZ = baseArray[idx + 2];

        const normalizedY = (baseY + halfHeight) / height; // 0 en la parte superior, 1 en la inferior
        const taper = 0.10 + normalizedY * 1.9; // parte superior estrecha, parte inferior muy amplia
        const fold = (1 - normalizedY) * 0.15;

        const wave = Math.sin(t * 3.8 + baseX * 9 + baseY * 6) * 0.28 * (0.45 + armLift.current);
        const sweep = Math.cos(t * 2.6 + baseY * 7) * 0.18 * (0.35 + armLift.current);

        const newX = baseX * taper;
        const newY = baseY + wave * 1.0 - fold;
        const newZ = baseZ - wave * 2.3 - sweep;

        position.setXYZ(i, newX, newY, newZ);
      }
      position.needsUpdate = true;
      geometry.computeVertexNormals();
    }

    if (thrusterRef.current) {
      const boost = phase === "in" ? 0.35 : phase === "settling" ? 0.18 : 0;
      const base = 0.8 + Math.sin(t * 12) * 0.1 + boost;
      thrusterRef.current.scale.set(1, base, 1);
    }

    if (outerFlameRef.current && innerFlameRef.current) {
      const phaseBoost = phase === "in" ? 0.25 : phase === "settling" ? 0.12 : 0.04;
      const pulsateXY = 1 + phaseBoost * 0.4 + Math.sin(t * 17.5) * 0.07;
      const pulsateY = 1.2 + phaseBoost * 0.6 + Math.sin(t * 13.8) * 0.11;

      outerFlameRef.current.scale.set(pulsateXY, pulsateY, pulsateXY);
      innerFlameRef.current.scale.set(
        0.75 + phaseBoost * 0.35 + Math.sin(t * 15.6) * 0.05,
        0.85 + phaseBoost * 0.5 + Math.sin(t * 11.2) * 0.09,
        0.75 + phaseBoost * 0.35 + Math.sin(t * 15.6 + 1.2) * 0.05,
      );

      const outerMaterial = outerFlameRef.current.material as MeshStandardMaterial;
      if (!Array.isArray(outerMaterial)) {
        outerMaterial.emissiveIntensity = 1.3 + phaseBoost * 3 + Math.sin(t * 19.4) * 0.25;
        outerMaterial.opacity = Math.min(0.85, Math.max(0.45, 0.62 + Math.sin(t * 9.6) * 0.18));
      }

      const innerMaterial = innerFlameRef.current.material as MeshStandardMaterial;
      if (!Array.isArray(innerMaterial)) {
        innerMaterial.emissiveIntensity = 1.8 + phaseBoost * 3.6 + Math.sin(t * 21.2) * 0.32;
        innerMaterial.opacity = Math.min(0.95, Math.max(0.6, 0.8 + Math.sin(t * 10.1) * 0.12));
      }
    }

    if (visorRef.current) {
      const colorMap: Record<string, [number, number, number]> = {
        Talk: [0.95, 0.82, 0.14],
        Thinking: [0.53, 0.39, 1],
        Wave: [0.97, 0.32, 0.32],
      };
      const [r, g, b] = colorMap[currentAction] ?? [0.04, 0.41, 0.92];
      const material = visorRef.current.material as
        | MeshStandardMaterial
        | MeshStandardMaterial[];
      const applyColor = (mat: MeshStandardMaterial) => mat.color.setRGB(r, g, b);
      if (Array.isArray(material)) {
        material.forEach(applyColor);
      } else {
        applyColor(material);
      }
    }
  });

  return (
    <group ref={groupRef} scale={[0.85, 0.85, 0.85]}>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh ref={visorRef} position={[0, 0.95, 0.27]}>
        <cylinderGeometry args={[0.17, 0.13, 0.08, 24]} />
        <meshStandardMaterial emissiveIntensity={1.4} emissive="#2563eb" color="#2563eb" />
      </mesh>

      <mesh ref={chestRef} position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.36, 0.5, 12, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.65} roughness={0.25} />
      </mesh>

      <mesh position={[0, 0.52, 0.33]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial
          color="#2a0f0f"
          emissive="#eb2525ff"
          emissiveIntensity={0.9}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, 0.52, 0.55]}> {/* Logo del colegio bajo la luz */}
        <planeGeometry args={[0.40, 0.40]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          depthWrite={false}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={capeRef} position={[0, CAPE_VERTICAL_OFFSET, -0.32]} rotation={[Math.PI, 0, 0]}>
        <planeGeometry args={[1.2, 1.6, 32, 22]} />
        <meshStandardMaterial
          color="#b91c1c"
          emissive="#7f1d1d"
          emissiveIntensity={0.25}
          roughness={0.55}
          metalness={0.05}
          transparent
          opacity={0.94}
          side={DoubleSide}
        />
      </mesh>

      <mesh position={[0, -0.15, 0]} ref={thrusterRef}>
        <cylinderGeometry args={[0.2, 0.32, 0.4, 24]} />
        <meshStandardMaterial color="#111827" metalness={0.78} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.15, 0.23, 0.18, 24]} />
        <meshStandardMaterial
          emissive="#f97316"
          emissiveIntensity={1.6}
          color="#fb923c"
          roughness={0.25}
        />
      </mesh>
      <mesh ref={outerFlameRef} position={[0, -0.78, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.28, 0.92, 32, 1, true]} />
        <meshStandardMaterial
          color="#fb923c"
          emissive="#ea580c"
          emissiveIntensity={1.5}
          roughness={0.35}
          transparent
          opacity={0.6}
          metalness={0}
          side={DoubleSide}
        />
      </mesh>
      <mesh ref={innerFlameRef} position={[0, -0.64, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.16, 0.58, 32, 1, true]} />
        <meshStandardMaterial
          color="#fde68a"
          emissive="#facc15"
          emissiveIntensity={2}
          roughness={0.22}
          transparent
          opacity={0.85}
          metalness={0}
          side={DoubleSide}
        />
      </mesh>

      <group ref={leftArmRef} position={[-0.58, 0.55, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.12, 0.2, 24]} />
          <meshStandardMaterial color="#1e40af" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[-0.08, -0.25, 0]}>
          <capsuleGeometry args={[0.07, 0.32, 12, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.65} roughness={0.25} />
        </mesh>
        <mesh position={[-0.05, -0.52, 0]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial emissive="#facc15" emissiveIntensity={1.1} color="#facc15" />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.58, 0.55, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.12, 0.2, 24]} />
          <meshStandardMaterial color="#1e40af" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.08, -0.25, 0]}>
          <capsuleGeometry args={[0.07, 0.32, 12, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.65} roughness={0.25} />
        </mesh>
        <mesh position={[0.05, -0.52, 0]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial emissive="#facc15" emissiveIntensity={1.1} color="#facc15" />
        </mesh>
      </group>

      <pointLight position={[0, 0.7, 0.5]} intensity={0.8} distance={2} color="#38bdf8" />
      <pointLight position={[0, -0.4, 0]} intensity={1.3} distance={1.5} color="#93c5fd" />
    </group>
  );
}

export default function RobotAssistant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltOffset = useRef({ x: 0, y: 0 });
  const positionTarget = useRef({ x: 0, y: 0 });
  const positionCurrent = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: 224, height: 224 });
  const chaseCount = useRef(0);
  const isFrozen = useRef(false);
  const hasActiveChase = useRef(false);
  const hasShownGreeting = useRef(false);
  const flightProgress = useRef(0);
  const isEntering = useRef(true);
  const settleTimeoutRef = useRef<number | null>(null);
  const greetingTimeoutRef = useRef<number | null>(null);
  const [flightPhase, setFlightPhase] = useState<"in" | "settling" | "idle">("in");
  const [isConcerned, setIsConcerned] = useState(false);
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);
  const greetingDialogRef = useRef<HTMLDivElement>(null);
  const concernedDialogRef = useRef<HTMLDivElement>(null);
  const [assistantSize, setAssistantSize] = useState({ width: BASE_SIZE_PX, height: BASE_SIZE_PX });
  const [interactionMode, setInteractionMode] = useState<"mouse" | "touch">("mouse");
  const touchPointerId = useRef<number | null>(null);
  const touchStart = useRef({ x: 0, y: 0, time: 0 });
  const isTouchDragging = useRef(false);
  const longPressTimeoutRef = useRef<number | null>(null);
  const touchMoves = useRef<Array<{ x: number; y: number; time: number }>>([]);
  const flingState = useRef<{ active: boolean; vx: number; vy: number }>({ active: false, vx: 0, vy: 0 });
  const previousFrameTimeRef = useRef<number | null>(null);

  const getEdgeMargin = useCallback(() => (interactionMode === "touch" ? 16 : 48), [interactionMode]);

  const clamp = useCallback((value: number, min: number, max: number) => Math.min(Math.max(value, min), max), []);

  const beginTouchDrag = useCallback(() => {
    if (isTouchDragging.current) return;
    isTouchDragging.current = true;
    if (longPressTimeoutRef.current !== null) {
      window.clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
    flingState.current = { active: false, vx: 0, vy: 0 };
    setIsConcerned(false);
    setIsGreetingVisible(false);
    chaseCount.current = 0;
    hasActiveChase.current = false;
    isFrozen.current = true;
    tiltTarget.current = { x: 0, y: 0 };
  }, []);

  const triggerTouchDialog = useCallback(() => {
    isFrozen.current = true;
    hasActiveChase.current = false;
    positionTarget.current = { ...positionCurrent.current };
    tiltTarget.current = { x: 0, y: 0 };
    setIsConcerned(true);
  }, []);

  const updateAssistantSize = useCallback(() => {
    const vw = window.innerWidth || BASE_SIZE_PX;
    const scale = Math.min(1, Math.max(MIN_SIZE_RATIO, vw / 680));
    const size = Math.round(BASE_SIZE_PX * scale);
    setAssistantSize({ width: size, height: size });
    sizeRef.current = { width: size, height: size };
  }, []);

  useEffect(() => {
    const detectInteractionMode = () => {
      const coarse = typeof window.matchMedia === "function"
        ? window.matchMedia("(pointer: coarse)").matches
        : false;
      const hasTouch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
      setInteractionMode(coarse || hasTouch ? "touch" : "mouse");
    };

    detectInteractionMode();
    window.addEventListener("resize", detectInteractionMode);
    return () => window.removeEventListener("resize", detectInteractionMode);
  }, []);

  useEffect(() => {
    updateAssistantSize();
    window.addEventListener("resize", updateAssistantSize);
    return () => window.removeEventListener("resize", updateAssistantSize);
  }, [updateAssistantSize]);

  useEffect(() => {
    const margin = getEdgeMargin();
    const { width, height } = sizeRef.current;
    const maxX = Math.max(margin, window.innerWidth - width - margin);
    const maxY = Math.max(margin, window.innerHeight - height - margin);
    positionTarget.current.x = Math.min(Math.max(margin, positionTarget.current.x), maxX);
    positionTarget.current.y = Math.min(Math.max(margin, positionTarget.current.y), maxY);
    positionCurrent.current.x = Math.min(Math.max(margin, positionCurrent.current.x), maxX);
    positionCurrent.current.y = Math.min(Math.max(margin, positionCurrent.current.y), maxY);
    const el = containerRef.current;
    if (el) {
      el.style.transform = `translate3d(${positionCurrent.current.x}px, ${positionCurrent.current.y}px, 0)`;
    }
  }, [assistantSize, getEdgeMargin]);

  const adjustForDialogVisibility = useCallback((dialogEl: HTMLDivElement | null) => {
    if (!dialogEl || !containerRef.current) return;

    const dialogRect = dialogEl.getBoundingClientRect();
    const leftOverflow = Math.max(0, getEdgeMargin() - dialogRect.left);
    const rightOverflow = Math.max(0, dialogRect.right - (window.innerWidth - getEdgeMargin()));
    const verticalOverflow = Math.max(0, DIALOG_TOP_MARGIN - dialogRect.top);

    if (!leftOverflow && !rightOverflow && !verticalOverflow) return;

    const margin = getEdgeMargin();
    const { height } = sizeRef.current;
    const maxY = Math.max(margin, window.innerHeight - height - margin);
    const nextY = Math.min(positionCurrent.current.y + verticalOverflow, maxY);

    positionCurrent.current.y = nextY;
    positionTarget.current.y = nextY;

    positionCurrent.current.x = Math.min(
      Math.max(margin, positionCurrent.current.x + leftOverflow - rightOverflow),
      Math.max(margin, window.innerWidth - sizeRef.current.width - margin),
    );
    positionTarget.current.x = positionCurrent.current.x;

    const el = containerRef.current;
    el.style.transform = `translate3d(${positionCurrent.current.x}px, ${nextY}px, 0)`;
  }, [getEdgeMargin]);

  useEffect(() => {
    const margin = getEdgeMargin();
    const width = sizeRef.current.width;
    const height = sizeRef.current.height;
    const finalX = Math.max(margin, window.innerWidth - width - margin);
    const finalY = Math.max(margin, window.innerHeight - height - FINAL_BOTTOM_MARGIN);

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const flightPath = [
      { t: 0, x: -0.4 * screenW, y: screenH * 0.7 },
      { t: 0.25, x: screenW * 0.2, y: screenH * 0.45 },
      { t: 0.55, x: screenW * 0.65, y: screenH * 0.35 },
      { t: 0.85, x: finalX + 120, y: Math.max(margin, finalY - 40) },
      { t: 1, x: finalX, y: finalY },
    ];

    const firstPoint = flightPath[0];
    positionCurrent.current = { x: firstPoint.x, y: firstPoint.y };
    positionTarget.current = { x: firstPoint.x, y: firstPoint.y };
    tiltTarget.current = { x: 0, y: 0 };
    tiltOffset.current = { x: 0, y: 0 };

    const el = containerRef.current;
    if (el) {
      el.style.transform = `translate3d(${firstPoint.x}px, ${firstPoint.y}px, 0)`;
    }

    chaseCount.current = 0;
    hasActiveChase.current = false;
    isFrozen.current = false;
    isEntering.current = true;
    flightProgress.current = 0;
    setIsConcerned(false);
    setFlightPhase("in");
    if (settleTimeoutRef.current !== null) {
      window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const samplePath = (progress: number) => {
      let previous = flightPath[0];
      for (let i = 1; i < flightPath.length; i += 1) {
        const next = flightPath[i];
        if (progress <= next.t) {
          const span = next.t - previous.t || 1;
          const local = (progress - previous.t) / span;
          const easedLocal = local * local * (3 - 2 * local);
          return {
            x: lerp(previous.x, next.x, easedLocal),
            y: lerp(previous.y, next.y, easedLocal),
          };
        }
        previous = next;
      }
      const last = flightPath[flightPath.length - 1];
      return { x: last.x, y: last.y };
    };

    let lastPoint: { x: number; y: number } = {
      x: firstPoint.x,
      y: firstPoint.y,
    };
    const flightStart = performance.now();
    let frameId = 0;

    const step = (now: number) => {
      const elapsed = now - flightStart;
      const raw = Math.min(elapsed / FLIGHT_DURATION_MS, 1);
      flightProgress.current = raw;
      const point = samplePath(raw);

      const dx = point.x - lastPoint.x;
      const dy = point.y - lastPoint.y;
      lastPoint = point;

      tiltTarget.current.x = dx * 0.014;
      tiltTarget.current.y = -dy * 0.014;

      positionCurrent.current = { x: point.x, y: point.y };
      positionTarget.current = { x: point.x, y: point.y };

      if (el) {
        el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      }

      if (raw < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        tiltTarget.current = { x: 0, y: 0 };
        positionCurrent.current = { x: finalX, y: finalY };
        positionTarget.current = { x: finalX, y: finalY };
        if (el) {
          el.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
        }
        isEntering.current = false;
        setFlightPhase("settling");
        settleTimeoutRef.current = window.setTimeout(() => {
          setFlightPhase("idle");
          settleTimeoutRef.current = null;
        }, 900);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      if (settleTimeoutRef.current !== null) {
        window.clearTimeout(settleTimeoutRef.current);
        settleTimeoutRef.current = null;
      }
    };
  }, [getEdgeMargin]);

  useEffect(() => {
    if (flightPhase !== "idle" || hasShownGreeting.current) return;
    hasShownGreeting.current = true;
    setIsGreetingVisible(true);
    if (greetingTimeoutRef.current !== null) {
      window.clearTimeout(greetingTimeoutRef.current);
    }
    greetingTimeoutRef.current = window.setTimeout(() => {
      setIsGreetingVisible(false);
      greetingTimeoutRef.current = null;
    }, GREETING_DURATION_MS);
  }, [flightPhase]);

  useEffect(() => {
    if (!isGreetingVisible) return;
    adjustForDialogVisibility(greetingDialogRef.current);
  }, [isGreetingVisible, adjustForDialogVisibility]);

  useEffect(() => {
    if (!isConcerned) return;
    adjustForDialogVisibility(concernedDialogRef.current);
  }, [isConcerned, adjustForDialogVisibility]);

  useEffect(() => {
    if (interactionMode !== "touch") return;
    const el = containerRef.current;
    if (!el) return;

    const clearLongPressTimeout = () => {
      if (longPressTimeoutRef.current !== null) {
        window.clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = null;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      const targetNode = event.target as Node | null;
      if (
        (concernedDialogRef.current && targetNode && concernedDialogRef.current.contains(targetNode)) ||
        (greetingDialogRef.current && targetNode && greetingDialogRef.current.contains(targetNode))
      ) {
        return;
      }
      if (el?.setPointerCapture) {
        try {
          el.setPointerCapture(event.pointerId);
        } catch (error) {
          // ignore capture errors on unsupported browsers
        }
      }
      touchPointerId.current = event.pointerId;
      touchStart.current = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };
      touchMoves.current = [{ x: event.clientX, y: event.clientY, time: performance.now() }];
      flingState.current = { active: false, vx: 0, vy: 0 };
      isTouchDragging.current = false;
      clearLongPressTimeout();
      longPressTimeoutRef.current = window.setTimeout(() => {
        beginTouchDrag();
      }, TOUCH_LONG_PRESS_MS);
      event.preventDefault();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      if (touchPointerId.current !== event.pointerId) return;

      const now = performance.now();
      const elapsed = now - touchStart.current.time;
      const dx = event.clientX - touchStart.current.x;
      const dy = event.clientY - touchStart.current.y;
      const distance = Math.hypot(dx, dy);

      touchMoves.current.push({ x: event.clientX, y: event.clientY, time: now });
      touchMoves.current = touchMoves.current.filter((sample) => now - sample.time <= 200);
      if (touchMoves.current.length > 8) {
        touchMoves.current.shift();
      }

      if (!isTouchDragging.current) {
        if (distance > TOUCH_MOVE_THRESHOLD_PX || elapsed >= TOUCH_LONG_PRESS_MS) {
          beginTouchDrag();
        } else {
          event.preventDefault();
          return;
        }
      }

      const margin = getEdgeMargin();
      const { width, height } = sizeRef.current;
      const maxX = Math.max(margin, window.innerWidth - width - margin);
      const maxY = Math.max(margin, window.innerHeight - height - margin);
      const nextX = clamp(event.clientX - width / 2, margin, maxX);
      const nextY = clamp(event.clientY - height / 2, margin, maxY);

      positionCurrent.current = { x: nextX, y: nextY };
      positionTarget.current = { x: nextX, y: nextY };

      const container = containerRef.current;
      if (container) {
        container.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      }

      event.preventDefault();
    };

    const finishTouch = (event: PointerEvent, cancelled: boolean) => {
      if (event.pointerType === "mouse") return;
      if (touchPointerId.current !== event.pointerId) return;

      clearLongPressTimeout();
      const wasDragging = isTouchDragging.current;
      touchPointerId.current = null;
      isTouchDragging.current = false;
      const containerEl = containerRef.current;
      if (containerEl?.hasPointerCapture?.(event.pointerId)) {
        try {
          containerEl.releasePointerCapture(event.pointerId);
        } catch (error) {
          // ignore release errors caused by legacy implementations
        }
      }

      if (cancelled) return;

      const now = performance.now();
      touchMoves.current.push({ x: event.clientX, y: event.clientY, time: now });
      touchMoves.current = touchMoves.current.filter((sample) => now - sample.time <= 200);
      if (touchMoves.current.length > 8) {
        touchMoves.current.shift();
      }

      const margin = getEdgeMargin();
      const { width, height } = sizeRef.current;
      const maxX = Math.max(margin, window.innerWidth - width - margin);
      const maxY = Math.max(margin, window.innerHeight - height - margin);
      const releaseX = clamp(event.clientX - width / 2, margin, maxX);
      const releaseY = clamp(event.clientY - height / 2, margin, maxY);

      positionCurrent.current = { x: releaseX, y: releaseY };
      positionTarget.current = { x: releaseX, y: releaseY };

      if (containerEl) {
        containerEl.style.transform = `translate3d(${releaseX}px, ${releaseY}px, 0)`;
      }

      if (wasDragging) {
        const samples = touchMoves.current;
        const lastSample = samples[samples.length - 1];
        let reference = lastSample;
        for (let i = samples.length - 2; i >= 0; i -= 1) {
          if (lastSample.time - samples[i].time >= 50) {
            reference = samples[i];
            break;
          }
          reference = samples[i];
        }

        const dt = (lastSample.time - reference.time) / 1000;
        let vx = 0;
        let vy = 0;
        if (dt > 0) {
          vx = (lastSample.x - reference.x) / dt;
          vy = (lastSample.y - reference.y) / dt;
        }

        const speed = Math.hypot(vx, vy);
        if (speed > FLING_VELOCITY_THRESHOLD) {
          const maxSpeed = 2400;
          const scale = speed > maxSpeed ? maxSpeed / speed : 1;
          flingState.current = { active: true, vx: vx * scale, vy: vy * scale };
          previousFrameTimeRef.current = null;
          isFrozen.current = true;
        } else {
          flingState.current = { active: false, vx: 0, vy: 0 };
          isFrozen.current = false;
        }
      } else {
        triggerTouchDialog();
      }

      touchMoves.current = [];
    };

    const handlePointerUp = (event: PointerEvent) => finishTouch(event, false);
    const handlePointerCancel = (event: PointerEvent) => finishTouch(event, true);

    el.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      clearLongPressTimeout();
      el.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [interactionMode, beginTouchDrag, clamp, getEdgeMargin, triggerTouchDialog]);

  useEffect(() => {
    let raf: number;
    const step = (timestamp: number) => {
      const prev = previousFrameTimeRef.current ?? timestamp;
      const deltaTime = Math.min(0.05, (timestamp - prev) / 1000);
      previousFrameTimeRef.current = timestamp;

      if (flingState.current.active) {
        const margin = getEdgeMargin();
        const { width, height } = sizeRef.current;
        const maxX = Math.max(margin, window.innerWidth - width - margin);
        const maxY = Math.max(margin, window.innerHeight - height - margin);

        flingState.current.vy += FLING_GRAVITY * deltaTime;

        let nextX = positionCurrent.current.x + flingState.current.vx * deltaTime;
        let nextY = positionCurrent.current.y + flingState.current.vy * deltaTime;
        let hitFloor = false;

        if (nextX <= margin) {
          nextX = margin;
          if (flingState.current.vx < 0) {
            flingState.current.vx = Math.abs(flingState.current.vx) * FLING_RESTITUTION;
          }
        } else if (nextX >= maxX) {
          nextX = maxX;
          if (flingState.current.vx > 0) {
            flingState.current.vx = -Math.abs(flingState.current.vx) * FLING_RESTITUTION;
          }
        }

        if (nextY <= margin) {
          nextY = margin;
          if (flingState.current.vy < 0) {
            flingState.current.vy = Math.abs(flingState.current.vy) * FLING_RESTITUTION;
          }
        } else if (nextY >= maxY) {
          nextY = maxY;
          if (flingState.current.vy > 0) {
            flingState.current.vy = -Math.abs(flingState.current.vy) * FLING_RESTITUTION;
          }
          hitFloor = true;
          flingState.current.vx *= FLING_SURFACE_DAMPING;
        }

        const damping = Math.exp(-FLING_FRICTION * deltaTime);
        flingState.current.vx *= damping;
        flingState.current.vy *= damping;

        positionCurrent.current = { x: nextX, y: nextY };
        positionTarget.current = { x: nextX, y: nextY };
        tiltTarget.current.x += (flingState.current.vx * 0.002 - tiltTarget.current.x) * 0.16;
        tiltTarget.current.y += (-flingState.current.vy * 0.002 - tiltTarget.current.y) * 0.16;

        const speed = Math.hypot(flingState.current.vx, flingState.current.vy);
        if (
          (hitFloor && Math.abs(flingState.current.vy) < FLING_SETTLE_VELOCITY &&
            Math.abs(flingState.current.vx) < FLING_SETTLE_VELOCITY) ||
          (!hitFloor && speed < FLING_MIN_SPEED)
        ) {
          flingState.current = { active: false, vx: 0, vy: 0 };
          isFrozen.current = false;
        } else {
          isFrozen.current = true;
        }
      }

      if (!flingState.current.active) {
        if (!isEntering.current && !isFrozen.current) {
          positionCurrent.current.x += (positionTarget.current.x - positionCurrent.current.x) * 0.09;
          positionCurrent.current.y += (positionTarget.current.y - positionCurrent.current.y) * 0.09;

          const velocityX = positionTarget.current.x - positionCurrent.current.x;
          const velocityY = positionTarget.current.y - positionCurrent.current.y;
          tiltTarget.current.x += (velocityX * 0.01 - tiltTarget.current.x) * 0.08;
          tiltTarget.current.y += (velocityY * 0.01 - tiltTarget.current.y) * 0.08;
        } else if (isFrozen.current) {
          tiltTarget.current.x *= 0.92;
          tiltTarget.current.y *= 0.92;
        } else {
          tiltTarget.current.x *= 0.96;
          tiltTarget.current.y *= 0.96;
        }
      }

      const el = containerRef.current;
      if (el) {
        el.style.transform = `translate3d(${positionCurrent.current.x}px, ${positionCurrent.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [getEdgeMargin]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (isFrozen.current || isEntering.current) return;
      if (interactionMode === "touch") return;
      if (event.pointerType && event.pointerType !== "mouse") return;

      const { width, height } = sizeRef.current;
      const centerX = positionCurrent.current.x + width / 2;
      const centerY = positionCurrent.current.y + height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const threshold = Math.max(180, Math.min(window.innerWidth, window.innerHeight) * 0.18);

      if (distance > 0 && distance < threshold) {
        if (!hasActiveChase.current) {
          hasActiveChase.current = true;
          chaseCount.current += 1;
          if (chaseCount.current >= ESCAPE_THRESHOLD) {
            isFrozen.current = true;
            positionTarget.current = { ...positionCurrent.current };
            setIsConcerned(true);
            return;
          }
        }
        const escapeStrength = threshold - distance + 140;
        const awayX = -dx / distance;
        const awayY = -dy / distance;
        let nextX = positionCurrent.current.x + awayX * escapeStrength;
        let nextY = positionCurrent.current.y + awayY * escapeStrength;
        const margin = getEdgeMargin();
        const maxX = Math.max(margin, window.innerWidth - width - margin);
        const maxY = Math.max(margin, window.innerHeight - height - margin);
        nextX = Math.min(Math.max(margin, nextX), maxX);
        nextY = Math.min(Math.max(margin, nextY), maxY);
        positionTarget.current.x = nextX;
        positionTarget.current.y = nextY;
        tiltTarget.current.x = awayX * 0.6;
        tiltTarget.current.y = awayY * 0.6;
      } else {
        hasActiveChase.current = false;
        tiltTarget.current.x *= 0.92;
        tiltTarget.current.y *= 0.92;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [getEdgeMargin, interactionMode]);

  useEffect(() => {
    const updateSize = () => {
      const width = sizeRef.current.width;
      const height = sizeRef.current.height;
      const margin = getEdgeMargin();
      const maxX = Math.max(margin, window.innerWidth - width - margin);
      const maxY = Math.max(margin, window.innerHeight - height - margin);
      positionTarget.current.x = Math.min(Math.max(margin, positionTarget.current.x), maxX);
      positionTarget.current.y = Math.min(Math.max(margin, positionTarget.current.y), maxY);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [getEdgeMargin]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      sizeRef.current = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      };
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (greetingTimeoutRef.current !== null) {
      window.clearTimeout(greetingTimeoutRef.current);
      greetingTimeoutRef.current = null;
    }
  }, []);

  const handleResume = () => {
    chaseCount.current = 0;
    hasActiveChase.current = false;
    isFrozen.current = false;
    isEntering.current = false;
    flightProgress.current = 1;
    if (settleTimeoutRef.current !== null) {
      window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
    }
    setFlightPhase("idle");
    setIsConcerned(false);
    setIsGreetingVisible(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-50"
      style={{
        width: `${assistantSize.width}px`,
        height: `${assistantSize.height}px`,
        transform: "translate3d(0px, 0px, 0)",
        willChange: "transform",
        touchAction: interactionMode === "touch" ? "none" : "auto",
      }}
    >
      {isGreetingVisible && (
        <div
          ref={greetingDialogRef}
          className="absolute -top-40 left-1/2 -translate-x-1/2 pointer-events-none pt-16 pr-5 pb-5 pl-5"
        >
          <div className="w-60">
            <div className="relative rounded-2xl bg-white/95 px-5 py-4 shadow-2xl text-sm text-slate-800">
              <p className="font-semibold mb-1">¡Hola!</p>
              <p>Hola, soy Kali. Seré tu asistente personal para lo que necesites.</p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 h-0 w-0 border-x-[14px] border-t-[16px] border-x-transparent border-t-white/95 drop-shadow-xl" />
            </div>
          </div>
        </div>
      )}
      {isConcerned && (
        <div
          ref={concernedDialogRef}
          className="absolute -top-40 left-1/2 -translate-x-1/2 pointer-events-auto pt-16 pr-5 pb-5 pl-5"
        >
          <div className="w-60">
            <div className="relative rounded-2xl bg-white/95 px-5 py-4 shadow-2xl text-sm text-slate-800">
              <p className="font-semibold mb-1">¡Hey!</p>
              <p className="mb-2">¿Qué pasa? ¿Necesitas ayuda?</p>
              <button
                onClick={handleResume}
                className="rounded-full bg-blue-600 px-3 py-1 text-white text-xs font-medium hover:bg-blue-500 transition"
              >
                Volver a patrullar
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 h-0 w-0 border-x-[14px] border-t-[16px] border-x-transparent border-t-white/95 drop-shadow-xl" />
            </div>
          </div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 1.1, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 3]} intensity={0.9} />
        <Suspense fallback={<Html center>Cargando…</Html>}>
          <Hoverbot
            tiltOffset={tiltOffset}
            tiltTarget={tiltTarget}
            flightPhase={flightPhase}
            flightProgress={flightProgress}
          />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
