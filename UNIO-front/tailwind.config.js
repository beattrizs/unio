/** @type {import('tailwindcss').Config} */
export default {
  // O Tailwind só gera as classes usadas nestes arquivos (deixa o CSS final pequeno)
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Paleta customizada (usar como bg-deepgreen, text-sage, border-lightgray, etc.)
      // O fundo geral da página usa o white padrão do Tailwind — não precisa
      // de variável própria pra isso.
      colors: {
        deepgreen: '#00412E', // verde escuro - fundo principal, headers, sidebar, botões primários, texto de alto contraste
        sage: '#96BF8A', // verde sálvia - elementos secundários, estados hover, badges, detalhes de gráfico
        lightgray: '#E8EAE5', // cinza claro - fundo de cards, seções claras, inputs
      },
      // Usada na troca de conteúdo do toggle Startup/Investidor em "Como Funciona"
      // (entra com um leve fade + slide de baixo pra cima, em vez de trocar seco)
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
