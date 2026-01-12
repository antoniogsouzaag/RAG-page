import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Olá! 👋 Sou o assistente virtual da AG LABS. Como posso ajudar você hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Quando o input recebe foco (ex: teclado mobile abriu), rola as mensagens
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const onFocus = () => setTimeout(() => scrollToBottom(), 300);
    el.addEventListener("focus", onFocus);
    return () => el.removeEventListener("focus", onFocus);
  }, [scrollToBottom]);

  // Ajuste para dispositivos móveis: observa visualViewport para reposicionar
  // o chat quando o teclado virtual aparece, evitando ficar escondido.
  useEffect(() => {
    const applyViewport = () => {
      const el = chatRef.current;
      const vv = (window as any).visualViewport;

      if (!el) return;

      if (vv) {
        const viewportHeight = vv.height;
        const offsetTop = vv.offsetTop || 0;
        // espaço inferior estimado (distância entre visualViewport.bottom e window.innerHeight)
        const keyboardOverlap = Math.max(0, window.innerHeight - (viewportHeight + offsetTop));

        // Detecta se é mobile
        const isMobileDevice = window.innerWidth < 640;

        if (isMobileDevice && keyboardOverlap > 50) {
          // Teclado aberto em mobile: ocupa toda a área visível
          el.style.position = 'fixed';
          el.style.top = `${offsetTop + 8}px`;
          el.style.bottom = 'auto';
          el.style.height = `${viewportHeight - 16}px`;
          el.style.left = '8px';
          el.style.right = '8px';
        } else if (isMobileDevice) {
          // Mobile sem teclado: altura quase completa
          el.style.position = 'fixed';
          el.style.top = '12px';
          el.style.bottom = '12px';
          el.style.height = 'auto';
          el.style.left = '16px';
          el.style.right = '16px';
        } else {
          // Desktop: limpa estilos inline para usar CSS padrão
          el.style.position = '';
          el.style.top = '';
          el.style.bottom = '';
          el.style.height = '';
          el.style.left = '';
          el.style.right = '';
        }
      } else {
        // limpa estilos quando não há visualViewport
        el.style.position = '';
        el.style.top = '';
        el.style.bottom = '';
        el.style.height = '';
        el.style.left = '';
        el.style.right = '';
      }
    };

    // aplica ao abrir
    if (isOpen) applyViewport();

    (window as any).visualViewport?.addEventListener?.("resize", applyViewport);
    (window as any).visualViewport?.addEventListener?.("scroll", applyViewport);
    window.addEventListener("resize", applyViewport);

    return () => {
      (window as any).visualViewport?.removeEventListener?.("resize", applyViewport);
      (window as any).visualViewport?.removeEventListener?.("scroll", applyViewport);
      window.removeEventListener("resize", applyViewport);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://webhook.agmusic.cloud/webhook/siteaglabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na resposta do servidor: ${response.status}`);
      }

      // Tenta ler a resposta como texto primeiro
      const responseText = await response.text();
      
      let content = "";
      
      try {
        // Tenta parsear como JSON
        const data = JSON.parse(responseText);
        
        // Tenta extrair a mensagem de diferentes formatos possíveis
        if (typeof data === "string") {
          content = data;
        } else if (data.response) {
          content = data.response;
        } else if (data.message) {
          content = data.message;
        } else if (data.output) {
          content = data.output;
        } else if (data.text) {
          content = data.text;
        } else if (data.content) {
          content = data.content;
        } else if (data.reply) {
          content = data.reply;
        } else if (data.answer) {
          content = data.answer;
        } else if (Array.isArray(data) && data.length > 0) {
          // Se for um array, pega o primeiro elemento
          const firstItem = data[0];
          content = typeof firstItem === "string" 
            ? firstItem 
            : firstItem.response || firstItem.message || firstItem.output || firstItem.text || JSON.stringify(firstItem);
        } else {
          // Se nada funcionar, stringify o objeto
          content = JSON.stringify(data);
        }
      } catch {
        // Se não for JSON válido, usa o texto diretamente
        content = responseText;
      }
      
      if (!content || content.trim() === "" || content === "{}" || content === "[]") {
        content = "Recebi sua mensagem! Como posso ajudar?";
      }
      
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            ref={chatRef}
            className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px] h-[85vh] sm:h-[600px] sm:max-h-[80vh] bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-500/10 z-101 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-white/10 bg-linear-to-r from-purple-500/10 to-cyan-500/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Assistente AG LABS</h3>
                  <p className="text-xs text-white/50">Online agora</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                aria-label="Fechar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      message.role === "assistant"
                        ? "bg-linear-to-br from-purple-500 to-cyan-500"
                        : "bg-white/10"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Sparkles className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white/70" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === "assistant"
                        ? "bg-white/5 border border-white/10 text-white/90"
                        : "bg-purple-500/20 border border-purple-500/30 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className="text-[10px] text-white/30 mt-1 block">
                      {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                      <span className="text-sm text-white/50">Digitando...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/30">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 sm:p-3 rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-white/30 mt-2 text-center">
                Pressione Enter para enviar • AG LABS AI
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Context for global chatbot state
// Chatbot UI is exported as default from this file.
