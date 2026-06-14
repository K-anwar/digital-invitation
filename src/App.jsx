import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvitationPage from './pages/InvitationPage';
import RSVPPage from './pages/RSVPPage';
import CheckinPage from './pages/CheckinPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:slug" element={<HomePage />} />
        <Route path="/:slug/invitation" element={<InvitationPage />} />
        <Route path="/:slug/rsvp" element={<RSVPPage />} />
        <Route path="/:slug/checkin" element={<CheckinPage />} />
        <Route path="*" element={<Navigate to="/wedding-romantic" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;