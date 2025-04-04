import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { twMerge } from 'tailwind-merge';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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
        <div className={twMerge(`relative`, className)}>
            {label && <label htmlFor={name} className="text-sm font-medium leading-none block mb-2">{label}</label>}
            
            <div className="relative">
                <select
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className={cn(
                        "appearance-none h-[48px] w-full rounded-xl border bg-background px-4 py-2 text-sm",
                        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50 pr-10",
                        error ? "border-red-500 focus-visible:ring-red-500" : "border-input focus-visible:ring-ring"
                    )}
                >
                    {categoryOptionsIsLoading ? (
                        <option value="">Loading...</option>
                    ) : (
                        <>
                            <option value="">All Categories</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </>
                    )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
            
            {error && (
                <div className="flex items-center mt-2">
                    <span className="text-sm font-medium text-red-600 dark:text-red-500">{error}</span>
                </div>
            )}
        </div>
    );
};

export default SelectInput;
