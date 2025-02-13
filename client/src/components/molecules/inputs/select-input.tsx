interface SelectInputProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
    className?: string;
    error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    className = '',
    error
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && <label htmlFor={name} className="text-sm font-medium text-foreground">{label}</label>}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="border border-surface/20 bg-background text-foreground px-3 py-2 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span className="text-sm text-red-500">{error}</span>
        </div>
    );
};

export default SelectInput;
