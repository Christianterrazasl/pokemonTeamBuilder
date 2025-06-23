import React from 'react'

const NavbarLayout = ({children}) => {
  return (
    
    <div>
        <div className='fixed top-0 left-0 h-screen w-[250px] bg-red-800 xl:w-[300px] flex flex-col justify-start items-center pt-10'>
            <div className='bg-blue-800 p-5 rounded-xl'>
                <h1 className='text-4xl font-bold text-yellow-500'>Pokemon</h1>
                <h3 className='text-xl text-white'>Team Builder</h3>
            </div>
            <div className='mt-10'>
                <h1 className='text-3xl font-bold text-white'>Tus equipos:</h1>
            </div>
        </div>
        <div className='ml-[250px] xl:ml-[300px]'>
            {children}
        </div>
    </div>
  )
}

export default NavbarLayout