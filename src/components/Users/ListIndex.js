import React, { memo } from 'react'
import { useLazyQuery, } from "@apollo/client";
import { useLocation } from "react-router-dom"
import _ from "lodash"

// Material
import {
  Box,
  Grid,
  CircularProgress,
} from '@mui/material'
import { useTheme } from '@mui/material/styles';

// Custom
import ListIndexItem from './ListIndexItem';
import { GET_USERS } from "../../app/queries";
import Add from './Add';
import SearchBar from '../Layout/SearchBar';

const ListIndex = () => {
  //console.log('ListIndex')
  const location = useLocation();

  const theme = useTheme();
  const [title, setTitle] = React.useState(_.capitalize(location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length)) + ' list')
  const [openDialog, setOpenDialog] = React.useState(false)
  const [search, setSearch] = React.useState(null)

  const [users, setUsers] = React.useState([])

  const [page, setPage] = React.useState(1);
  const [totalpage, setTotalPage] = React.useState(1)
  const [perpage, setPerpage] = React.useState(10)
  const [visiblePN, setVisiblePN] = React.useState(false)

  const [
    fetchFilteredUsers,
    { data, loading, error, refetch }
  ] = useLazyQuery(GET_USERS, {
    variables: {
      search,
      page: page,
      limit: perpage
    }
  })

  React.useEffect(() => {
    if (!data) return
    setUsers(data.getUsers.users)
    setTotalPage(data.getUsers.totalPages)
    if (data.getUsers.users.length > 0)
      setVisiblePN(true)
    else
      setVisiblePN(false)
  }, [data])

  React.useEffect(() => {
    //console.log('ListIndex --> search useEffect', page, perpage, totalpage, data)
    if (!page) return
    fetchFilteredUsers({
      variables: {
        search,
        page: page,
        limit: perpage
      }
    }).then((res) => {
      //console.log('res', res)
      setUsers(res.data.getUsers.users)
      setTotalPage(res.data.getUsers.totalPages)
      setPage(res.data.getUsers.currentPage)
    })
    if (!search) return

  }, [search, page, perpage, totalpage])

  if (loading) return <CircularProgress color="secondary" />

  return (
    <React.Fragment>
      <Box style={{ padding: '0rem' }}>
        <SearchBar
          title={title}
          fn={fetchFilteredUsers}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          perpage={perpage}
          setPerpage={setPerpage}
          totalpage={totalpage}
          setData={setUsers}
          visiblePN={visiblePN}
          refetch={refetch}
          active={openDialog}
          setOpenDialog={setOpenDialog}
          addComponent={
            <Add onClick={setOpenDialog} active={openDialog} refetch={refetch} setMaps={setUsers} />
          }
        />
        <Grid container spacing={{ sm: 1, md: 1 }} >
          {users && users.map((user, idx) => {
            return <ListIndexItem data={user} key={idx} title={user.username} />
          })}
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default memo(ListIndex)