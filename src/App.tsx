import { useEffect, useMemo, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './components/UserList'
import { SortType, Users } from './types'



function App() {
  const [users, setUsers] = useState<Users[]>([])
  const [showColors, setShowColors] = useState(false)
  const[sorted, setSorted] = useState<SortType>('none');
  const [filtered, setFiltered] = useState('');
  const originalUsers = useRef<Users[]>([]);
  
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(response => response.json())
      .then(json => {
        setUsers(json.results);
        originalUsers.current = json.results;
      })
  }, [])
  
  
  
  const handleSorted = (val:SortType) => { 
    
    setSorted(val);
  }
  const handleReset = () => {
    setUsers(originalUsers.current);
    setSorted('none');
    setShowColors(false);
  };

  const filteredUsers = useMemo(()=>{ 
    if(filtered === '') return users;
    return users.filter((user)=>{
      return user.location.country.toLowerCase().includes(filtered.toLowerCase());
    })
  }, [filtered, users])
  
  const sortedUsers = useMemo(() =>{    
    console
    if(sorted ==='none') return filteredUsers;
   const itemSorted = (item: Users) => {
      switch(sorted){
        case 'Country':
          return item.location.country;
        case 'Name':
          return item.name.first;
        case 'LastName':
          return item.name.last;
        default:
          return item.location.country;
      }
   };

    return [...filteredUsers].sort((a, b) => {
      return itemSorted(a).localeCompare(itemSorted(b));
    })
  }, [filteredUsers, sorted]);
  const handleRemove = (id: string) => {
    
    const newUsers = filteredUsers.filter((user) => user.login.uuid !== id);
    setUsers(newUsers);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Test users</h1>
        <div className='actionsBtn'>
          <button onClick={() => setShowColors(!showColors)}>Show colors</button>
          <button onClick={()=>handleSorted('Country')}>{sorted==='none'? 'Ordenar por pais':' No Ordenar Por Pais'}</button>
          <button onClick={handleReset}>Reiniciar  estado</button>
          <input type='text' value={filtered} onChange={(e)=>setFiltered(e.target.value)}/>
        </div>
        </header>
        <main>
        <UserList handleRemove={handleRemove} showColors={showColors} users={sortedUsers} handleSorted={handleSorted} />
        </main>
    </div>
  )
}

export default App
