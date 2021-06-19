import React from 'react'
import Header from '../header/Header'
import Classes from '../classes/Classes';
import School from '../school/School';
function Lauchpad() {
    return (
        <div>
            <Header />
            <div className='lauchpad'>
                <Classes />
                <School />
            </div>
        </div>
    )
}

export default Lauchpad
