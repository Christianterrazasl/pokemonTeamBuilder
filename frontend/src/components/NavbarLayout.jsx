import React from 'react'

const NavbarLayout = ({children, teams=[]}) => {
  return (
    
    <div>
        <div className='fixed top-0 left-0 h-screen w-[250px] bg-red-800 xl:w-[300px] flex flex-col justify-start items-center pt-10'>
            <div className='bg-blue-800 p-5 rounded-xl'>
                <h1 className='text-4xl font-bold text-yellow-500'>Pokemon</h1>
                <h3 className='text-xl text-white'>Team Builder</h3>
            </div>
            <div className='mt-10'>
                <h1 className='text-3xl font-bold text-white mb-10'>Tus equipos:</h1>
                {teams.length > 0 ? (
                    teams.map((team, index) => (
                        <div key={index} className='mt-5'>
                            <p className='text-xl font-bold text-white'>{team.name}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-xl font-bold text-white'>No tienes equipos</p>
                )}
            </div>
        </div>
        <div className='ml-[250px] xl:ml-[300px]'>
            {children}
        </div>
    </div>
  )
}

export default NavbarLayout