import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Landing() {
    const [name, setName] = useState("");
  return (
    <div>
        <input type="text" onChange={(e) => {
            setName(e.target.value);
        }} />

        <Link to={`/room/?name=${name}`} className='bg-slate-500 p-2'>Join</Link>
    </div>
  )
}
