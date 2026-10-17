import type {
  LeanCanvas,
  LeanCanvasField,
  PitchFieldKey,
  PitchFormErrors,
  PitchFormValues,
  PitchTab,
  StartupPitch,
  UpdatePitchRequest,
} from "../types/pitch";

// Pure helpers of the "Pitch & Lean Canvas" page: video link parsing,
// validation, date formatting and form <-> API mapping.

export const SHORT_PITCH_MAX = 280;
// TODO(api): assumed limit per Lean Canvas block; confirm with the backend.
export const CANVAS_BLOCK_MAX = 500;

// Reading order of the canvas blocks (also the order used to find the first
// invalid field on publish).
export const LEAN_CANVAS_FIELDS: LeanCanvasField[] = [
  "problem",
  "solution",
  "keyMetrics",
  "uniqueValueProposition",
  "unfairAdvantage",
  "channels",
  "customerSegments",
  "costStructure",
  "revenueStreams",
];

export const PITCH_FIELDS: PitchFieldKey[] = ["shortPitch", "videoUrl", ...LEAN_CANVAS_FIELDS];

export function fieldTab(field: PitchFieldKey): PitchTab {
  return field === "shortPitch" || field === "videoUrl" ? "pitch" : "canvas";
}

// DOM id of each field, used by the labels and to focus the first error
export function fieldId(field: PitchFieldKey) {
  return `pitch-field-${field}`;
}

export function fieldMax(field: PitchFieldKey): number | null {
  if (field === "videoUrl") return null;
  return field === "shortPitch" ? SHORT_PITCH_MAX : CANVAS_BLOCK_MAX;
}

export function fieldValue(values: PitchFormValues, field: PitchFieldKey): string {
  if (field === "shortPitch" || field === "videoUrl") return values[field];
  return values.leanCanvas[field];
}

export function withFieldValue(values: PitchFormValues, field: PitchFieldKey, value: string): PitchFormValues {
  if (field === "shortPitch" || field === "videoUrl") return { ...values, [field]: value };
  return { ...values, leanCanvas: { ...values.leanCanvas, [field]: value } };
}

// ---------------------------------------------------------------------------
// Video link (YouTube / Vimeo)
// ---------------------------------------------------------------------------

export interface VideoLink {
  provider: "YouTube" | "Vimeo";
  // Link typed by the user, already checked (http/https + known host)
  url: string;
}

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_ID_PATHS = ["embed", "shorts", "live"];

export function parseVideoUrl(raw: string): VideoLink | null {
  const value = raw.trim();
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const host = url.hostname.toLowerCase().replace(/^(www|m)\./, "");
  const segments = url.pathname.split("/").filter(Boolean);

  if (host === "youtube.com" || host === "youtu.be") {
    let id: string | null = null;
    if (host === "youtu.be") id = segments[0] ?? null;
    else if (segments[0] === "watch") id = url.searchParams.get("v");
    else if (YOUTUBE_ID_PATHS.includes(segments[0] ?? "")) id = segments[1] ?? null;
    return id && YOUTUBE_ID.test(id) ? { provider: "YouTube", url: url.href } : null;
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    return segments.some((segment) => /^\d+$/.test(segment)) ? { provider: "Vimeo", url: url.href } : null;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export function validatePitchForm(values: PitchFormValues): PitchFormErrors {
  const errors: PitchFormErrors = {};

  if (!values.shortPitch.trim()) {
    errors.shortPitch = "Escreva o pitch curto para publicar.";
  } else if (values.shortPitch.length > SHORT_PITCH_MAX) {
    errors.shortPitch = `O pitch curto pode ter no máximo ${SHORT_PITCH_MAX} caracteres.`;
  }

  if (values.videoUrl.trim() && !parseVideoUrl(values.videoUrl)) {
    errors.videoUrl = "Use um link válido do YouTube ou do Vimeo (ex.: https://youtu.be/...).";
  }

  for (const field of LEAN_CANVAS_FIELDS) {
    if (values.leanCanvas[field].length > CANVAS_BLOCK_MAX) {
      errors[field] = `Este bloco pode ter no máximo ${CANVAS_BLOCK_MAX} caracteres.`;
    }
  }

  return errors;
}

export function firstInvalidField(errors: PitchFormErrors): PitchFieldKey | null {
  return PITCH_FIELDS.find((field) => errors[field]) ?? null;
}

// ---------------------------------------------------------------------------
// Formatting and mapping
// ---------------------------------------------------------------------------

// "28/08/2026 às 16:40"
export function formatUpdatedAt(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const day = date.toLocaleDateString("pt-BR");
  const time = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${day} às ${time}`;
}

export function toFormValues(pitch: StartupPitch): PitchFormValues {
  return {
    shortPitch: pitch.shortPitch,
    videoUrl: pitch.videoUrl ?? "",
    leanCanvas: { ...pitch.leanCanvas },
  };
}

export function toUpdateRequest(values: PitchFormValues): UpdatePitchRequest {
  const leanCanvas: LeanCanvas = { ...values.leanCanvas };
  for (const field of LEAN_CANVAS_FIELDS) leanCanvas[field] = leanCanvas[field].trim();
  return {
    shortPitch: values.shortPitch.trim(),
    videoUrl: values.videoUrl.trim() || null,
    leanCanvas,
  };
}

// Compares what would be sent to the API, so trailing spaces alone don't
// count as unpublished changes.
export function haveSameContent(a: PitchFormValues, b: PitchFormValues): boolean {
  const left = toUpdateRequest(a);
  const right = toUpdateRequest(b);
  return (
    left.shortPitch === right.shortPitch &&
    left.videoUrl === right.videoUrl &&
    LEAN_CANVAS_FIELDS.every((field) => left.leanCanvas[field] === right.leanCanvas[field])
  );
}
