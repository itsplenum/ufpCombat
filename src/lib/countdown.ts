export interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Placeholder mientras el countdown no ha montado en el cliente. */
export const COUNTDOWN_PLACEHOLDER: CountdownParts = {
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
};

/** Descompone la distancia a `targetMs` en partes con ceros a la izquierda; no baja de 00. */
export function getCountdownParts(targetMs: number, nowMs: number): CountdownParts {
  let remaining = Math.max(0, targetMs - nowMs);

  const days = Math.floor(remaining / 86_400_000);
  remaining -= days * 86_400_000;
  const hours = Math.floor(remaining / 3_600_000);
  remaining -= hours * 3_600_000;
  const minutes = Math.floor(remaining / 60_000);
  remaining -= minutes * 60_000;
  const seconds = Math.floor(remaining / 1_000);

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

/** Días completos restantes (para "Faltan N días" en la página de evento). */
export function getDaysRemaining(targetIso: string, nowMs = Date.now()): number {
  return Math.max(0, Math.floor((new Date(targetIso).getTime() - nowMs) / 86_400_000));
}
