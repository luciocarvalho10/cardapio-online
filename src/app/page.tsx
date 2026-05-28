import ProductList from '@/components/ProductList';
import { FirebaseProvider } from "@/context/firebase";

export default function Home() {
  return (
    <FirebaseProvider>
      <div className='flex items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        Olá mundo!
      </div>
      <ProductList/>
    </FirebaseProvider>
  );
}
