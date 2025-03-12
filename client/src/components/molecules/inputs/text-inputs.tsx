interface TextInputProps {
    label?: string;
    name: string;
    placeholder?: string;
    className?: string;
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    placeholder,
    className = '',
    onChange,
    error,
    value
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && <label htmlFor={name} className="text-sm font-medium text-foreground">{label}</label>}
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-surface/20 bg-background text-foreground px-3 py-2 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <span className="text-sm text-red-500" >{error}</span>
        </div>
    );
};

export default TextInput;