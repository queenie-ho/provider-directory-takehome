import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProvider } from '../api';
import type { Provider } from '../types';

function ProviderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProvider(id)
      .then(data => {
        setProvider(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (!provider) return <div style={{ padding: '20px' }}>Not found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/')}>← Back</button>
      <h1>{provider.name}</h1>
      <h2>{provider.title}</h2>
      <p><strong>Location:</strong> {provider.location}</p>
      <p><strong>Education:</strong> {provider.education}</p>
      <p><strong>Languages:</strong> {provider.languages.join(', ')}</p>
      <p style={{ whiteSpace: 'pre-line', marginTop: '20px' }}>{provider.bio}</p>
    </div>
  );
}

export default ProviderDetailPage;
