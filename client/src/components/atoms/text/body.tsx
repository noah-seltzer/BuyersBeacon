import { FC } from 'react';

type BodyTextProps = {
    children: string;
    className?: string;
};

const BodyText: FC<BodyTextProps> = ({ children, className = '' }) => {
    return <h1 className={` ${className}`}>{children}</h1>;
};

export default BodyText;
