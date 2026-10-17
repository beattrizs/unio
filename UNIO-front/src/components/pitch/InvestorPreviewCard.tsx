import { Eye } from "lucide-react";
import type { VideoLink } from "../../utils/pitch";
import InvestorFeedPreview from "./InvestorFeedPreview";
import PitchCard from "./PitchCard";
import { CHIP } from "./styles";

interface InvestorPreviewCardProps {
  startupName: string;
  sector: string;
  shortPitch: string;
  video: VideoLink | null;
}

// Side card of the Pitch tab; updates as the user types
export default function InvestorPreviewCard(props: InvestorPreviewCardProps) {
  return (
    <PitchCard
      title="Pré-visualização para Investidores"
      icon={Eye}
      subtitle="Assim sua startup aparece no feed dos investidores."
      badge={
        <span className={`${CHIP} bg-sage/30 text-deepgreen`}>
          <span className="h-2 w-2 rounded-full bg-deepgreen" aria-hidden="true" />
          Feed Ativo
        </span>
      }
    >
      <InvestorFeedPreview {...props} />
    </PitchCard>
  );
}
