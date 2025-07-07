import React, { use } from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';

const PanelPokemonForm = ({teamId, pokemonXTeamId, setPanel, setSelectedTeamId, fetchTeams}) => {

    const [alias, setAlias] = useState('');
    const [error, setError] = useState(false);
    const [pokemonsSearched, setPokemonsSearched] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPokemonId, setSelectedPokemonId] = useState(null);
    const [pokemon, setPokemon] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [natures, setNatures] = useState([]);
    const [selectedNatureId, setSelectedNatureId] = useState(null);
    const [abilities, setAbilities] = useState([]);
    const [selectedAbilityId, setSelectedAbilityId] = useState(null);
    const [pokemonEvs, setPokemonEvs] = useState({hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0});
    const [pokemonIvs, setPokemonIvs] = useState({hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0});
    const [pokemonAbleAttacks, setPokemonAbleAttacks] = useState([]);
    const [attack1Id, setAttack1Id] = useState(null);
    const [attack2Id, setAttack2Id] = useState(null);
    const [attack3Id, setAttack3Id] = useState(null);
    const [attack4Id, setAttack4Id] = useState(null);

    useEffect(() => {
      if (pokemonXTeamId) {
      axios.get(`http://localhost:3000/api/team/pokemon/${pokemonXTeamId}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(response => {
      const data = response.data;
      setAlias(data.alias || '');
      setSelectedPokemonId(data.pokemonId);
      setSelectedNatureId(data.natureId || null);
      setSelectedItemId(data.objectId || null);
      setSelectedAbilityId(data.abilityId || null);
      setPokemonIvs(data.pokemonIV || {hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0});
      setPokemonEvs(data.pokemonEV || {hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0});
      setAttack1Id(data.attack1Id || null);
      setAttack2Id(data.attack2Id || null);
      setAttack3Id(data.attack3Id || null);
      setAttack4Id(data.attack4Id || null);
    })
    .catch(error => {
      console.error('Error fetching pokemonXTeam:', error);
    });
  }

    },[pokemonXTeamId]);


    useEffect(() => {
      if (selectedPokemonId) {
        axios.get(`http://localhost:3000/api/ability/pokemon/${selectedPokemonId}`)
        .then((response) => {
          setAbilities(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

        axios.get(`http://localhost:3000/api/attack/pokemon/${selectedPokemonId}`)
        .then((response) => {
          setPokemonAbleAttacks(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      }
    },[selectedPokemonId]);


    useEffect(() => {
      axios.get('http://localhost:3000/api/nature')
      .then(response =>{setNatures(response.data);})
    },[]);

    useEffect(() => {
      axios.get('http://localhost:3000/api/item')
      .then(response =>{setItems(response.data);})
    },[]);

    const handleSelectPokemon = (pokemon) => {
      setSelectedPokemonId(pokemon.id);
      setSearchQuery(pokemon.name);
      setPokemonsSearched([]);
    }

    useEffect(() => {
      if (selectedPokemonId) {
        axios.get(`http://localhost:3000/api/pokemon/${selectedPokemonId}`)
        .then((response) => {
          setPokemon(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }, [selectedPokemonId]);


    const handleNameSearch = (name) => {
      if(name.trim().length >= 2){
        axios.get(`http://localhost:3000/api/pokemon/search/${name}`)
        .then((response) => {
          setPokemonsSearched(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
      else{
        setPokemonsSearched([]);
      }
    }

    const calculateStat = ({ base, iv, ev, isHP = false })=> {
      const sqrtEV = Math.floor(Math.sqrt(ev));
      const value = ((base + iv) * 2 + Math.floor(sqrtEV / 4));

      return isHP ? value + 110 : value + 5;
    }

    const handleSubmit = async () => {


      if(!selectedPokemonId || !alias){
        setError(true);
        return;
      }
      const payload = {
        teamId,
        pokemonId: selectedPokemonId,
        alias,
        objectId: selectedItemId,
        natureId: selectedNatureId,
        abilityId: selectedAbilityId,
        attack1Id,
        attack2Id,
        attack3Id,
        attack4Id,
        ivs: pokemonIvs,
        evs: pokemonEvs
      }

      if(pokemonXTeamId){

        axios.put(`http://localhost:3000/api/team/pokemon/${pokemonXTeamId}`, payload, {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
          setSelectedTeamId(teamId);
          setPanel('editarTeam');
          fetchTeams();
          setError(false);
        })
        .catch(error => {
          console.error(error);
          setError(true);
        });

      }else{
        axios.post('http://localhost:3000/api/team/pokemon', payload, {headers: {Authorization: localStorage.getItem('token')}})
        .then(response => {
          console.log(response.data);
          setSelectedTeamId(teamId);
          setPanel('editarTeam');
          fetchTeams();
          setError(false);
        })
        .catch(error => {
          console.error(error);
          setError(true);
        });
      }
    }

  return (
    <div className='h-screen flex flex-col justify-start items-start p-5'>
        <div className='flex flex-col justify-start items-start gap-5 w-[15vw]'>
            <div className='flex justify-start items-center gap-5 relative'>
                <label>Pokemon:</label>
                <input type="text" className='border border-gray-500 rounded-lg p-2' value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); handleNameSearch(e.target.value);}}/>
                <div className='absolute top-full left-0 w-full bg-white z-10'>
                    {pokemonsSearched.length > 0 && pokemonsSearched.map((pokemon) => (
                        <div key={pokemon.id} className='p-2 hover:bg-gray-200 cursor-pointer flex items-center justify-between' onClick={() => {handleSelectPokemon(pokemon)}}>
                            <h1>{pokemon.name}</h1>
                            <div className='flex items-center justify-center'>
                              <img src={`http://localhost:3000${pokemon.primaryType.imageUrl}`} alt={pokemon.primaryType.name} />
                              {pokemon.secondaryType && (
                                <img src={`http://localhost:3000${pokemon.secondaryType.imageUrl}`} alt={pokemon.secondaryType.name} />
                              )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <img src={pokemon ? `http://localhost:3000${pokemon.imageUrl}` : 'http://localhost:3000/uploads/pokeball.png'} alt="pokemon image" className='object-contain w-full h-full'/>
            <div className='flex items-center justify-center w-full'>
              <img src={pokemon && `http://localhost:3000${pokemon.primaryType.imageUrl}`} alt={pokemon && pokemon.primaryType.name} />
              {pokemon && pokemon.secondaryType && (
                <img src={`http://localhost:3000${pokemon.secondaryType.imageUrl}`} alt={pokemon.secondaryType.name} />
              )}
            </div>
          </div>
          {pokemon && 
          <div className='w-full'>
          <div className='flex w-full items-center justify-between gap-5'>
            <div>
              <label>Alias: </label>
              <input type="text" className='border border-gray-500 rounded-lg p-2' value={alias} onChange={(e) => {setAlias(e.target.value);}}/>
            </div>
            <div>
              <label>Naturaleza: </label>
              <select name="nature" id="nature" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setSelectedNatureId(e.target.value);}} value={selectedNatureId}>
                <option value={null}></option>
                {natures.map((nature)=>(
                  <option key={nature.id} value={nature.id}>{nature.name}</option>)
                  )}
              </select>
            </div>
            <div>
              <label>Item: </label>
              <select name="item" id="item" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setSelectedItemId(e.target.value);}} value={selectedItemId}>
                <option value={null}></option>
                {items.map((item)=>(
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Habilidad: </label>
              <select name="ability" id="ability" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setSelectedAbilityId(e.target.value);}} value={selectedAbilityId}>
                <option value={null}></option>
                {abilities.map((ability)=>(
                  <option key={ability.id} value={ability.id} className='text-black'>{ability.ability.name}</option>
                ))}
              </select>
            </div>

          </div>
          <div className='flex w-full p-5 mt-2 items-stretch justify-start gap-3 bg-blue-800 rounded-lg text-white'>
                <div className='flex flex-col items-center justify-around w-1/4 border border-white rounded-lg p-2'>
                <h1>Base</h1>
                  <div className='flex items-center justify-between w-full'><label>HP</label> <p>{pokemon.hp}</p></div>
                  <div className='flex items-center justify-between w-full'><label>Attack</label> <p>{pokemon.attack}</p></div>
                  <div className='flex items-center justify-between w-full'><label>Defense</label> <p>{pokemon.defense}</p></div>
                  <div className='flex items-center justify-between w-full'><label>Special Attack</label> <p>{pokemon.specialAttack}</p></div>
                  <div className='flex items-center justify-between w-full'><label>Special Defense</label> <p>{pokemon.specialDefense}</p></div>
                  <div className='flex items-center justify-between w-full'><label>Speed</label> <p>{pokemon.speed}</p></div>
                </div>
                <div className='w-1/4 flex flex-col items-center justify-center gap-2 border border-white rounded-lg p-2'>
                  <h1>IVs</h1>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>HP</label>
                    <input type="range" min="0" max="31" value={pokemonIvs.hp} onChange={(e) => {setPokemonIvs({...pokemonIvs, hp: e.target.value})}} className="w-full" />
                    <input type="number" value={pokemonIvs.hp} onChange={(e) => {setPokemonIvs({...pokemonIvs, hp: e.target.value})}} className="w-1/5 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>AT</label>
                    <input type="range" min="0" max="31" value={pokemonIvs.attack} onChange={(e) => {setPokemonIvs({...pokemonIvs, attack: e.target.value})}} className="w-full" />
                    <input type="number" value={pokemonIvs.attack} onChange={(e) => {setPokemonIvs({...pokemonIvs, attack: e.target.value})}} className="w-1/5 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>DF</label>
                    <input type="range" min="0" max="31" value={pokemonIvs.defense} onChange={(e) => {setPokemonIvs({...pokemonIvs, defense: e.target.value})}} className="w-full" />
                    <input type="number" value={pokemonIvs.defense} onChange={(e) => {setPokemonIvs({...pokemonIvs, defense: e.target.value})}} className="w-1/5 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SA</label>
                    <input type="range" min="0" max="31" value={pokemonIvs.specialAttack} onChange={(e) => {setPokemonIvs({...pokemonIvs, specialAttack: e.target.value})}} className="w-full" />
                    <input type="number" value={pokemonIvs.specialAttack} onChange={(e) => {setPokemonIvs({...pokemonIvs, specialAttack: e.target.value})}} className="w-1/5 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SD</label>
                    <input type="range" min="0" max="31" value={pokemonIvs.specialDefense} onChange={(e) => {setPokemonIvs({...pokemonIvs, specialDefense: e.target.value})}} className="w-full" />
                    <input type="number" value={pokemonIvs.specialDefense} onChange={(e) => {setPokemonIvs({...pokemonIvs, specialDefense: e.target.value})}} className="w-1/5 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SP</label>
                    <input type="range" min="0" max="31" value={pokemonIvs.speed} onChange={(e) => {setPokemonIvs({...pokemonIvs, speed: e.target.value})}} className="w-full" />
                    <input type="number" max="31" min="0" value={pokemonIvs.speed} onChange={(e) => {setPokemonIvs({...pokemonIvs, speed: e.target.value})}} className="w-1/5 bg-white rounded-lg text-black" />
                  </div>
                </div>
                <div className='w-1/4 flex flex-col items-center justify-center gap-2 border border-white rounded-lg p-2'>
                  <h1>EVs</h1>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>HP</label>
                    <input type="range" min="0" max="252" value={pokemonEvs.hp} onChange={(e) => {setPokemonEvs({...pokemonEvs, hp: e.target.value})}} className="w-full" />
                    <input type="number" max="252" min="0" value={pokemonEvs.hp} onChange={(e) => {setPokemonEvs({...pokemonEvs, hp: e.target.value})}} className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>AT</label>
                    <input type="range" min="0" max="252" value={pokemonEvs.attack} onChange={(e) => {setPokemonEvs({...pokemonEvs, attack: e.target.value})}} className="w-full" />
                    <input type="number" max="252" min="0" value={pokemonEvs.attack} onChange={(e) => {setPokemonEvs({...pokemonEvs, attack: e.target.value})}} className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>DF</label>
                    <input type="range" min="0" max="252" value={pokemonEvs.defense} onChange={(e) => {setPokemonEvs({...pokemonEvs, defense: e.target.value})}} className="w-full" />
                    <input type="number" max="252" min="0" value={pokemonEvs.defense} onChange={(e) => {setPokemonEvs({...pokemonEvs, defense: e.target.value})}} className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SA</label>
                    <input type="range" min="0" max="252" value={pokemonEvs.specialAttack} onChange={(e) => {setPokemonEvs({...pokemonEvs, specialAttack: e.target.value})}} className="w-full" />
                    <input type="number" max="252" min="0" value={pokemonEvs.specialAttack} onChange={(e) => {setPokemonEvs({...pokemonEvs, specialAttack: e.target.value})}} className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SD</label>
                    <input type="range" min="0" max="252" value={pokemonEvs.specialDefense} onChange={(e) => {setPokemonEvs({...pokemonEvs, specialDefense: e.target.value})}} className="w-full" />
                    <input type="number" max="252" min="0" value={pokemonEvs.specialDefense} onChange={(e) => {setPokemonEvs({...pokemonEvs, specialDefense: e.target.value})}} className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SP</label>
                    <input type="range" min="0" max="252" value={pokemonEvs.speed} onChange={(e) => {setPokemonEvs({...pokemonEvs, speed: e.target.value})}} className="w-full" />
                    <input type="number" max="252" min="0" value={pokemonEvs.speed} onChange={(e) => {setPokemonEvs({...pokemonEvs, speed: e.target.value})}} className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                </div>
                <div className='w-1/4 p-2 flex flex-col items-center justify-center gap-2'>
                  <h1>Total</h1>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>HP</label>
                    <input type="number" value={calculateStat({base: parseFloat(pokemon.hp), iv:parseFloat(pokemonIvs.hp), ev:parseFloat(pokemonEvs.hp), isHP:true})} readOnly className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>AT</label>
                    <input type="number" value={calculateStat({base:parseFloat(pokemon.attack), iv:parseFloat(pokemonIvs.attack), ev:parseFloat(pokemonEvs.attack)})} readOnly className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>DF</label>
                    <input type="number" value={calculateStat({base:parseFloat(pokemon.defense), iv:parseFloat(pokemonIvs.defense), ev:parseFloat(pokemonEvs.defense)})} readOnly className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SA</label>
                    <input type="number" value={calculateStat({base:parseFloat(pokemon.specialAttack), iv:parseFloat(pokemonIvs.specialAttack), ev:parseFloat(pokemonEvs.specialAttack)})} readOnly className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SD</label>
                    <input type="number" value={calculateStat({base:parseFloat(pokemon.specialDefense), iv:parseFloat(pokemonIvs.specialDefense), ev:parseFloat(pokemonEvs.specialDefense)})} readOnly className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                  <div className='flex items-center justify-between w-full gap-2'>
                    <label>SP</label>
                    <input type="number" value={calculateStat({base:parseFloat(pokemon.speed), iv:parseFloat(pokemonIvs.speed), ev:parseFloat(pokemonEvs.speed)})} readOnly className="w-1/3 bg-white rounded-lg text-black" />
                  </div>
                </div>
          </div>
          <div className='p-5'>
            <h1>Attacks</h1>
            <div className='flex items-center justify-center gap-5 w-full'>  
              <select name="attack1" id="attack1" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setAttack1Id(e.target.value);}} value={attack1Id}>
                <option value={null}>Seleccionar</option>
                {pokemonAbleAttacks.map((attack) => (
                  <option key={attack.attack.id} value={attack.attack.id}>{attack.attack.name}</option>
                ))}
              </select>
              <select name="attack2" id="attack2" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setAttack2Id(e.target.value);}} value={attack2Id}>
                <option value={null}>Seleccionar</option>
                {pokemonAbleAttacks.map((attack) => (
                  <option key={attack.attack.id} value={attack.attack.id}>{attack.attack.name}</option>
                ))}
              </select><select name="attack3" id="attack3" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setAttack3Id(e.target.value);}} value={attack3Id}>
                <option value={null}>Seleccionar</option>
                {pokemonAbleAttacks.map((attack) => (
                  <option key={attack.attack.id} value={attack.attack.id}>{attack.attack.name}</option>
                ))}
              </select><select name="attack4" id="attack4" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setAttack4Id(e.target.value);}} value={attack4Id}>
                <option value={null}>Seleccionar</option>
                {pokemonAbleAttacks.map((attack) => (
                  <option key={attack.attack.id} value={attack.attack.id}>{attack.attack.name}</option>
                ))}
              </select>
              
            </div>
          </div>
          <div className='flex items-center justify-center gap-5 w-full'>
                <button className='bg-blue-500 text-white rounded-lg p-2 cursor-pointer' onClick={handleSubmit}>Guardar</button>
                <button className='bg-red-500 text-white rounded-lg p-2 cursor-pointer' onClick={() => { setSelectedTeamId(teamId); setPanel('editarTeam')}}>Cancelar</button>
          </div>
          {error && <div className='text-red-500'>Error al subir el pokemon, revisa los campos</div>}
          
        </div>}
    </div>
  )
}

export default PanelPokemonForm