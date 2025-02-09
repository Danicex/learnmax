import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function Notes({content}) {
    const [input, setInput] = useState({
       title: '',
       body: '', 
    });
    const {api_endpoint} = useContext(AuthContext);

    const handleStateChange =(e)=>{
        const  {name, value} = e.target;
        setInput((x)=>({
            ...x, [name]: value,
        }))
    }

    const handleSave = (id)=>{
        const formData = new FormData()
        formData.append('notes[title]', input.title)
        formData.append('notes[body]', input.body)
        formData.append('notes[content_id]', content)
        axios.post(`${api_endpoint}/notes`, formData).then(res =>{
           setInput({
            title: '',
            body: '',
           }) 
        })
    }

    
  return (
    <div className='p-4 rounded-lg' id='trans-bg'>
        <div className="form">
            <input type="text" placeholder='Title...' value={input.title} onChange={handleStateChange} name='title'/>
            <textarea name="body"className='w-full' id="note-tab"  value={input.body} onChange={handleStateChange}></textarea> <br />
            <button onClick={handleSave}>save</button>
        </div>
    </div>
  )
}
