import PropTypes from 'prop-types';

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gradient-to-r from-blue-500 to-purple-600", // Default to gradient
    textColor = "text-white",
    className = "",
    ...props
}) {
    // Note: If a specific bgColor (not a gradient) is passed, it will override the default gradient.
    // This logic assumes if bgColor is a gradient, it won't be overridden by a single color class later.
    // For more complex scenarios, className construction might need to be more sophisticated.
    const baseStyle = "px-4 py-2 rounded-lg shadow-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ease-in-out duration-150";
    const hoverStyle = bgColor.includes("gradient") ? "hover:from-blue-600 hover:to-purple-700" : "hover:opacity-90"; // Simple opacity for non-gradient custom bg

    return (
        <button
            className={`${baseStyle} ${bgColor} ${textColor} ${hoverStyle} ${className}`}
            {...props}
            type={type}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string
};
