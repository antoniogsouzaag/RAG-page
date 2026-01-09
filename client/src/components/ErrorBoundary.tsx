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
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-2">Ocorreu um erro na aplicação</h2>
            <p className="text-sm text-white/80 mb-4">Estamos trabalhando para resolver. Recarregue a página ou contate o suporte.</p>
            <pre className="text-xs text-left bg-white/5 p-3 rounded-md overflow-auto max-h-48">{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
