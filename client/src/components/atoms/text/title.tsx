import { FC } from 'react';

type TitleProps = {
    children: string;
    className?: string;
};

const Title: FC<TitleProps> = ({ children, className = '' }) => {
    return <h1 className={`text-5xl font-bold text-primary ${className}`}>{children}</h1>;
};

export default Title;
