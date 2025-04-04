import LightHouseSVG from "../atoms/icons/light-house";
import SubTitle from "../atoms/text/sub-title";

interface EmptyStateProps {
    iconW?: number;
    iconH?: number;
    primaryText: string;
    className?: string;
}

const EmptyState = ({
    iconH = 70,
    iconW = 70,
    primaryText,
    className = ""
}: EmptyStateProps) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center ${className}`}>
            <LightHouseSVG height={iconH} width={iconW} />
            <SubTitle className="mt-2">{primaryText}</SubTitle>
        </div>
    );
};

export default EmptyState;
