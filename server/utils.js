/**
 * Controlla che un oggetto contenga tutti i campi richiesti.
 * Usata principalmente per validare req.body nelle API.
 *
 * @param {object} source - Oggetto da validare (es. req.body)
 * @param {string[]} required - Lista dei campi obbligatori
 * @throws {Error} Errore con status 400 se mancano campi
 */
export function requireFields(source, required = []) {
  if (!source || typeof source !== 'object') {
    const err = new Error('Payload non valido');
    err.status = 400;
    throw err;
  }

  const missingFields = required.filter(
    (field) => source[field] === undefined || source[field] === null || source[field] === ''
  );

  if (missingFields.length > 0) {
    const err = new Error(
      `Campi obbligatori mancanti: ${missingFields.join(', ')}`
    );
    err.status = 400;
    throw err;
  }
}

/**
 * Estrae e normalizza i parametri di paginazione dalla query string.
 * Impone un limite massimo per evitare query troppo pesanti.
 *
 * @param {object} req - Oggetto request di Express
 * @returns {{ limit: number, offset: number }}
 */
export function paginated(req) {
  const rawLimit = Number(req.query?.limit);
  const rawOffset = Number(req.query?.offset);

  const limit = Number.isInteger(rawLimit)
    ? Math.min(rawLimit, 100)
    : 20;

  const offset = Number.isInteger(rawOffset) && rawOffset >= 0
    ? rawOffset
    : 0;

  return { limit, offset };
}