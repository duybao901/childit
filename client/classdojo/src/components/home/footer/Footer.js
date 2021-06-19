import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer-basic">
            <footer>
                <div className="social">
                    <Link to="#">
                        <i className="fab fa-instagram"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-snapchat-ghost"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-twitter"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-facebook-f"></i>
                    </Link>
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item"><Link to="#">Home</Link></li>
                </ul>
                <p className="copyright">Classdojo © 2021, Duy, Hien</p>
            </footer>
        </div>
    )
}

export default Footer
