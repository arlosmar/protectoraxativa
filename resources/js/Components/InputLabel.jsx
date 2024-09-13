export default function InputLabel({ value, className = '', children, ...props }) {

    // block font-medium text-sm text-gray-700
    
    return (
        <label {...props} className={` ` + className}>
            {value ? value : children}
        </label>
    );
}
