
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import SmartRecoveryCoach from "./pages/SmartRecoveryCoach";
import WellnessEntry from "./pages/WellnessEntry";
import WellnessLogs from "./pages/WellnessLogs";
import RecoveryAssessment from "./pages/RecoveryAssessment";
import RecoveryLogs from "./pages/RecoveryLogs";
import StrengthTracker from "./pages/StrengthTracker";
import FitnessTests from "./pages/FitnessTests";
import Education from "./pages/Education";
import Trends from "./pages/Trends";
import ProfileSettings from "./pages/ProfileSettings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/smart-recovery-coach" element={<SmartRecoveryCoach />} />
      <Route path="/wellness-entry" element={<WellnessEntry />} />
      <Route path="/wellness-logs" element={<WellnessLogs />} />
      <Route path="/recovery-assessment" element={<RecoveryAssessment />} />
      <Route path="/recovery-logs" element={<RecoveryLogs />} />
      <Route path="/strength-tracker" element={<StrengthTracker />} />
      <Route path="/fitness-tests" element={<FitnessTests />} />
      <Route path="/education" element={<Education />} />
      <Route path="/trends" element={<Trends />} />
      <Route path="/profile-settings" element={<ProfileSettings />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
