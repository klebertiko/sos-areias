// CRC-16/CCITT-FALSE (poly 0x1021, init 0xFFFF) — required by the Banco Central BR Code spec.
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function tlv(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, '0')}${value}`;
}

// BR Code text fields only allow printable ASCII; strip accents/diacritics and truncate.
function sanitizeField(text: string, maxLength: number): string {
  const stripped = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();
  return (stripped || 'NA').slice(0, maxLength);
}

/**
 * Builds a real, scannable BR Code (PIX Copia e Cola) payload per the
 * Banco Central EMV QRCPS-MPM spec, including a valid CRC16 checksum.
 */
export function generatePixPayload(
  key: string,
  amount?: number,
  merchantName = 'REFORMA PISTA AREIAS',
  city = 'FLORIANOPOLIS'
): string {
  const merchantAccountInfo = tlv('00', 'BR.GOV.BCB.PIX') + tlv('01', key.trim());

  const fields = [
    tlv('00', '01'), // Payload Format Indicator
    tlv('26', merchantAccountInfo), // Merchant Account Info (PIX)
    tlv('52', '0000'), // Merchant Category Code
    tlv('53', '986'), // Transaction Currency: BRL
    ...(amount && amount > 0 ? [tlv('54', amount.toFixed(2))] : []),
    tlv('58', 'BR'), // Country Code
    tlv('59', sanitizeField(merchantName, 25)), // Merchant Name
    tlv('60', sanitizeField(city, 15)), // Merchant City
    tlv('62', tlv('05', '***')), // Additional Data Field: Reference Label
  ];

  const payloadWithoutCrc = `${fields.join('')}6304`;
  return payloadWithoutCrc + crc16(payloadWithoutCrc);
}
