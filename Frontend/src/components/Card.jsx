import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Card() {
  return (
        <div className="py-1 items-center justify-center">
          <div className="flex flex-col mx-auto bg-yy  rounded-xl shadow-md overflow-hidden md:max-w-xl m-1">
                <div className="px-24 py-6 flex justify-between items-center text-white hover:text-yy">
                    <div className="sm:pr-16">
                        <p className="text-xl font-bold">id:</p>
                    </div>
                    <div>
                        <div className="uppercase tracking-wide text-lg font-semibold">
                            Name: Leo
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon  className="text-amber-500 text-2xl" icon={faPenToSquare} />
                        </div>
                    </div>
                    <div>
                        <div>
                        <FontAwesomeIcon className='text-2xl text-red-500' icon={faTrash} />
                        </div>
                    </div>
                </div>
          </div>
    </div>
  )
}

export default Card
