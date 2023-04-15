import { SortType, Users } from "../types";

interface Props {
  users: Users[];
  showColors: boolean;
  handleRemove: (id: string) => void;
  handleSorted: (val: SortType) => void;
}

const UserList = ({users, showColors, handleRemove, handleSorted}:Props) => {
  return (
    <table width='100%' className={showColors ? 'colorsOdd colorsEven': ''}>
      <thead >
        <tr>
          <td>Foto</td>
          <td onClick={()=>handleSorted('Name')} className="crosshair">Nombre</td>
          <td onClick={()=>handleSorted('LastName')} className="crosshair">Apellido</td>
          <td onClick={()=>handleSorted('Country')} className="crosshair">Pais</td>
          <td>Acciones</td>
        </tr>
      </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.login.uuid}>
            {
              <td>
                <img src={user.picture.thumbnail} />
              </td>
            }
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={()=>handleRemove(user.login.uuid)}>remove</button>
            </td>
        </tr>
      )
      )}
    </tbody>

    </table>
  )
}

export default UserList