import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { SatelliteTracking } from "@/components/SatelliteTracking";
import { DataBrowser } from "@/components/DataBrowser";
import { ProcessingPipeline } from "@/components/ProcessingPipeline";
import { AnalyticsCenter } from "@/components/AnalyticsCenter";
import { FileUpload } from "@/components/FileUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-space">
            <AppSidebar />
            <main className="flex-1 relative">
              {/* Global header with sidebar trigger */}
              <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border/50 bg-background/80 backdrop-blur-sm px-6">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <div className="flex-1 flex items-center justify-center">
                  <h1 className="font-mono text-sm text-primary">SATELLITE DATA PIPELINE SYSTEM</h1>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  ONLINE
                </div>
              </header>
              
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tracking" element={<SatelliteTracking />} />
                <Route path="/data" element={<DataBrowser />} />
                <Route path="/pipeline" element={<ProcessingPipeline />} />
                <Route path="/analytics" element={<AnalyticsCenter />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
