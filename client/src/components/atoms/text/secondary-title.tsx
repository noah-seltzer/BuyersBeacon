import { FC } from 'react';

type SecondaryTitleProps = {
    children: string;
    className?: string;
};

const SecondaryTitle: FC<SecondaryTitleProps> = ({ children, className = '' }) => {
    return <h1 className={`text-2xl font-bold ${className} text-tertiary`}>{children}</h1>;
};

export default SecondaryTitle;
