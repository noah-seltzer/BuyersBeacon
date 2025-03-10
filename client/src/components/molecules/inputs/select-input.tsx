import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { twMerge } from 'tailwind-merge'

interface SelectInputProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
    className?: string;
    error?: string;
    categoryOptionsIsLoading: boolean,
    categtorOptionsError?: FetchBaseQueryError | SerializedError | undefined;
}

const SelectInput: React.FC<SelectInputProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    categoryOptionsIsLoading,
    className = '',
    error
}) => {
    return (
        <div className={twMerge([`space-y-4`, className])}>
            {label && <label htmlFor={name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {
                    categoryOptionsIsLoading ?
                        <option value="">Loading....</option>
                        :
                        <>
                            <option value="">Select a category...</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </>
                }
            </select>
            <span className="text-sm text-destructive mt-1">{error}</span>
        </div>
    );
};

export default SelectInput;
