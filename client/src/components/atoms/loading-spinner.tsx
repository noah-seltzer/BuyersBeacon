import { ClimbingBoxLoader } from "react-spinners";

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${className}`}>
      <ClimbingBoxLoader size={35} color="#24dbb7" />
    </div>
  );
}; 