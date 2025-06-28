import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import PanelCrearTeam from '../components/PanelCrearTeam.jsx';
import PanelEditarTeam from '../components/PanelEditarTeam.jsx';

const HomePage = ({}) => {

  const navigate = useNavigate();
  const[teams, setTeams] = useState([]);
  const [panel, setPanel] = useState(null); // 'editarTeam' || 'crearTeam' || 'agregarPokemon' || 'editarPokemon'
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchTeams = async () =>{
      axios.get('http://localhost:3000/api/team',{headers:{
      Authorization:token
    }}).then(response => {
      setTeams(response.data);
      console.log(response.data);
    })
    .catch(err => {
      console.error('Error fetching teams:', err);
    });}

  useEffect(() => {
    
    if (!token || !user) {
      navigate('/login');
    }

    fetchTeams();

  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login')
  }

  const handleRemoveTeam = (teamId) => {
    axios.delete(`http://localhost:3000/api/team/${teamId}`, {
      headers: {Authorization: token}
    }).then(response => {
      if (response.status === 200) {
        fetchTeams();
      }
    }).catch(err => {
      console.error('Error deleting team:', err);
    });
  }


  return (
    
    <div className='min-h-screen'>
        <div className='fixed top-0 left-0 h-screen w-[250px] bg-red-800 xl:w-[300px] flex flex-col justify-start items-center pt-10 px-5'>
            <button className='bg-black p-2 text-xl text-white rounded-xl mb-5 self-start cursor-pointer' onClick={handleLogout}>Logout</button>
            <div className='bg-blue-800 p-5 rounded-xl'>
                <h1 className='text-4xl font-bold text-yellow-500'>Pokemon</h1>
                <h3 className='text-xl text-white'>Team Builder</h3>
            </div>
            <div className='mt-10 text-center space-y-5'>
                <h1 className='text-3xl font-bold text-white mb-10'>Tus equipos:</h1>
                {teams.length > 0 ? (
                    teams.map((team, index) => (
                      <div>
                        <div key={index} className='flex items-center justify-between w-full'>
                            <p className='text-xl font-bold text-white'>{team.name}</p>
                            <button className='cursor-pointer px-3 py-1 bg-black/20 rounded-lg' onClick={()=>handleRemoveTeam(team.id)}>X</button>
                        </div>
                        {
                        team.pokemonXTeams && team.pokemonXTeams.length > 0 ?
                        (<div className='bg-gray-200/50 rounded p-3 mt-2 grid grid-cols-6 gap-2 cursor-pointer' onClick={()=>{setPanel('editarTeam'); setSelectedTeam(team)}}>
                          {team.pokemonXTeams.map((pokemonXTeam, index) =>(
                            <div key={index} className='flex flex-col items-center justify-center'>
                              <img src={`http://localhost:3000${pokemonXTeam.pokemon.imageUrl}`} alt={pokemonXTeam.pokemon.name} />
                            </div>
                          ))}
                        </div>) : (<div className='flex items-center justify-center cursor-pointer' onClick={()=>{setPanel('editarTeam'); setSelectedTeam(team)}}><h1 className='bg-gray-200 py-1 px-2 rounded-lg'>+</h1></div>)
                        }
                      </div>
                        
                    ))
                ) : (
                    <p className='text-xl font-bold text-white'>No tienes equipos</p>
                )}
                <button className='text-xl bg-gray-200 rounded-xl p-2 cursor-pointer mt-5' onClick={()=>setPanel('crearTeam')}>Agregar equipo</button>
            </div>
        </div>
        <div className='ml-[250px] xl:ml-[300px] min-h-screen'>
          {panel==null && (<div className='h-screen flex justify-center items-center'>
              <h1 className='text-3xl'>Selecciona un equipo!</h1>
            </div>)}
          {panel == 'crearTeam' && <PanelCrearTeam finishCreate={()=>{setPanel(null); fetchTeams();}}/>}
          {panel == 'editarTeam' && <PanelEditarTeam team={selectedTeam}/>}

        </div>
        </div>
        
    
  )
}

export default HomePage