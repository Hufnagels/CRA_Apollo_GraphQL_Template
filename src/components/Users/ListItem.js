import React from 'react'
import { useParams } from "react-router-dom";
import {
  useQuery,
} from "@apollo/client";

//62228c5a6f023f2f67c580e71
import { GET_USER } from "../../app/queries";

const ListItem = () => {
  const { id } = useParams('id');
  const [user, setUser] = React.useState([])
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id: id }
  });

  React.useEffect(() => {
    //console.log('PostsListIndex --> data useEffect')
    if (!data) return
    setUser(data.getUser)
    console.log(data)
  }, [data])

  if (loading) return "Loading...."
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return data
  return (
    <div>
      <h3>ListItem</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default ListItem