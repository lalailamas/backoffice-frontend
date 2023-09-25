import { useState, useEffect } from 'react'
import { listTasks, updateTasks } from '../../api/task'

const TaskItem = ({ task }) => {
  const [completed, setCompleted] = useState(task.checked)

  const toggleCompleted = () => {
    const updatedTask = { ...task, checked: !completed }

    updateTasks(task.id, updatedTask)
      .then((response) => {
        setCompleted(!completed)
      })
      .catch((error) => {
        console.error('Error al actualizar la tarea:', error)
      })
  }

  return (
    <div
      className={`flex gap-5 items-center border-b py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150 ${
        completed ? 'line-through text-gray-400' : ''
      }`}
    >
      <input
        type='checkbox'
        className='h-8 w-5 text-d-dark-purple focus:ring-d-dark-purple border-d-gray rounded'
        name='tasks'
        checked={completed}
        onChange={toggleCompleted}
      />
      <div className='table text-d-dark-dark-purple  table-zebra w-full'>{task.description}</div>
    </div>
  )
}

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    listTasks()
      .then((response) => {
        setTasks(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error)
      })
  }, [])

  return (
    <>
      <div className='flex flex-col gap-2 antialiased p-8 mt-8'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center'>Listado de tareas</h2>
        <p className='label-text pr-4 text-d-dark-dark-purple text-center'>
          Por favor sigue las tareas en orden
        </p>
        <div className='max-w-lg mx-auto mt-2'>
          <div className='flex flex-row justify-between items-center'>
            <div className='inline-flex space-x-2 items-center' />
          </div>
          <div className='my-5'>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
          <button className='btn border-none mt-4 rounded-2xl bg-d-dark-dark-purple text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple disabled:text-d-white'>Terminado</button>
        </div>
      </div>
    </>
  )
}

export default Tasks
