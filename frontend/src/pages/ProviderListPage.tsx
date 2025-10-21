import { useEffect, useState } from 'react';
import { fetchProviders } from '../api';
import type { Provider } from '../types';

function ProviderListPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders()
      .then(data => {
        setProviders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Provider Directory</h1>
      <p>Found {providers.length} providers</p>
      <div>
        {providers.map(provider => (
          <div key={provider.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            marginBottom: '10px',
            borderRadius: '8px'
          }}>
            <h3>{provider.name}</h3>
            <p>{provider.title}</p>
            <p>{provider.bio.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderListPage;
