import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const ICONS = [FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn];

export default function SocialButtons() {
  return (
    <div className="mb-4 flex justify-center gap-3">
      {ICONS.map((Icon, index) => (
        <button
          key={index}
          type="button"
          aria-label="Acesso via rede social (indisponível nesta demo)"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-deepgreen/40 text-deepgreen transition-colors hover:bg-sage/30"
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
