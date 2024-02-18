import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react'
import CropDetailsModal from './CropDetails';

const people = [
  {
    name: '...',
    title: 'Health Awareness Monitor',
    role: 'Patient',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export default function UsersList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState({}) as any;


  useEffect(() => {

    const getData = () => {
        const database = getDatabase();
        // Point to the root or a specific part of your database

        const dataRef = ref(database);

        onValue(dataRef, (snapshot) => {
            const dbData: any = snapshot.val();
            setData(dbData)
            console.log(dbData)
        }, {
            onlyOnce: false
        });

    }
    getData()
}, []);

  const handleDetails = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{data.name}</h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {person.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">{person.title}</p>
              </div>
              <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={data.image} alt="" />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="-ml-px flex w-0 flex-1">
                  <div
                    onClick={() => handleDetails(person)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M3.97 3.97a.75.75 0 0 1 1.06 0l13.72 13.72V8.25a.75.75 0 0 1 1.5 0V19.5a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1 0-1.5h9.44L3.97 5.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>

                    Details
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}




      </ul>

      <CropDetailsModal user={selectedUser} open={isModalOpen} setOpen={handleCloseModal} />
    </div>
  );
}