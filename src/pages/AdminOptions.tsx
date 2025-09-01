import { adminOptions } from '../utils/utils'
import { Link } from 'react-router-dom'

const AdminOptions = () => {
  return (
    <div className='flex flex-wrap justify-center items-center w-full' style={{ height: '80vh'}}>
        {
            adminOptions.map((option, index) => {
                return <Link key={index} to={option.route} className='flex flex-col justify-around items-center border rounded-xl m-2' style={{ height: '150px', width: '150px' }}>
                    <option.icon color='white' size={60} />
                    <span className='text-white'>{option.name}</span>
                </Link>
            })
        }
    </div>
  )
}

export default AdminOptions