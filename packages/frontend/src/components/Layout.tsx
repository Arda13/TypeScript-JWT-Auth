import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  useQuery(gql`
    query {
      viewer {
        id
      }
    }
  `);
  return (
    <div className='container mx-auto'>
      <Header></Header>
      {children}
    </div>
  );
}
