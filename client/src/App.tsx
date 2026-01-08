import React, { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
const ChatbotProvider = lazy(() => import("@/components/ChatbotContext").then((m) => ({ default: m.ChatbotProvider })));
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={<>{/* Chatbot loading deferred */}</>}>
          <ChatbotProvider>
            <Toaster />
            <Router />
          </ChatbotProvider>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
