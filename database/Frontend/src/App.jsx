import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [notes, setNotes] = useState([])

  const getData = () => {
    axios.get("http://localhost:4000/notes")
      .then(res => {
        setNotes(res?.data?.notes)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, description } = e.target.elements;

    axios.post("http://localhost:4000/notes", {
      name: name.value,
      description: description.value
    }).then(res => {
        console.log(res)
    })


  }


  return (
    <>
      <form className='input-form' onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder='Enter the name' />
        <input name="description" type="text" placeholder='Enter the description' />
        <input type="submit" />
      </form>

      <section className="notes">
        {
          notes.map((note, idx) => {
            return <div className='note' key={idx}>
              <h2>{note.name}</h2>
              <h4>{note.description}</h4>
            </div>
          })
        }
      </section>

    </>
  )
}

export default App
