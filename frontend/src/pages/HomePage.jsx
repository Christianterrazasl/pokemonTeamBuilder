import React, { use } from 'react'
import NavbarLayout from '../components/NavbarLayout'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user) {
      navigate('/login');
    }
  }, []);

  return (
    <NavbarLayout>
        <h1>Home</h1>
        <h2>Text title</h2>
    </NavbarLayout>
  )
}

export default HomePage