interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    info?: string;
    error?: string;
    size?: 'small' | 'default';
    iconRight?: React.ReactNode;
    iconDisabled?: boolean;
    disabled?: boolean;
    required?: boolean;
    maxLength?: number;
    containerClassName?: string;
    onSubmitFunction?: (value: string) => void;
    showCount?: boolean;
    numberOfLines?: number;
    maxNumberOfLines?: number;
}

export type { TextAreaProps };
