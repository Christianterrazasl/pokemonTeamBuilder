import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const HomePage = ({}) => {

  const navigate = useNavigate();
  const[teams, setTeams] = useState([]);
  const [panel, setPanel] = useState(null); // 'editar' || 'crear'
  const [selectedTeamId, setSelectedTeamId] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user) {
      navigate('/login');
    }

    axios.get('http://localhost:3000/api/team',{headers:{
      Authorization:token
    }}).then(response => {
      setTeams(response.data);
      console.log(response.data);
    })

  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login')
  }



  return (
    
    <div className='min-h-screen'>
        <div className='fixed top-0 left-0 h-screen w-[250px] bg-red-800 xl:w-[300px] flex flex-col justify-start items-center pt-10 px-5'>
            <button className='bg-black p-2 text-xl text-white rounded-xl mb-5 self-start cursor-pointer' onClick={handleLogout}>Logout</button>
            <div className='bg-blue-800 p-5 rounded-xl'>
                <h1 className='text-4xl font-bold text-yellow-500'>Pokemon</h1>
                <h3 className='text-xl text-white'>Team Builder</h3>
            </div>
            <div className='mt-10 text-center'>
                <h1 className='text-3xl font-bold text-white mb-10'>Tus equipos:</h1>
                {teams.length > 0 ? (
                    teams.map((team, index) => (
                        <div key={index} className='mt-5'>
                            <p className='text-xl font-bold text-white'>{team.name}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-xl font-bold text-white'>No tienes equipos</p>
                )}
                <button className='text-xl bg-gray-200 rounded-xl p-2 cursor-pointer mt-5' onClick={()=>setPanel('crear')}>Agregar equipo</button>
            </div>
        </div>
        <div className='ml-[250px] xl:ml-[300px] min-h-screen'>
          {panel==null && (<div className='h-screen flex justify-center items-center'>
              <h1 className='text-3xl'>Selecciona un equipo!</h1>
            </div>)}
          {panel == 'crear' && (<div className='h-screen flex justify-center items-center'>
              <h1 className='text-3xl'>Crea un equipo!</h1>
            </div>)}

        </div>
        </div>
        
    
  )
}

export default HomePage