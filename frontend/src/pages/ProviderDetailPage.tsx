import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProvider } from '../api';
import type { Provider } from '../types';
import { ChevronRight, MapPin, GraduationCap, Globe, ChevronUp } from 'lucide-react';

function ProviderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await fetchProvider(id);
        setProvider(data);
        setError(null);
      } catch (err) {
        setError('Failed to load provider details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Provider not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Back to Providers
          </button>
        </div>
      </div>
    );
  }

  const bioSections = provider.bio.split('\n').filter(s => s.trim());
  const shortBio = bioSections[0] || provider.bio.substring(0, 150);
  const fullBio = provider.bio;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Mental Wellness
            </button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {provider.name}, {provider.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* === Left Column (Image) === */}
        <div className="w-full md:w-[300px] flex-shrink-0 justify-items-center">
          <div className="overflow-hidden shadow bg-white w-[300px] h-[350px]">
            {provider.avatarUrl ? (
              <img
                src={provider.avatarUrl}
                alt={`${provider.name} - ${provider.title}`}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center">
                <span className="text-white text-6xl font-bold">
                  {provider.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* === Right Column (Details) === */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Section 1: Name + Bio */}
          <div className="bg-white shadow-sm p-6 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-gray-900">{provider.name}, {provider.title}</h1>
              <p className="text-base text-gray-700">Psychologist</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                {isExpanded ? fullBio : shortBio}
              </p>
              {bioSections.length > 1 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors"
                >
                  {isExpanded ? 'Read less' : 'Read more'}
                  <ChevronUp
                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Section 2: Provider Details + Button */}
          <div className="bg-white shadow-sm flex flex-col p-4 gap-6">
            <div className="flex flex-col gap-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center shadow-sm flex-shrink-0 rounded-md">
                  <MapPin className="h-5 w-5 text-gray-500" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-gray-900 font-medium text-sm">{provider.location}</p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center shadow-sm flex-shrink-0 rounded-md">
                  <GraduationCap className="h-5 w-5 text-gray-500" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Education</p>
                  <p className="text-gray-900 font-medium text-sm">{provider.education}</p>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center shadow-sm flex-shrink-0 rounded-md">
                  <Globe className="h-5 w-5 text-gray-500" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Languages</p>
                  <p className="text-gray-900 font-medium text-sm">
                    {provider.languages.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Book Appointment Button */}
            <div>
              <button
                onClick={() => console.log('Book appointment for:', provider.name)}
                className="w-full bg-purple-900 hover:bg-purple-800 text-white h-12 px-8 rounded-full text-base font-semibold transition-colors"
              >
                Book with us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderDetailPage;