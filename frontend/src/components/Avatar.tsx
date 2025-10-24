interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
}

function Avatar({ name, size = 'md', imageUrl }: AvatarProps) {
  // Get initials from name
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  // Generate consistent color based on name
  const getColorFromName = (name: string): string => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-full h-auto aspect-[3/4] text-2xl',
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${getColorFromName(name)}
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-semibold
        flex-shrink-0
      `}
    >
      {getInitials(name)}
    </div>
  );
}

export default Avatar;