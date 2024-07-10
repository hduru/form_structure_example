export interface FormControlTemplate {
    label?: string;
    key: string;
    value?: any;
    disabled?: boolean;
    inputType?: string;
    required?: boolean;
    readonly?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
    email?: boolean;
}