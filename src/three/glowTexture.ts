import * as THREE from 'three';

/** Soft radial white gradient used as the additive glow behind the model. */
export function createGlowTexture(): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0.0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.18, 'rgba(255,252,245,0.9)');
  grad.addColorStop(0.42, 'rgba(255,248,235,0.35)');
  grad.addColorStop(0.72, 'rgba(255,245,230,0.08)');
  grad.addColorStop(1.0, 'rgba(255,245,230,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
