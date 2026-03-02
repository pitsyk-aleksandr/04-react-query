// Імпорт сурового стану - використовувалося в ДЗ-3 (03-react-movies)
// import { StrictMode } from 'react';

// Імпорт основного компонента React для створення DOM
import { createRoot } from 'react-dom/client';

// Імпорт компонентів бібліотеки React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Імпортуємо ReactQueryDevtools:
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Імпортуємо основний компонент App
import App from './components/App/App';
// Нормалізація стилів (додатково треба - npm install modern-normalize)
import 'modern-normalize';
// Глобальні стилі (додатково)
import './global.css';

// Створення нового QueryClient - з бібліотеки React Query
const queryClient = new QueryClient();

// Обгортаємо додаток в QueryClientProvider, передавши в нього створений клієнт.
// Це дасть змогу використовувати React Query в усіх компонентах додатка.
// QueryClientProvider надає всі можливості React Query для компонентів всередині нього,
// дозволяючи працювати з асинхронними запитами, кешем і відслідковувати їхній стан.
// -----------------------------------------------------------------------------------
// Налаштовуємо також ReactQueryDevtools:
// ReactQueryDevtools дозволяє вам взаємодіяти з усіма запитами
// та відслідковувати їхнє виконання в браузері.
// Ви можете активувати DevTools, натиснувши на іконку, що з'являється в правому нижньому кутку.
// -----------------------------------------------------------------------------------

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
