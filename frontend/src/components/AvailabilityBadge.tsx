interface AvailabilityBadgeProps {
  availability: string;
}

function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  const getAvailabilityText = (avail: string): string => {
    switch (avail) {
      case 'tomorrow':
        return 'Available tomorrow';
      case 'next-week':
        return 'Available next week';
      default:
        return 'Check availability';
    }
  };

  const getAvailabilityColor = (avail: string): string => {
    switch (avail) {
      case 'tomorrow':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'next-week':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <span
      className={`
    inline-flex 
    items-center 
    justify-center
    px-5 
    py-2
    text-sm 
    font-medium 
    rounded-full 
    border
    whitespace-nowrap
        ${getAvailabilityColor(availability)}
      `}
    >
      {getAvailabilityText(availability)}
    </span>
  );
}

export default AvailabilityBadge;
