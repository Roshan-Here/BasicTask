import React from 'react'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'


function Card({ename,eid,handledelete}) {
  return (
        <div className="py-1 items-center justify-center">
          <div className="flex flex-col mx-auto bg-gradient-to-tr from-slate-600 to-amber-200  rounded-xl shadow-md overflow-hidden md:max-w-xl m-1">
                <div className="px-32 py-6 flex justify-between items-center text-white hover:text-yy">
        <Link to={`/${eid}`}>
                    <div className="sm:pr-4">
                        <p className="text-xl font-medium">id: {eid}</p>
                    </div>
                    <div>
                        <div className="uppercase tracking-wide text-lg font-semibold text-black">
                            {ename}
                        </div>
                    </div>
        </Link>
                    <div>
                        <div>
                            <FontAwesomeIcon  className="text-amber-500 text-2xl" icon={faPenToSquare} />
                        </div>
                    </div>
                    <div>
                        <div>
                        <FontAwesomeIcon 
                            className='text-2xl text-red-500' 
                            onClick={(e)=>{
                            e.stopPropagation()
                            handledelete(eid)}} 
                            icon={faTrash} />
                        </div>
                    </div>

                </div>
          </div>
    </div>
  )
}

export default Card
