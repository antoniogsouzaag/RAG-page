import { useEffect } from "react";

/**
 * O App AG LABS agora tem site proprio em https://aglabs.app.br
 * (separado deste projeto RAG). Mantemos /app e /aglabs aqui como
 * redirecionamento para nao quebrar links/backlinks ja publicados.
 */
const APP_URL = "https://aglabs.app.br/";

export default function AppRedirect() {
  useEffect(() => {
    window.location.replace(APP_URL);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white/70 text-sm">
        Redirecionando para{" "}
        <a href={APP_URL} className="text-purple-400 underline">
          aglabs.app.br
        </a>
        ...
      </p>
    </div>
  );
}
