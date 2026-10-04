import OutlineButton from "./OutlineButton";
import { AUTH_PANEL_CONTENT } from "./authContent";

interface MobileInfoBannerProps {
  mode: "login" | "signup";
  onSwitch: () => void;
}

export default function MobileInfoBanner({
  mode,
  onSwitch,
}: MobileInfoBannerProps) {
  const content = AUTH_PANEL_CONTENT[mode];

  return (
    <div className="flex flex-col items-center gap-3 bg-deepgreen p-6 text-center text-white">
      <h2 className="text-xl font-bold">{content.title}</h2>
      <p className="text-sm text-white/80">{content.text}</p>
      <OutlineButton onClick={onSwitch}>{content.buttonLabel}</OutlineButton>
    </div>
  );
}
