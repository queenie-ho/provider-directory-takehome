import { useNavigate } from 'react-router-dom';
import type { Provider } from '../types';
import Avatar from './Avatar';
import AvailabilityBadge from './AvailabilityBadge';
import { ArrowRight } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

function ProviderCard({ provider }: ProviderCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/provider/${provider.id}`);
  };

  // Truncate bio intelligently - stop at sentence or 180 chars
  const truncateBio = (text: string, maxLength: number = 180): string => {
    if (text.length <= maxLength) return text;
    
    const truncated = text.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastPeriod > maxLength - 50) {
      return text.substring(0, lastPeriod + 1);
    }
    
    return text.substring(0, lastSpace) + '...';
  };

  const truncatedBio = truncateBio(provider.bio);

  return (
      <div
  onClick={handleClick}
  className="
    bg-white 
    shadow-sm
    w-full
    hover:shadow-md
    hover:border-purple-200
    p-6
    flex flex-col
  "
>
  {/* Header */}
  <div className="flex items-start gap-5 mb-4">
    <Avatar name={provider.name} size="md" imageUrl={provider.avatarUrl} />
    <div className="flex-1 min-w-0">
      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-purple-700 transition-colors">
  {provider.name}
</h3>
<p className="text-base text-gray-500 leading-snug mt-1">
  {provider.title}
</p>
    </div>
  </div>

  {/* Bio */}
  <p className="text-gray-500 text-[15px] leading-relaxed mb-4">
    {truncatedBio}
  </p>

  {/* Availability badge */}
  <div className="flex justify-start">
    <AvailabilityBadge availability={provider.availability} />
  </div>
</div>

      
  );
}

export default ProviderCard;