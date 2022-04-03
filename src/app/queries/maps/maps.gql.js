import {
  gql
} from "@apollo/client";

export const GET_MAPS = gql`
  query GetMaps($search: String) {
    getMaps(search: $search) {
      maps {
        _id
        title
        description
        originalMap
        currentMap
        mapimage
        editinghistory {
          editedMap
          updated
        }
      }
    }
  }
`;
