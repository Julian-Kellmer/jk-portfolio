"use client";

import { useEffect, useRef } from "react";

export default function InteractiveFooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const pointer = useRef({
    down: false,
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    vx: 0,
    vy: 0,
    speed: 0,
  });

  const trails = useRef([]);
  const rafRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initAudio() {
      if (audioRef.current) return;

      const audioCtx = new window.AudioContext();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();
      const panner = audioCtx.createStereoPanner();

      osc.type = "sine";
      osc.frequency.value = 180;

      filter.type = "lowpass";
      filter.frequency.value = 600;

      gain.gain.value = 0;

      osc.connect(filter);
      filter.connect(panner);
      panner.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();

      audioRef.current = { audioCtx, osc, gain, filter, panner };
    }

    async function resumeAudio() {
      initAudio();
      if (audioRef.current.audioCtx.state !== "running") {
        await audioRef.current.audioCtx.resume();
      }
    }

    function getLocalPos(e) {
      const rect = wrapper.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onPointerDown(e) {
      const pos = getLocalPos(e);
      pointer.current.down = true;
      pointer.current.x = pos.x;
      pointer.current.y = pos.y;
      pointer.current.tx = pos.x;
      pointer.current.ty = pos.y;
      resumeAudio();
    }

    function onPointerMove(e) {
      const pos = getLocalPos(e);
      pointer.current.tx = pos.x;
      pointer.current.ty = pos.y;
    }

    function onPointerUp() {
      pointer.current.down = false;
    }

    function drawWaveField(cx, cy, energy) {
      const lines = 18;
      const amplitude = 10 + energy * 35;
      const influenceRadius = 220;

      for (let i = 0; i < lines; i++) {
        const baseY = (height / (lines - 1)) * i;

        ctx.beginPath();

        for (let x = 0; x <= width; x += 12) {
          const dx = x - cx;
          const dy = baseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let offset = 0;

          if (dist < influenceRadius) {
            const force = 1 - dist / influenceRadius;
            offset = Math.sin((x * 0.02) + performance.now() * 0.005) * amplitude * force;
          }

          const y = baseY + offset;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255,255,255,${0.04 + energy * 0.18})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawTrail() {
      const arr = trails.current;
      if (arr.length < 2) return;

      ctx.beginPath();
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    function updateAudio() {
      if (!audioRef.current) return;

      const { osc, gain, filter, panner, audioCtx } = audioRef.current;
      const p = pointer.current;

      const now = audioCtx.currentTime;
      const normX = width ? p.x / width : 0;
      const normY = height ? p.y / height : 0;

      const freq = 140 + normX * 380;
      const volume = p.down ? Math.min(p.speed * 0.015, 0.12) : 0;
      const cutoff = 300 + p.speed * 1200;
      const pan = normX * 2 - 1;

      osc.frequency.linearRampToValueAtTime(freq, now + 0.05);
      gain.gain.linearRampToValueAtTime(volume, now + 0.05);
      filter.frequency.linearRampToValueAtTime(cutoff, now + 0.05);
      panner.pan.linearRampToValueAtTime(pan, now + 0.05);
    }

    function animate() {
      const p = pointer.current;

      const prevX = p.x;
      const prevY = p.y;

      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;

      p.vx = p.x - prevX;
      p.vy = p.y - prevY;
      p.speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

      trails.current.push({ x: p.x, y: p.y, life: 1 });
      if (trails.current.length > 24) trails.current.shift();

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);

      const energy = Math.min(p.speed / 20, 1);

      drawWaveField(p.x, p.y, energy);
      drawTrail();

      updateAudio();

      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();

    window.addEventListener("resize", resize);
    wrapper.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      if (audioRef.current) {
        audioRef.current.osc.stop();
        audioRef.current.audioCtx.close();
      }
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "32vh",
        minHeight: "220px",
        background: "#000",
        overflow: "hidden",
        touchAction: "none",
        cursor: "grab",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </section>
  );
}