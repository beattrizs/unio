import OutlineButton from "./OutlineButton";
import { AUTH_PANEL_CONTENT } from "./authContent";

interface InfoPanelProps {
  mode: "login" | "signup";
  onSwitch: () => void;
}

export default function InfoPanel({ mode, onSwitch }: InfoPanelProps) {
  const isSignup = mode === "signup";
  const login = AUTH_PANEL_CONTENT.login;
  const signup = AUTH_PANEL_CONTENT.signup;

  return (
    <div className="relative h-full w-full bg-deepgreen text-white">
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center transition-opacity duration-500 ${
          isSignup ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <h2 className="text-2xl font-bold">{login.title}</h2>
        <p className="text-sm text-white/80">{login.text}</p>
        <OutlineButton onClick={onSwitch}>{login.buttonLabel}</OutlineButton>
      </div>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center transition-opacity duration-500 ${
          isSignup ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold">{signup.title}</h2>
        <p className="text-sm text-white/80">{signup.text}</p>
        <OutlineButton onClick={onSwitch}>{signup.buttonLabel}</OutlineButton>
      </div>
    </div>
  );
}
