/**
 * Helper to generate a simulated standard BR CODE (PIX) string
 * according to Banco Central EMV CoBR payload standard.
 */
export function generatePixPayload(key: string, amount?: number, merchantName = 'REFORMA PISTA AREIAS', city = 'AREIAS'): string {
  const cleanKey = key.trim();
  const formattedAmount = amount && amount > 0 ? amount.toFixed(2) : undefined;

  // Simplified PIX string format for copying or scanning
  if (formattedAmount) {
    return `00020126580014BR.GOV.BCB.PIX0136${cleanKey}520400005303986540${formattedAmount.length.toString().padStart(2, '0')}${formattedAmount}5802BR59${merchantName.length.toString().padStart(2, '0')}${merchantName}60${city.length.toString().padStart(2, '0')}${city}62070503***6304`;
  }

  return `00020126360014BR.GOV.BCB.PIX0136${cleanKey}5204000053039865802BR59${merchantName.length.toString().padStart(2, '0')}${merchantName}60${city.length.toString().padStart(2, '0')}${city}62070503***6304`;
}

/**
 * Renders a crisp retro pixel QR Code canvas element
 */
export function drawPixelQrCode(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const size = canvas.width || 200;
  const gridCount = 21; // 21x21 QR matrix simulation
  const cellSize = size / gridCount;

  // Clear
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  // Deterministic pseudo-random pattern based on string hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  ctx.fillStyle = '#09090b';

  // Helper for finder patterns
  const drawFinder = (startX: number, startY: number) => {
    // Outer 7x7 box
    ctx.fillRect(startX * cellSize, startY * cellSize, 7 * cellSize, 7 * cellSize);
    // Inner 5x5 white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect((startX + 1) * cellSize, (startY + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    // Inner 3x3 black
    ctx.fillStyle = '#09090b';
    ctx.fillRect((startX + 2) * cellSize, (startY + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  };

  // 3 Finder patterns
  drawFinder(0, 0);
  drawFinder(gridCount - 7, 0);
  drawFinder(0, gridCount - 7);

  // Fill pseudo random data grid
  ctx.fillStyle = '#09090b';
  for (let r = 0; r < gridCount; r++) {
    for (let c = 0; c < gridCount; c++) {
      // Skip finder pattern zones
      const inTopLeft = r < 7 && c < 7;
      const inTopRight = r < 7 && c >= gridCount - 7;
      const inBottomLeft = r >= gridCount - 7 && c < 7;
      if (inTopLeft || inTopRight || inBottomLeft) continue;

      // Timing pattern
      if (r === 6 || c === 6) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
        continue;
      }

      // Bit calculation based on hash
      const bit = Math.abs((hash ^ (r * 31 + c * 17)) % 100);
      if (bit > 42) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }

  // Center mini skate logo
  const centerSize = cellSize * 5;
  const centerPos = (size - centerSize) / 2;
  ctx.fillStyle = '#eab308'; // yellow-500
  ctx.fillRect(centerPos - 2, centerPos - 2, centerSize + 4, centerSize + 4);
  ctx.fillStyle = '#09090b';
  ctx.fillRect(centerPos, centerPos, centerSize, centerSize);
  ctx.fillStyle = '#eab308';
  // Small pixel skate deck shape
  ctx.fillRect(centerPos + cellSize, centerPos + cellSize * 2, cellSize * 3, cellSize);
}
