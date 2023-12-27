import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const Navigate = useNavigate()

    return (
        <>
            {/* <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <img src="https://guileless-cat-a0cd77.netlify.app/img/school.png" width="60" height="60" class="d-inline-block align-top" alt="" />
                    <span className='fs-3 mx-2'>Islamia Public School - Admin Panel</span>
                </a>
            </nav> */}

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <img src="https://guileless-cat-a0cd77.netlify.app/img/school.png" width="60" height="60" class="d-inline-block align-top mx-2" alt="" />
                <a class="navbar-brand" href="#">Islamia Public School</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            {/* <Link class="nav-link" to="/result" >Results</Link> */}
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#" >Dashboard</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="www.islamiapublicschool.com" >IPS Website</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar