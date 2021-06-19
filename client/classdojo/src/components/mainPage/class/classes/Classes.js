import React from 'react'
import { useSelector } from 'react-redux'
import ClassesGrade from '../classesgrade/ClassesGrade';
import CreateNewClass from '../createnewclass/CreateNewClass'

function Classes() {
    const { classes } = useSelector(state => state.classes);  
    return (
        <div className='classes'>
            {classes && classes.map((classroom) => {
                return <div className='classes__col' key={`${classroom._id}`}>                   
                    <ClassesGrade classroom={classroom} />
                </div>
            })}                        
            <CreateNewClass/>
        </div>
    )
}

export default Classes
