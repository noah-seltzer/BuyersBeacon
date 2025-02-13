import { ReactNode } from "react";

// components/molecules/button-container.tsx
interface ButtonContainerProps {
    children: ReactNode
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => {
    return (
        <div className="flex gap-4 mt-6">
            {children}
        </div>
    );
};

export default ButtonContainer;
