import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import axios from 'axios';
import { useState, useEffect } from 'react';



const PanelEditarTeam = ({teamId, fetchTeams, setPanel, setSelectedPokemonId}) => {

  const [team, setTeam] = useState({});


  const fetchTeam = async () => {
    axios.get(`http://localhost:3000/api/team/${teamId}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(response => {
      setTeam(response.data);
    }).catch(err => {
      console.error('Error fetching team:', err);
    });
  }

  useEffect(() => {
    fetchTeam();
  }, [teamId]);

  const handleRemovePokemonFromTeam = (pokemonXTeamId) => {
    axios.delete(`http://localhost:3000/api/team/pokemon/${pokemonXTeamId}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(response => {
      if (response.status === 200) {
        fetchTeams();
        fetchTeam();
      }
      else{console.error('Error removing pokemon from team:', response.data)}
    }).catch(err => {
      console.error('Error removing pokemon from team:', err);
    });
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-10'>
        <h1 className='text-3xl font-bold'>Team {team.name}</h1>
        <div className='bg-red-800 w-full h-1'/>
        <div className='grid grid-cols-6 gap-2 w-full px-10'>
          {team && team.pokemonXTeams && team.pokemonXTeams.map((pokemonXTeam, index)=>(
            <div className='flex flex-col items-center justify-center' key={index}>
              <img src={`http://localhost:3000${pokemonXTeam.pokemon.imageUrl}`} alt={pokemonXTeam.alias} className='w-full' />
              <h2 className='text-lg font-bold'>{pokemonXTeam.alias}</h2>
              <h2 className='text-lg'>{pokemonXTeam.pokemon.name}</h2>
              <div className='flex items-center justify-center mt-2 gap-10'>
                <button className='text-3xl cursor-pointer' onClick={()=>{handleRemovePokemonFromTeam(pokemonXTeam.id)}}><MdDelete/></button>
                <button className='text-3xl cursor-pointer'><MdModeEdit/></button>
              </div>
            </div>
          ))}
          {team.pokemonXTeams && team.pokemonXTeams.length < 6 && (<div className='w-full h-full flex items-center justify-center'>
            <h1 className='text-7xl font-bold bg-red-800 cursor-pointer rounded-xl p-2 px-3 text-white' onClick={()=>{setPanel('agregarPokemon')}}>+</h1>
            </div>)}
        </div>
    </div>
  )
}

export default PanelEditarTeam