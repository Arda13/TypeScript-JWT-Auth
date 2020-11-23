import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Underline({ children }: Props) {
  return (
    <span className='border-b-2 hover:border-current border-transparent pb-1'>
      {children}
    </span>
  );
}
