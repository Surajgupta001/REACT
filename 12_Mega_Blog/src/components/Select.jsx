import {useId, forwardRef} from 'react'
import PropTypes from 'prop-types';

function SelectComponent({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block pl-1 mb-1'>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

SelectComponent.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
    className: PropTypes.string
};

const ForwardedSelect = forwardRef(SelectComponent);
ForwardedSelect.displayName = 'Select';

export default ForwardedSelect;