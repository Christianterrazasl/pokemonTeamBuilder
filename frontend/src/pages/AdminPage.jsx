import axios from "axios";
import { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAdminPageComponent from "../components/UserAdminPageComponent";

export default function AdminPage(){

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [items, setItems] = useState([]);
    

    const fetchUsers = async ()=>{
        axios.get('http://localhost:3000/api/user',{headers:{Authorization:token}}).then(response => {
            setUsers(response.data);
        }).catch(err => {
            console.error('Error fetching users:', err);
        });
    }

    const fetchPokemons = async ()=>{
        axios.get('http://localhost:3000/api/pokemon').then(response => {
            setPokemons(response.data);
        }).catch(err => {
            console.error('Error fetching pokemons:', err);
        });
    }

    const fetchItems = async ()=>{
        axios.get('http://localhost:3000/api/item').then(response => {
            setItems(response.data);
        }).catch(err => {
            console.error('Error fetching items:', err);
        });
    }

    const handleGiveAdmin = async (userId) =>{
        axios.put(`http://localhost:3000/api/user/admin/give/${userId}`,{},{headers:{Authorization:token}}).then(response => {
            if(response.status === 200){
                fetchUsers();
            }
        }).catch(err => {
            console.error('Error giving admin:', err);
        });}

    const handleRemoveAdmin = async (userId) =>{
        axios.put(`http://localhost:3000/api/user/admin/remove/${userId}`,{},{headers:{Authorization:token}}).then(response => {
            if(response.status === 200){
                fetchUsers();
            }
        }).catch(err => {
            console.error('Error removing admin:', err);
        });}

    const handleRemovePokemon = async (pokemonId) =>{
        axios.delete(`http://localhost:3000/api/pokemon/${pokemonId}`,{headers:{Authorization:token}}).then(response => {
            if(response.status === 200){
                fetchPokemons();
            }
        }).catch(err => {
            console.error('Error removing pokemon:', err);
        });}


    useEffect(()=>{
        if(!user || !token){
            navigate('/notauth');
        }
        fetchUsers();
        fetchPokemons();
        fetchItems();
    },[])

    return(
        <div className="p-10 px-20">
            <h1 className="text-4xl font-bold mb-5">Admin Page</h1>
            <h2 className="text-2xl mb-3">Usuarios</h2>
            <div className="flex flex-col gap-2">
                {users.map(user =><UserAdminPageComponent key={user.id} user={user} handleGiveAdmin={handleGiveAdmin} handleRemoveAdmin={handleRemoveAdmin} fetchUsers={fetchUsers}/>
                )}

                <h1 className="text-2xl mb-5 mt-10">Pokemons</h1>
                <button className="self-start rounded-xl bg-gray-300 p-3 cursor-pointer" onClick={() => navigate('/admin/pokemon')}>Crear pokemon</button>
                <div className="grid grid-cols-3 gap-3 lg:grid-cols-5">
                    {pokemons.map(pokemon => (<div className="bg-gray-200 p-5 rounded-lg shadow-md flex flex-col items-center justify-center gap-3" key={pokemon.id}>
                        <img src={`http://localhost:3000${pokemon.imageUrl}`} alt={pokemon.name} className="w-full"/>
                        <p>{pokemon.name}</p>
                        <div className="flex items-center gap-2">
                            <button className="rounded bg-blue-500 p-1 text-white cursor-pointer">Editar</button>
                            <button className="rounded bg-red-500 p-1 text-white cursor-pointer" onClick={() => handleRemovePokemon(pokemon.id)}>Eliminar</button>
                        </div>

                    </div>))}
                </div>
            </div>
            <div>
                <h1 className="text-2xl mb-5 mt-10">Items</h1>
                <button className="self-start rounded-xl bg-gray-300 p-3 cursor-pointer" onClick={() => navigate('/admin/item')}>Crear item</button>
                <div className="grid grid-cols-3 gap-3 lg:grid-cols-5">
                    {items.map(item => (<div className="bg-gray-200 p-5 rounded-lg shadow-md flex flex-col items-center justify-center gap-3" key={item.id}>
                        <img src={`http://localhost:3000${item.imageUrl}`} alt={item.name} className="w-full"/>
                        <p>{item.name}</p>
                        <div className="flex items-center gap-2">
                            <button className="rounded bg-blue-500 p-1 text-white cursor-pointer">Editar</button>
                            <button className="rounded bg-red-500 p-1 text-white cursor-pointer" onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
                        </div>

                    </div>))}
                </div>
            </div>

        </div>
    )
}