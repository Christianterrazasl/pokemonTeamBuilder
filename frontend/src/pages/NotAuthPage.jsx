
import { useNavigate } from "react-router-dom"

export default function NotAuthPage(){
    const navigate = useNavigate();
    return(
        <div className="h-screen w-screen bg-red-800 flex justify-center items-center">
            <div className="bg-white rounded-xl flex flex-col items-center justify-center gap-4 p-5">
                <h1 className="text-4xl font-bold text-red-700">No autorizado xd</h1>
                <button className="rounded-xl bg-gray-300 p-3 cursor-pointer" onClick={() => navigate('/login')}>Volver a login</button>

            </div>
        </div>
    )
}