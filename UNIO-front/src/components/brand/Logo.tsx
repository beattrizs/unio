import logoBranca from "../../assets/logo/logo-branca.png";
import logoVerde from "../../assets/logo/logo-verde.png";

// Logo oficial (símbolo "U" + "N", sem o nome escrito). Único lugar que
// importa os arquivos: quando a logo vier em SVG, só este arquivo muda.
//
// As PNGs atuais têm margens transparentes diferentes entre si (e são
// pequenas: 72×52 e 65×54). Para o símbolo visível ter sempre a altura do
// `size` e alinhar com os vizinhos, cada variante declara a área ocupada pelo
// traço (`traco`, em px da imagem) e a imagem é recortada por CSS. Com um SVG
// sem margens, `traco` passa a ser a imagem inteira.
const VARIANTES = {
  verde: { src: logoVerde, largura: 72, altura: 52, traco: { x: 6, y: 6, largura: 61, altura: 39 } },
  branca: { src: logoBranca, largura: 65, altura: 54, traco: { x: 7, y: 10, largura: 51, altura: 33 } },
};

// Altura do símbolo visível, em px
const ALTURAS = { sm: 28, md: 36, lg: 56 };

interface LogoProps {
  // verde: fundos claros/brancos; branca: fundos escuros (verde profundo)
  variant: keyof typeof VARIANTES;
  size?: keyof typeof ALTURAS;
  className?: string;
}

export default function Logo({ variant, size = "md", className = "" }: LogoProps) {
  const { src, largura, altura, traco } = VARIANTES[variant];
  const escala = ALTURAS[size] / traco.altura;

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden align-middle ${className}`}
      style={{ width: traco.largura * escala, height: traco.altura * escala }}
    >
      <img
        src={src}
        alt="UNIO"
        draggable={false}
        className="absolute max-w-none select-none"
        style={{
          width: largura * escala,
          height: altura * escala,
          left: -traco.x * escala,
          top: -traco.y * escala,
        }}
      />
    </span>
  );
}
