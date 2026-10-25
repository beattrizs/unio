// Contract of GET/PUT /api/profile/me for a STARTUP user, with the exact
// field names of the backend (ProfileService.buildStartupProfile and
// updateStartupProfile; entity Startup; migrations V8 and V13).

export interface StartupProfileResponse {
  id: number;
  email: string;
  role: "STARTUP";
  createdAt: string;
  nome: string;
  segmento: string;
  estagio: string;
  localizacao: string;
  modeloNegocio: string;
  mercadoAlvo: string;
  // BigDecimal, NUMERIC(19,2)
  capitalProcurado: number;
  // TEXT, nullable
  pitchCanvas: string | null;
}

// Body of PUT /api/profile/me. The backend only updates the keys sent and
// turns every text value into String.valueOf(value), so null would be saved
// as the text "null": text fields are always sent, never null.
export interface StartupProfileUpdateRequest {
  nome: string;
  segmento: string;
  estagio: string;
  localizacao: string;
  modeloNegocio: string;
  mercadoAlvo: string;
  // Only sent when the user changed it: the form works in whole reais, so
  // resending an untouched value would drop its cents.
  capitalProcurado?: number;
  pitchCanvas: string;
}

// Values edited in the form. capitalProcurado holds the whole reais as
// digits ("500000"), formatted only for display.
export type StartupProfileFormValues = Omit<StartupProfileUpdateRequest, "capitalProcurado"> & {
  capitalProcurado: string;
};

export type StartupProfileField = keyof StartupProfileFormValues;

export type StartupProfileErrors = Partial<Record<StartupProfileField, string>>;
