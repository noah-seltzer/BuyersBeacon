import { FC } from 'react';

type SubTitleProps = {
    children: string;
    className?: string;
};

const SubTitle: FC<SubTitleProps> = ({ children, className = '' }) => {
    return <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>;
};

export default SubTitle;
