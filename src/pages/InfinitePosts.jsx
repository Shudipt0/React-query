import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchAllPosts } from '../dataFetch/Api'
import { useInView } from 'react-intersection-observer'

const InfinitePosts = () => {
  const {ref, inView} = useInView()
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['allprojects'],
    queryFn: fetchAllPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })


 console.log(data)
// console.log(JSON.stringify(data, null, 2));

 useEffect(() => {
    if (inView ) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className=''>
      {data?.pages?.map((group, i) => (
          group?.data?.length > 0 && (
        <div key={i} className='w-full min-h-screen flex flex-col justify-between ' >
          {group?.data?.map((post) => (
            <p key={post.id}>{post.title}</p>
          ))}
        </div>
          )
      ))}
      {/* <div>
        <button
         ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div> */}
            {/* Invisible trigger element for infinite scroll */}
      <div ref={ref} style={{ height: '1px' }} >
        {isFetchingNextPage && !hasNextPage
            ? 'Loading more...'
          
              : 'Nothing more to load'}
         </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  )
}

export default InfinitePosts