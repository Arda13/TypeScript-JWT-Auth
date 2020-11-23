import React from 'react';

type Props = {
  children: React.ReactNode;
};
export default function Header({ children }: Props) {
  return <h1 className='font-serif font-semibold text-4xl'>{children}</h1>;
}
