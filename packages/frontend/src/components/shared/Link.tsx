import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Underline from './Underline';

type Props = {
  to: string;
  children: React.ReactNode;
};
export default function Link({ to, children }: Props) {
  return (
    <RouterLink className='text-green-700 text-lg font-semibold' to={to}>
      <Underline> {children}</Underline>
    </RouterLink>
  );
}
