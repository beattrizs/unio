import { Megaphone } from "lucide-react";
import type { PitchFieldKey, PitchFormErrors } from "../../types/pitch";
import { SHORT_PITCH_MAX, fieldId } from "../../utils/pitch";
import PitchCard from "./PitchCard";
import TextAreaField from "./TextAreaField";
import VideoLinkField from "./VideoLinkField";
import { CHIP } from "./styles";

interface PitchFormCardProps {
  shortPitch: string;
  videoUrl: string;
  errors: PitchFormErrors;
  onChange: (field: PitchFieldKey, value: string) => void;
  onBlur: (field: PitchFieldKey) => void;
}

// "Pitch do Negócio" card: short pitch + video link
export default function PitchFormCard({ shortPitch, videoUrl, errors, onChange, onBlur }: PitchFormCardProps) {
  return (
    <PitchCard
      title="Pitch do Negócio"
      icon={Megaphone}
      subtitle="Sua proposta de valor concisa para atrair e qualificar investidores da rede."
      badge={<span className={`${CHIP} bg-lightgray text-deepgreen`}>Formato Investidor-Anjo</span>}
    >
      <div className="space-y-6">
        <TextAreaField
          id={fieldId("shortPitch")}
          label="Pitch curto (resumo executivo)"
          hint="Qual dor você resolve, para quem e por que agora."
          required
          rows={5}
          value={shortPitch}
          maxLength={SHORT_PITCH_MAX}
          error={errors.shortPitch}
          placeholder="Ex.: Ajudamos produtores rurais a reduzir o consumo de água com sensores IoT…"
          onChange={(value) => onChange("shortPitch", value)}
          onBlur={() => onBlur("shortPitch")}
        />
        <VideoLinkField
          id={fieldId("videoUrl")}
          value={videoUrl}
          error={errors.videoUrl}
          onChange={(value) => onChange("videoUrl", value)}
          onBlur={() => onBlur("videoUrl")}
        />
      </div>
    </PitchCard>
  );
}
