import React from 'react'

const PanelEditarTeam = ({team}) => {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
        <h1 className='text-3xl'>Team {team.name}</h1>
        <p className='text-xl'>Esta funcionalidad aún no está implementada.</p>

    </div>
  )
}

export default PanelEditarTeam