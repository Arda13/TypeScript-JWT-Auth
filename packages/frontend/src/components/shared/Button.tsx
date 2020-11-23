import React from 'react';

type Props = {
  children: React.ReactNode;
} & React.ComponentProps<'button'>;

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className='text-green-700 bg-transparent hover:bg-white transition duration-150 border border-green-700 focus:outline-none px-5 py-2 text-lg font-semibold'
      {...props}
    >
      {children}
    </button>
  );
}
