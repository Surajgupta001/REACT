import {useId, forwardRef} from 'react'
import PropTypes from 'prop-types';

function InputComponent({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
            className='inline-block pl-1 mb-1'
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
}

InputComponent.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string
};

const ForwardedInput = forwardRef(InputComponent);

ForwardedInput.displayName = 'Input';

export default ForwardedInput;