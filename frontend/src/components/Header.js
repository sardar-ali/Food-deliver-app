import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiMenuAlt1 } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas, searchProducts, showSideBar } from '../actions'
import Spinner from './Spinner'
import LeftSide from "./LeftSide";

const Header = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()
    const handleSearch = (e) => {
        e.preventDefault()
        // dispatch(searchProducts(name))
        // navigate(`/search?=${name}`)
    }


    useEffect(() => {
        if (name) {
            dispatch(fetchPizzas(name))
            localStorage.setItem("isSearch", true)
        } else {
            localStorage.setItem("isSearch", false)
        }
    }, [name])




    return (
        <div className='header'>
            <div className="logo">
                <div className="burger" onClick={() => dispatch(showSideBar(true))}>
                    <HiMenuAlt1 />
                </div>

                <Link to="/"><img src="https://tse4.mm.bing.net/th?id=OIP.cX4ANl7tdJ-9Sd-9vlk5xQAAAA&pid=Api&P=0&h=180" alt="logo" style={{ width: "70px", height: "70px", borderRadius: "50%", padding: "0.5rem" }} /></Link>
            </div>
            <form onSubmit={handleSearch} className="search-bar">
                <div className="input">
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Search For Food' />
                    {search?.loading ? (<div>
                        <Spinner />
                    </div>) : <FiSearch onClick={handleSearch} />}
                </div>
            </form>
            <div>
                <LeftSide />
            </div>
        </div>
    )
}

export default Header
