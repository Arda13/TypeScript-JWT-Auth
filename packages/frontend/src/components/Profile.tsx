import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Header from './shared/Header';
import Button from './shared/Button';

function Stat({ count, label }: { count: number; label: string }) {
  return (
    <div className='text-lg flex items-center'>
      <span className='font-serif text-2xl font-semibold mr-2'>{count}</span>
      {label}
    </div>
  );
}

export default function Profile() {
  const params = useParams<{ id: string }>();
  const { data, loading } = useQuery(
    gql`
      query ProfileQuery($id: ID!) {
        user(id: $id) {
          id
          displayName
          bio
          type
          postsCount
          subscribersCount
          isCurrentlySubscribed
        }
      }
    `,
    {
      variables: {
        id: params.id,
      },
    }
  );

  const [mutate] = useMutation(
    gql`
      mutation ProfieSubsribeMutation($id: ID!) {
        subscribe(user: $id) {
          id
          isCurrentlySubscribed
        }
      }
    `,
    {
      variables: {
        id: params.id,
      },
    }
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-12 bg-gray-200'>
      <div className='flex items-center mb-12'>
        <Header>{data.user.displayName}</Header>
        <div className='flex space-x-6 ml-12'>
          <Stat count={data.user.postsCount} label={'posts'}></Stat>
          <Stat count={data.user.subscribersCount} label={'subscribers'}></Stat>
        </div>
        <div className='flex-1'></div>
        <div>
          {data.user.isCurrentlySubscribed ? (
            <span>SUBSCRIBED</span>
          ) : (
            <Button onClick={() => mutate()}>Subscribe</Button>
          )}
        </div>
      </div>
      <div className='text-gray-800 text-lg'>
        {data.user.bio || 'No user bio found.'}
      </div>
    </div>
  );
}
