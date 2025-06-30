import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const PanelCrearTeam = ({finishCreate}) => {

    const [teamName, setTeamName] = useState('');
    const [errorEmpty, setErrorEmpty] = useState(false);

    const handleCreateTeam = () => {
        if (teamName.trim() === '') {
            setErrorEmpty(true);
            setTimeout(() => {
                setErrorEmpty(false);
            }, 2000);
            return;
        }
        const token = localStorage.getItem('token');
        axios.post('http://localhost:3000/api/team', { name: teamName }, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            if (res.status === 200) {
                finishCreate();
            } else {
                setErrorEmpty(true);
                setTimeout(() => {
                    setErrorEmpty(false);
                }, 2000);
            }
        }).catch(err => {
            console.log(err);
            setErrorEmpty(true);
        })
    }


  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
        <h1 className='text-3xl'>Crea un equipo!</h1>
        <label>Nombre del team:</label>
        <input type="text" className='border border-gray-300 rounded-lg p-2' value={teamName} onChange={(e)=>setTeamName(e.target.value)}/>
        <button className='bg-blue-200 p-3 rounded-xl cursor-pointer' onClick={handleCreateTeam}>Crear team</button>
        <button className='bg-gray-200 p-3 rounded-xl cursor-pointer' onClick={finishCreate}>Cancelar</button>
        {errorEmpty && <p className='text-red-500'>El nombre del equipo no puede estar vacío</p>}

    </div>
  )
}

export default PanelCrearTeam