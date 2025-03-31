import { FC, ReactNode } from 'react';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  className?: string;
}

export const PageHeading: FC<PageHeadingProps> = ({ 
  title, 
  subtitle, 
  rightContent,
  className = ''
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-lg mt-2">{subtitle}</p>
          )}
        </div>
        {rightContent && (
          <div className="flex items-center">{rightContent}</div>
        )}
      </div>
    </div>
  );
};

export default PageHeading;