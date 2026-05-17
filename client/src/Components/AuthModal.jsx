import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthModal = ({ onClose }) => {

  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Пароли не совпадают')
        return
    }
    
    try {

      const url = isLogin
        ? 'http://127.0.0.1:8000/login/'
        : 'http://127.0.0.1:8000/register/'

      const bodyData = isLogin
        ?{
          email: formData.email,
          password: formData.password,
        }:{
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      })

      const data = await response.json()
      if (!response.ok) {
        console.log(data)
        throw new Error(JSON.stringify(data))
      }
      localStorage.setItem('token', data.token)
      navigate('/profile')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm ">
        <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        />
        <div className="relative bg-white p-8 rounded-2xl w-[400px] z-10">
          <h2 className="text-3xl mb-6 text-center">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={formData.username}
                onChange={handleChange}
                required
                className="border p-3 rounded-xl"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="pochta@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            {!isLogin && (
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="border p-3 rounded-xl"
                />
            )}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-black text-white p-3 rounded-xl"
            >
              {isLogin ? 'Войти' : 'Создать аккаунт'}
            </button>

          </form>

          <div className="mt-4 text-center">

            {isLogin ? (
              <p>Нет аккаунта?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false)
                    setError('')
                  }}
                  className="text-blue-500"
                >
                  Регистрация
                </button>
              </p>
            ) : (
              <p>Уже есть аккаунт?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true)
                    setError('')
                  }}
                  className="text-blue-500"
                >Войти</button>
              </p>
            )}

          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500"
          >✕</button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
