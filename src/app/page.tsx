import ProductList from '@/components/ProductList';
import { Provider } from '@/context/provider';

export default function Home() {
  return (
    <Provider>
      <div className='flex items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        Olá mundo!
      </div>
      <ProductList />
    </Provider>
  );
}
