// ==========================================================================================
// Компонент App є контейнером для решти компонентів
// ==========================================================================================
// ------------------------------------------------------------------------------------------

// Імпорт модуля useState - для роботи зі станом з REACT
import { useState } from 'react';

// Імпорт компонента з бібліотеки пагінації react-paginate (Додатково - npm i react-paginate)
import ReactPaginate from 'react-paginate';

// Імпорт бібліотеки react-hot-toast (Додатково - npm install react-hot-toast)
// toast - функція виклика повідомлення,
// Toaster - компонент для відображення повідомлень
import toast, { Toaster } from 'react-hot-toast';

// Імпорт модуля зі стилями компонента
import css from './App.module.css';

// Імпорт компонента SearchBar
import SearchBar from '../SearchBar/SearchBar';

// Імпорт компонента ErrorMessage
import ErrorMessage from '../ErrorMessage/ErrorMessage';

// Імпорт компонента Loader
import Loader from '../Loader/Loader';

// Імпорт компонента MovieGrid
import MovieGrid from '../MovieGrid/MovieGrid';

// Імпорт компонента MovieModal
import MovieModal from '../MovieModal/MovieModal';

// Імпорт інтерфейса для одного фільму
import { type Movie } from '../../types/movie';

// Iмпорт функції для HTTP-запроса
import { fetchMovies } from '../../services/movieService';

// Імпорт хук useQuery, який виконує асинхронні запити та автоматично керує станами завантаження,
// помилок та збереженням даних, значно спрощуючи роботу з API.
import { useQuery } from '@tanstack/react-query';
// Імпорт keepPreviousData - для збереження попереднього запиту, поки не прийдуть нові дані
import { keepPreviousData } from '@tanstack/react-query';

export default function App() {
  // Оголошуємо і типизуємо стан - рядок з пошуком
  const [query, setQuery] = useState<string>('');
  // Оголошуємо і типизуємо стан - загальна кількість сторінок
  const [totalPages, setTotalPages] = useState(1);
  // Оголошуємо і типизуємо стан - номер поточної сторінки
  const [page, setPage] = useState(1);
  // Оголошуємо і типизуємо стан - масив фільмів -
  // const [movies, setMovies] = useState<Movie[]>([]);
  // Оголошуємо і типизуємо стан - один обраний фільм
  const [movieSelect, setMovieSelect] = useState<Movie | null>(null);

  // --------------------------------------------------------------------------------------------
  // хук useQuery повертає об’єкт з корисною інформацією про запит :
  //    data – дані, які були успішно отримані в результаті запиту.
  //    error – якщо запит завершився помилкою, ця властивість містить інформацію про помилку.
  //    isLoading – якщо запит ще виконується, значення буде true.
  //    isError – якщо запит не вдалося виконати (наприклад, через мережеві помилки), значення буде true.
  //    isSuccess – якщо запит успішно виконався і дані отримано, значення буде true.
  const { data, isLoading, isError } = useQuery({
    // ключ запиту - масив, який унікально ідентифікує запит і його параметри, що дозволяє React Query ефективно кешувати та повторно використовувати дані для однакових запитів.
    queryKey: ['movies', query, page],

    // функція запиту - асинхронна функція, яка виконує HTTP-запит і повертає дані.
    queryFn: async () => {
      // Виконуємо запит за допомогою функції fetchMovies, передаючи рядок запиту та номер сторінки,
      // і отримуємо масив фільмів та загальну кількість сторінок
      const { movies, totalPages } = await fetchMovies(query, page);
      // Якщо в результаті запиту масив фільмів порожній, виводимо повідомлення:
      if (movies.length === 0) {
        toast.error('No movies found for your request');
      }
      // Записуємо стан - загальна кількість сторінок
      setTotalPages(totalPages);
      // Повертаємо в data масив фільмів
      return movies;
    },

    // властивість яка дозволяє виконувати запит лише тоді, коли рядок запиту не порожній,
    // що запобігає виконанню запиту при початковому завантаженні компонента
    // або коли користувач не ввів нічого в рядок пошуку.
    enabled: query !== '',

    // властивість яка дозволяє на час завантаження нових даних показувати попередні або тимчасові дані,
    // щоб уникнути порожнього стану або мерехтіння інтерфейсу під час очікування відповіді від сервера.
    placeholderData: keepPreviousData,
  });
  // ---------------------------------------------------------------------------------------------

  // Функції зміни стану модального вікна (відкриття/закриття)
  const openModal = (movie: Movie) => {
    // Стан - обраний фільм
    setMovieSelect(movie);
  };

  const closeModal = () => {
    // Стан - обраний фільм - скинуте
    setMovieSelect(null);
  };

  // Функція зміни стану рядка запиту - отримує значення строки запиту і записує його в стан :
  // Зроблена в компоненті SearchBar і передана через пропс onSubmit, але можна зробити і тут,
  // тоді треба передати функцію в SearchBar через пропс onSubmit
  const handleSearch = (nameQuery: string) => {
    // Скидаємо номер сторінки на 1 при новому пошуку
    setPage(1);
    // Змінюємо стан - на значення строки запиту
    setQuery(nameQuery);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {/* Умовний рендеринг компонента ErrorMessage в залежності від стану */}
      {isError && <ErrorMessage />}
      {/* Умовний рендеринг компонента Loader в залежності від стану */}
      {isLoading && <Loader />}
      {/* Умовний рендеринг компонента ReactPaginate, якщо сторінок більше 1 */}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {/* Умовний рендеринг компонента MovieGrid в залежності від кількості фільмів */}
      {data && data.length > 0 && (
        <MovieGrid onSelect={openModal} movies={data} />
      )}
      {/* Умовний рендеринг компонента MovieModal в залежності від обраного фільму */}
      {movieSelect && <MovieModal movie={movieSelect} onClose={closeModal} />}
    </div>
  );
}
