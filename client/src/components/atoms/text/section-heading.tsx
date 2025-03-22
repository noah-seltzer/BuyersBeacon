import { FC, ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  icon?: ReactNode;
  rightContent?: ReactNode;
  underline?: boolean;
  className?: string;
}

export const SectionHeading: FC<SectionHeadingProps> = ({ 
  title, 
  icon, 
  rightContent,
  underline = true,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <h2 className="text-xl font-semibold relative flex items-center gap-2">
        {icon && (
          <div className="p-1.5 bg-primary/10 rounded-full">
            {icon}
          </div>
        )}
        <span>{title}</span>
        {underline && (
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></div>
        )}
      </h2>
      {rightContent && (
        <div>{rightContent}</div>
      )}
    </div>
  );
};

export default SectionHeading;