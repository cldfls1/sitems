import { useEffect, useRef } from 'react';

const NoiseTexture = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        if (Math.random() < 0.5) {
          buffer[i] = 0xff000000 | (Math.random() * 0x30 << 16) | (Math.random() * 0x30 << 8) | Math.random() * 0x30;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    createNoise();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createNoise();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-[1]"
    />
  );
};

export default NoiseTexture;
