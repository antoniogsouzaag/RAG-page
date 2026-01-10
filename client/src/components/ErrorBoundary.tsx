import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console for now; could integrate with Sentry/other later
    // eslint-disable-next-line no-console
    console.error("Unhandled error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black/90 text-white p-6">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-2">Ocorreu um erro na aplicação</h2>
            <p className="text-sm text-white/80 mb-4">Estamos trabalhando para resolver. Você pode recarregar ou abrir uma versão otimizada.</p>

            <div className="flex gap-3 justify-center mb-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
              >
                Recarregar
              </button>

              <button
                onClick={() => { try { localStorage.setItem('aglabs_safe_mode','1'); } catch(e){} window.location.reload(); }}
                className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white"
              >
                Versão Leve
              </button>
            </div>

            <details className="text-left bg-white/5 p-3 rounded-md overflow-auto max-h-48">
              <summary className="cursor-pointer text-sm text-white/70">Mostrar detalhes do erro</summary>
              <pre className="text-xs mt-2">{String(this.state.error)}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
