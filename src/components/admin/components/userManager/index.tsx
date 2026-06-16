import IC from '@/components/icons';
import userIcons from '@/utils/userIcons';

type User = {
  id: string;
  name: string;
  password: string;
  role: string;
};

const users: User[] = [
  { id: '1', name: 'Ana Silva', password: '••••••••', role: 'Administrador' },
  { id: '2', name: 'Bruno Costa', password: '••••••••', role: 'Atendente' },
  { id: '3', name: 'Carla Souza', password: '••••••••', role: 'Gerente' },
  { id: '4', name: 'Diego Alves', password: '••••••••', role: 'Usuário' },
];

export default function UserManager() {
  const getUserCount = (userId: string) =>
    users.filter(p => p.role === userId).length+1;

  return (
    <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900'>
      <header className='mb-6 flex items-center justify-between'>
        <div>
          <h3
            className='text-gray-800 dark:text-gray-100'
            style={{ fontFamily: 'Georgia, serif' }}>
            Usuários
          </h3>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {users.length} usuários cadastrados
          </p>
        </div>

        <button
          // onClick={() => setShowForm(!showForm)}
          className='flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm text-white shadow-md transition-colors hover:bg-amber-600'>
          <IC.Plus size={16} /> Nova categoria
        </button>
      </header>

      <div className='mt-2 space-y-2'>
          {users.map(user => (
            <div
              key={user.id}
              className='dark:hover:bg-gray-750 group flex cursor-move items-center gap-3 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800'>
              <IC.GripVertical
                size={16}
                className='shrink-0 text-gray-300 dark:text-gray-600'
              />

              <span className='text-2xl'>{userIcons[user.role]}</span>
              <div className='flex-1'>
                <p className='text-sm text-gray-800 dark:text-gray-200'>
                  {user.name}
                </p>
                <p className='text-xs text-gray-400 dark:text-gray-500'>
                  {getUserCount(user.id)} usuários(s) · {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
