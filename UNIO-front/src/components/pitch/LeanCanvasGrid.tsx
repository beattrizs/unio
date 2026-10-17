import { LayoutGrid } from "lucide-react";
import type { LeanCanvas, PitchFieldKey, PitchFormErrors } from "../../types/pitch";
import { CANVAS_BLOCK_MAX, LEAN_CANVAS_FIELDS, fieldId } from "../../utils/pitch";
import PitchCard from "./PitchCard";
import TextAreaField from "./TextAreaField";
import { LEAN_CANVAS_BLOCKS } from "./leanCanvasBlocks";

interface LeanCanvasGridProps {
  values: LeanCanvas;
  errors: PitchFormErrors;
  onChange: (field: PitchFieldKey, value: string) => void;
  onBlur: (field: PitchFieldKey) => void;
}

// "Lean Canvas" tab: the 9 editable blocks. Classic canvas on xl (the
// sidebar leaves too little width for 5 columns at lg), 2 columns on md and
// 1 on mobile. The DOM follows the reading order of the canvas.
export default function LeanCanvasGrid({ values, errors, onChange, onBlur }: LeanCanvasGridProps) {
  return (
    <PitchCard
      title="Lean Canvas"
      icon={LayoutGrid}
      subtitle="Seu modelo de negócio em uma página, para os investidores entenderem a startup de relance."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-10">
        {LEAN_CANVAS_FIELDS.map((field) => {
          const { title, hint, icon, layout } = LEAN_CANVAS_BLOCKS[field];
          return (
            <div key={field} className={`rounded-2xl border border-lightgray bg-lightgray/30 p-4 ${layout}`}>
              <TextAreaField
                id={fieldId(field)}
                label={title}
                icon={icon}
                hint={hint}
                tone="onTinted"
                value={values[field]}
                maxLength={CANVAS_BLOCK_MAX}
                error={errors[field]}
                onChange={(value) => onChange(field, value)}
                onBlur={() => onBlur(field)}
              />
            </div>
          );
        })}
      </div>
    </PitchCard>
  );
}
