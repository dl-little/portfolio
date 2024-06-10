export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props}>
            {message}
        </p>
    ) : null;
}
