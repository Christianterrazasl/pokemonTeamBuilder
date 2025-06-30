import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';

const PanelPokemonForm = ({pokemonTeamId}) => {

    const [alias, setAlias] = useState('');
    const [errorEmpty, setErrorEmpty] = useState(false);
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

    useEffect(() => {
      if (selectedPokemonId) {
        axios.get(`http://localhost:3000/api/ability/pokemon/${selectedPokemonId}`)
        .then((response) => {
          setAbilities(response.data);
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
          <div className='flex w-full items-center justify-between gap-5'>
            <div>
              <label>Alias: </label>
              <input type="text" className='border border-gray-500 rounded-lg p-2' value={alias} onChange={(e) => {setAlias(e.target.value);}}/>
            </div>
            <div>
              <label>Naturaleza: </label>
              <select name="nature" id="nature" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setSelectedNatureId(e.target.value);}} value={selectedNatureId}>
                <option value={null}>Selecciona naturaleza</option>
                {natures.map((nature)=>(
                  <option key={nature.id} value={nature.id}>{nature.name}</option>)
                  )}
              </select>
            </div>
            <div>
              <label>Item: </label>
              <select name="item" id="item" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setSelectedItemId(e.target.value);}} value={selectedItemId}>
                <option value={null}>Selecciona un item</option>
                {items.map((item)=>(
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Habilidad: </label>
              <select name="ability" id="ability" className='border border-gray-500 rounded-lg p-2' onChange={(e) => {setSelectedAbilityId(e.target.value);}} value={selectedAbilityId}>
                <option value={null}>Selecciona una habilidad</option>
                {abilities.map((ability)=>(
                  <option key={ability.id} value={ability.id} className='text-black'>{ability.ability.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex w-full p-5 mt-2 items-center justify-center gap-5 bg-blue-800 rounded-lg'>

          </div>
          
        
    </div>
  )
}

export default PanelPokemonForm