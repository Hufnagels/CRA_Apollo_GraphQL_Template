import React, { memo } from 'react'
import { useLazyQuery, } from "@apollo/client";

// Material
import {
  Box,
  Grid,
  CircularProgress,
} from '@mui/material'
import { useTheme } from '@mui/material/styles';

// Custom
import PostsListIndexItem from './PostsListIndexItem';
import {GET_POSTS} from "../../app/queries";
import PostAdd from './PostAdd';
import SearchBar from '../SearchBar';

const PostsListIndex = () => {
//console.log('PostsListIndex'
  const theme = useTheme();
  const [title, setTitle] = React.useState('Posts list')
  const [openDialog, setOpenDialog] = React.useState(false)
  const [search,setSearch] = React.useState(null)

  const [posts,setPosts] = React.useState([])
  
  const [page, setPage] = React.useState(1);
  const [totalpage, setTotalPage] = React.useState(1)
  const [perpage, setPerpage] = React.useState(10)
  const [visiblePN, setVisiblePN] = React.useState(false)

  const [
    fetchFilteredPosts,
    {data, loading, error, called, refetch}
  ] = useLazyQuery(GET_POSTS, {
    variables:{
      search,
      page:page,
      limit:perpage
    }
  })

  React.useEffect(() => {
    if(!data) return
    setPosts(data.getPosts.posts)
    setTotalPage(data.getPosts.totalPages)
    if (data.getPosts.posts.length > 0) 
      setVisiblePN(true)
    else
      setVisiblePN(false)
  },[data])

  React.useEffect(() => {
//console.log('PostsListIndex --> search useEffect', page, perpage, totalpage, called, data)
    fetchFilteredPosts({variables:{
      search,
      page:page,
      limit:perpage
    }}).then((res) => {
  //console.log('res', res)
      setPosts(res.data.getPosts.posts)
      setTotalPage(res.data.getPosts.totalPages)
      setPage(res.data.getPosts.currentPage)
    })
    if(!search) return
  },[search, page, perpage, totalpage])

  if (loading) return <CircularProgress color="secondary" />

  return (
    <React.Fragment>
      <Box style={{padding:'0rem'}}>
        <SearchBar
          title={title}
          fn={fetchFilteredPosts}
          search={search}
          setSearch={setSearch}
          page={page} 
          setPage={setPage}
          perpage={perpage}
          setPerpage={setPerpage}
          totalpage={totalpage}
          setData={setPosts}
          visiblePN={visiblePN}
          refetch={refetch}
          active={openDialog}
          setOpenDialog={setOpenDialog}
          addComponent={
            <PostAdd onClick={setOpenDialog} active={openDialog} refetch={refetch} setMaps={setPosts} />
          }
        />
        <Grid container spacing={{ sm: 1, md: 1 }} >
          {posts && posts.map((post, idx) => {
            return <PostsListIndexItem post={post} key={idx} title={post.title}/>
          })}
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default memo(PostsListIndex)