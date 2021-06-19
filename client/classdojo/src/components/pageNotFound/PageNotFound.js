import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../home/footer/Footer'
function PageNotFound() {
    return (
        <React.Fragment>
            <Header />
            <div className='pagenf'>
                <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274372/Classdojo/404_zfzr5o.gif" alt='pagenotfound'></img>
                <Link to=''>Quay lại trang chủ</Link>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default PageNotFound
