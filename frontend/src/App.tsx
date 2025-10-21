import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProviderListPage from './pages/ProviderListPage';
import ProviderDetailPage from './pages/ProviderDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProviderListPage />} />
        <Route path="/provider/:id" element={<ProviderDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
