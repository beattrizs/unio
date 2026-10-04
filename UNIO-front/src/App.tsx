import AppRoutes from "./routes";

// O <BrowserRouter> já está em main.tsx, envolvendo <App />. Aqui só falta
// o componente com a árvore de rotas em si (ver src/routes/index.tsx).
export default function App() {
  return <AppRoutes />;
}
