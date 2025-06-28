import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const [errorEmpty, setErrorEmpty] = useState(false);
    const [errorRegister, setErrorRegister] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = ()=>{
        if(username.trim() === '' || password.trim() === '' || email.trim() === ''){
            setErrorEmpty(true);
            setTimeout(() => {
                setErrorEmpty(false);
            },2000);
            return
        }
        axios.post('http://localhost:3000/api/register', {username, email, password})
        .then(res => {
            if(res.status === 200){
                setSuccessRegister(true);
                setTimeout(() => {
                    navigate('/login');
                },2000);
            }else{
                setErrorRegister(true);
                setTimeout(() => {
                    setErrorRegister(false);
                },2000);
                
            }
        })
        .catch(err => {
            console.log(err);
            setErrorRegister(true);
                setTimeout(() => {
                    setErrorRegister(false);
                },2000);
        })
        

    }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-300'>
        <div className='bg-white px-10 py-6 rounded-xl flex flex-col justify-center items-start'>
            {successRegister ? (<h1 className='text-2xl text-green-500'>Registrado exitosamente</h1>) : (<><div className='bg-blue-800 p-5 rounded-2xl'>
                <h1 className='text-4xl font-bold text-yellow-500'>Pokemon</h1>
                <h3 className='text-xl text-white'>Team Builder</h3>
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mt-5'>Register</h1>
            <div className='flex flex-col justify-center items-start w-full'>
                <label className='text-gray-800 mt-5'>Username</label>
                <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className='text-gray-800 mt-5'>Email</label>
                <input type="email" className='border border-gray-300 rounded-lg p-2 w-full' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label className='text-gray-800 mt-5'>Password</label>
                <input type="password" className='border border-gray-300 rounded-lg p-2 w-full' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className='flex justify-center items-center gap-3'>
                    <button className='bg-blue-800 text-white p-3 rounded-lg mt-5 cursor-pointer' onClick={handleSubmit}>Registrarse</button>
                    <button className='bg-gray-500 text-white p-3 rounded-lg mt-5 cursor-pointer' onClick={()=>navigate('/login')}>Cancelar</button>
                </div>
                {errorEmpty && <p className='text-red-500 mt-5'>Username o contraseña vacio</p>}
                {errorRegister && <p className='text-red-500 mt-5'>Error al registrar</p>}
            </div></>)}
        </div>
    </div>
  )
}

export default RegisterPage