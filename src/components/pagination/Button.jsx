import { twMerge } from 'tailwind-merge';

const Button = ({ children, classes = '', ...props }) => {
  return (
    <button
      className={twMerge(
        'flex flex-auto	justify-center items-center text-gray-800 text-base border-b-2 border-transparent sm:text-base select-none disabled:pointer-events-none',
        classes
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
