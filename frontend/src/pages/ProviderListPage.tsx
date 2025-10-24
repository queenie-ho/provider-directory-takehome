// src/pages/ProviderListPage.tsx
import { useEffect, useState } from 'react';
import { fetchProviders } from '../api';
import type { Provider } from '../types';
import { MapPin } from 'lucide-react';
import ProviderCard from '../components/ProviderCard';
import Loading from '../components/Loading';

export default function ProviderListPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        const data = await fetchProviders();
        setProviders(data);
        setError(null);
      } catch (err) {
        setError('Failed to load providers. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <div className="w-full max-w-3xl px-6 sm:px-8 py-20">
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
    
<div className="w-full bg-white border-b border-gray-200 shadow-sm py-12">
  <div className="max-w-3xl mx-auto w-full px-8">
    <div className="flex flex-col space-y-4 text-left">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Browse our providers
      </h1>
      <p className="text-lg text-gray-600">Mental Wellness</p>
      {/* Icon div wraps only content */}
      <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium w-max">
        <MapPin className="h-4 w-4 text-blue-600" strokeWidth={2} />
        <span>ON</span>
      </div>
    </div>
  </div>
</div>

      {/* Provider List */}
      <div className="w-full max-w-3xl px-6 sm:px-8 py-10">
        {/* aligned with card left edge */}
        <p className="text-sm text-gray-600 font-medium mb-8 text-left">
          {providers.length} {providers.length === 1 ? 'provider' : 'providers'} in Ontario
        </p>

        <div className="flex flex-col gap-2 items-center">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {providers.length === 0 && !loading && (
          <div className="text-gray-500 text-lg mt-16">No providers found</div>
        )}
      </div>
    </div>
  );
}