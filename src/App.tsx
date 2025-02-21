
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "./config/web3";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import DAO from "./pages/DAO";
import Profile from "./pages/Profile";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <NavBar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:id" element={<ProjectDetails />} />
                  <Route path="/dao" element={<DAO />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
