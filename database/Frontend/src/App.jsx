import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [notes, setNotes] = useState([])
  const [editNote, setEditNote] = useState(null);
  const [onEdit, setOnEdit] = useState(false)


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

      getData()
    })
  }

  const handleDelete = (noteId) => {

    axios.delete(`http://localhost:4000/notes/${noteId}`)
      .then((res) => {
        console.log(res.data)

        getData()
      })
  }

  const handleEdit = (note) => {
    setEditNote(note);
    setOnEdit(true);
  };

  const handleEditSubmit = (e) => {

    e.preventDefault()

    console.log(editNote._id)

    let noteId = editNote?._id
    axios.patch(`http://localhost:4000/notes/${noteId}`, {
      description: editNote?.description
    }).then((res) => {
      console.log(res.data)

      getData()
    })


  }


  return (
    <>
      <form className='input-form' onSubmit={handleSubmit}>
        <input id='name' name="name" type="text" placeholder='Enter the name' />
        <input id='description' name="description" type="text" placeholder='Enter the description' />
        <input type="submit" />
      </form>

      <section className="notes">
        {
          notes.map((note, idx) => {
            return <div className='note' key={idx}>
              <h2>{note.name}</h2>
              <h4>{note.description}</h4>
              <button onClick={() => {
                handleEdit(note)
              }}>Edit</button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          })
        }
      </section>

      {
        onEdit && <form className='input-form' onSubmit={(e)=> handleEditSubmit(e)}>
          <input value={editNote?.name || ""}
            onChange={(e) => {
              setEditNote({ ...editNote, name: e.target.value })
            }}
            type="text" placeholder='Enter the name' />
          <input value={editNote?.description || ""}
            onChange={(e) => {
              setEditNote({ ...editNote, description: e.target.value })
            }} type="text" placeholder='Enter the description' />
          <input type="submit" />
        </form>
      }

    </>
  )
}

export default App
