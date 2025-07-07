import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TiTick } from "react-icons/ti";


const UserAdminPageComponent = ({user, handleGiveAdmin, handleRemoveAdmin, fetchUsers}) => {

    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState('');
    const [successPasswordChange, setSuccessPasswordChange] = useState(false);

    const token = localStorage.getItem('token');



    const handleChangePassword = async (userId) =>{
        if(!password || password.trim() === ''){
            setPasswordError(true);
            setTimeout(() => {
                setPasswordError(false);
            }, 2000);
            return;
        }
        axios.put(`http://localhost:3000/api/user/password/${user.id}`,{newPassword:password},{headers:{Authorization:token}}).then(response => {
            if(response.status === 200){
                fetchUsers();
                setSuccessPasswordChange(true);
                setPasswordError(false);
                setPassword('');
                setTimeout(() => {
                    setSuccessPasswordChange(false);
                }, 2000);
            }}).catch(err => {
                console.error('Error changing password:', err);
                setPasswordError(true);
            })
    }

  return (
    <div className="bg-gray-200 p-4 flex items-center justify-between">
                
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <div className="flex items-center gap-5">
                        <p>{user.isAdmin ? 'Admin' : 'User'}</p>
                        <button onClick={user.isAdmin ? ()=>handleRemoveAdmin(user.id) : ()=>handleGiveAdmin(user.id)} className={`${user.isAdmin? 'bg-red-500':'bg-green-500'} rounded p-1 text-white cursor-pointer`}>{user.isAdmin ? 'Quitar admin':'Dar admin'}</button>
                    </div>
                    <div className="flex items-center gap-5">
                        <input type="text" className="bg-white rounded p-1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button onClick={handleChangePassword} className="bg-blue-500 rounded p-1 text-white cursor-pointer">Cambiar contraseña</button>
                        {passwordError && <p className="text-red-500">Error al cambiar la contraseña</p>}
                        {successPasswordChange && <TiTick className="text-green-500" size={20} />}
                    </div>
            </div>
  )
}

export default UserAdminPageComponent