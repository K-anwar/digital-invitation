import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import Analytics from '@/components/common/Analytics';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingScreen from '@/components/common/LoadingScreen';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const InvitationPage = lazy(() => import('@/pages/InvitationPage'));
const RSVPPage = lazy(() => import('@/pages/RSVPPage'));
const CheckinPage = lazy(() => import('@/pages/CheckinPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));

function App() {
  return (
    <HashRouter>
      <Analytics />
      <ErrorBoundary>
        <AuthProvider>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:slug/admin" element={<AdminPage />} />
              <Route path="/:slug/invitation" element={<InvitationPage />} />
              <Route path="/:slug/rsvp" element={<RSVPPage />} />
              <Route path="/:slug/checkin" element={<CheckinPage />} />
              <Route path="/:slug" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;