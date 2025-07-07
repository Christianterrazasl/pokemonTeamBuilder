import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"


export default function ItemAdminFormPage(){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('imageUrl', imageFile);
        formData.append('name', name);
        formData.append('description', description);
        await axios.post('http://localhost:3000/api/item', formData).then(response => {
            console.log('Item created:', response.data);
            navigate('/admin');
        }).catch(err => {
            console.error('Error creating item:', err);
            setError(true);
        });
    }

    return(<div className="h-screen w-screen bg-gray-100 flex flex-col justify-center items-center gap-3">
        <div className="flex items-center gap-2"><label>Nombre: </label> <input className="rounded border" type="text" value={name} onChange={(e) => setName(e.target.value)}/></div>
        <div className="flex items-center gap-2"><label>Descripcion: </label> <input className="rounded border" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/></div>
        <div>
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="bg-gray-300 rounded-lg p-2"/>
            
        </div>
        <button className="bg-blue-300 rounded-lg p-2" onClick={handleSubmit}>Guardar Item</button>
        <button className="bg-red-300 rounded-lg p-2" onClick={() => navigate('/admin')}>Cancelar</button>
        {error && <p className="text-red-500">Error al crear el item</p>}
    </div>)
}