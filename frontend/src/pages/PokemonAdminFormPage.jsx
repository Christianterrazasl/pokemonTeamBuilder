import { useNavigate, useParams } from "react-router-dom"
import {useState, useEffect} from "react";
import axios from "axios";

export default function PokemonAdminFormPage() {

    const navigate = useNavigate();
    const {pokemonId} = useParams();

    const [pokemon, setPokemon] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState('');
    const [typeId, setTypeId] = useState(null);
    const [type2Id, setType2Id] = useState(null);
    const [baseStats, setBaseStats] = useState({hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0});
    const [allAttacks, setAllAttacks] = useState([]);
    const [selectedAttacks, setSelectedAttacks] = useState([]);
    const [allTypes, setAllTypes] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [error, setError] = useState(false);


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('imageUrl', imageFile);
        formData.append('name', name);
        formData.append('typeId', typeId);
        formData.append('type2Id', type2Id);
        formData.append('baseStats', JSON.stringify(baseStats));
        formData.append('attacks', JSON.stringify(selectedAttacks));
        formData.append('hp', baseStats.hp);
        formData.append('attack', baseStats.attack);
        formData.append('defense', baseStats.defense);
        formData.append('specialAttack', baseStats.specialAttack);
        formData.append('specialDefense', baseStats.specialDefense);
        formData.append('speed', baseStats.speed);
        if(pokemonId){
            await axios.put(`http://localhost:3000/api/pokemon/${pokemonId}`, formData).then(response => {
                console.log('Pokemon updated:', response.data);
                navigate('/admin');

            }).catch(err => {
                console.error('Error updating pokemon:', err);
                setError(true);
            });
        }else{
            await axios.post('http://localhost:3000/api/pokemon', formData).then(response => {
                console.log('Pokemon created:', response.data);
                navigate('/admin');
            }).catch(err => {
                console.error('Error creating pokemon:', err);
                setError(true);
            })
        }
    }


    useEffect(() => {
        if(pokemonId){
            axios.get(`http://localhost:3000/api/pokemon/${pokemonId}`).then(response => {
                setPokemon(response.data);
                console.log('Pokemon fetched:', response.data);
            }).catch(err => {
                console.error('Error fetching pokemon:', err);
            });
        }

        axios.get('http://localhost:3000/api/attack').then(response => {
            setAllAttacks(response.data);
            console.log('Attacks fetched:', response.data);
        }).catch(err => {
            console.error('Error fetching attacks:', err);
        });

        axios.get('http://localhost:3000/api/type').then(response => {
            setAllTypes(response.data);
            console.log('Types fetched:', response.data);
        }).catch(err => {
            console.error('Error fetching types:', err);
        });

        axios.get('http://localhost:3000/api/pokemon').then(response => {
            setAllPokemons(response.data);
            console.log('Pokemons fetched:', response.data);
        }).catch(err => {
            console.error('Error fetching pokemons:', err);
        });
    }, []);


    return (
        <div className="p-10 px-20 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold bg-red-800 p-3 text-white rounded-xl mb-5">Pokemon Admin Form</h1>
            <div className="flex items-center gap-5">
                <img src={pokemon? `http://localhost:3000${pokemon.imageUrl}` : "http://localhost:3000/uploads/pokeball.png"} alt={pokemon? pokemon.name : 'pokeball'} className="w-1/4"/>
                <input type="file" className="bg-gray-300 p-3 rounded-xl cursor-pointer" onChange={(e) => setImageFile(e.target.files[0])}/>
            </div>
            <div className="flex items-center gap-5 my-5">
                <label>Nombre:</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="border p-1 rounded-lg"/>
            </div>
            <div className="flex items-center gap-5 my-5">
                <label htmlFor="type1">Tipo 1: </label>
                <select name="type1" id="type1" className="border rounded-lg p-1" value={typeId} onChange={(e) => setTypeId(e.target.value)}>
                    <option value=''></option>
                    {allTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
                <label htmlFor="type2">Tipo 2: </label>
                <select name="type2" id="type2" className="border rounded-lg p-1 overflow-y-scroll" value={type2Id} onChange={(e) => setType2Id(e.target.value)}>
                    <option value=''></option>
                    {allTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-stretch gap-5 my-5">
                <div className="my-5 w-[200px] bg-gray-200 p-2 rounded-lg space-y-2">
                    <h1 className="text-2xl font-bold">Stats</h1>
                    <div className="flex flex-col items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <label>HP :</label>
                            <input type="number" value={baseStats.hp} onChange={(e) => setBaseStats({...baseStats, hp: e.target.value})} className="bg-white p-1 w-1/2" min={0}/>    
                        </div>
                        <div className="flex items-center gap-2">
                            <label>AT :</label>
                            <input type="number" value={baseStats.attack} onChange={(e) => setBaseStats({...baseStats, attack: e.target.value})} className="bg-white p-1 w-1/2" min={0}/>    
                        </div>
                        <div className="flex items-center gap-2">
                            <label>DF :</label>
                            <input type="number" value={baseStats.defense} onChange={(e) => setBaseStats({...baseStats, defense: e.target.value})} className="bg-white p-1 w-1/2" min={0}/>    
                        </div>
                        <div className="flex items-center gap-2">
                            <label>SA :</label>
                            <input type="number" value={baseStats.specialAttack} onChange={(e) => setBaseStats({...baseStats, specialAttack: e.target.value})} className="bg-white p-1 w-1/2" min={0}/>    
                        </div>
                        <div className="flex items-center gap-2">
                            <label>SD :</label>
                            <input type="number" value={baseStats.specialDefense} onChange={(e) => setBaseStats({...baseStats, specialDefense: e.target.value})} className="bg-white p-1 w-1/2" min={0}/>    
                        </div>
                        <div className="flex items-center gap-2">
                            <label>SP :</label>
                            <input type="number" value={baseStats.speed} onChange={(e) => setBaseStats({...baseStats, speed: e.target.value})} className="bg-white p-1 w-1/2" min={0}/>    
                        </div>

                    </div>
                </div>
                <div className="my-5 bg-gray-200 p-2 rounded-lg space-y-2 overflow-y-scroll">
                    <h1 className="text-2xl font-bold">Attacks</h1>
                    {allAttacks.map(attack =>(<div key={attack.id} className="flex items-center justify-between gap-10">
                        <p>{attack.name}</p><input type="checkbox" className=""/>
                    </div>))}

                </div>
                
                <div className="my-5 p-2 flex flex-col gap-5 items-center justify-center">
                        <button className="rounded-xl bg-blue-300 p-3" onClick={handleSubmit}>Guardar</button>
                        <button className="rounded-xl bg-gray-300 p-3" onClick={() => navigate('/admin')}>Cancelar</button>
                        {error && <p className="text-red-500">Error al crear pokemon</p>}
                </div>

            </div>




        </div>
    )
}