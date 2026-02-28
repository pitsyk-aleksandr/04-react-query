// ==========================================================================================
// Компонент App є контейнером для решти компонентів
// ==========================================================================================
// Додаткові пропозиції від AI GoIT:
// 1. Стан isModalOpen не є строго необхідним, оскільки модальне вікно можна умовно рендерити
//    на основі того, чи movieSelect не є null.
//    Проте його наявність не впливає на коректність.
// 2. Патерн await fetchMovies(...).then(...) можна спростити, використовуючи
//    const movies = await fetchMovies(...), однак це не впливає на функціонал.
// ------------------------------------------------------------------------------------------

// Імпорт модуля useState - для роботи зі станом з REACT
import { useState } from 'react';

// Імпорт бібліотеки react-hot-toast (Додатково - npm install react-hot-toast)
// toast - функция вызова уведомления
// Toaster - компонент библиотеки
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

export default function App() {
  // Оголошуємо і типизуємо стан - рядок з пошуком
  // const [query, setQuery] = useState<string>('');
  // Оголошуємо і типизуємо стан - масив фільмів
  const [movies, setMovies] = useState<Movie[]>([]);
  // Оголошуємо і типизуємо стан - один обраний фільм
  const [movieSelect, setMovieSelect] = useState<Movie | null>(null);
  // Оголошуємо і типизуємо стан - рендеринг компонента Loader
  const [isLoader, setIsLoader] = useState<boolean>(false);
  // Оголошуємо і типизуємо стан - рендеринг компонента ErrorMessage
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  // Оголошуємо і типизуємо стан - Модальне вікно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Функції зміни стану модального вікна (відкриття/закриття)
  const openModal = (movie: Movie) => {
    // Стан - обраний фільм
    setMovieSelect(movie);
    // Стан - модальне вікно відкрите
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Стан - обраний фільм - скинуте
    setMovieSelect(null);
    // Стан - модальне вікно закрите
    setIsModalOpen(false);
  };

  // Функція пошуку відео за запитом - асинхронна функція
  const handleSearch = async (nameQuery: string) => {
    // Змінюємо стан - на значення строки запиту
    // setQuery(nameQuery);
    // Очищуємо стан - масив фільмів
    setMovies([]);

    // Робимо запит та перевіряємо на помилку
    try {
      // Змінюємо стан для рендеринга компонента ErrorMessage
      setIsErrorMessage(false);
      // Змінюємо стан для рендеринга компонента Loader
      setIsLoader(true);
      // Викликаємо функцію пошуку фільмів
      await fetchMovies(nameQuery).then(movies => {
        // Якщо в результаті запиту масив фільмів порожній, виводимо повідомлення:
        if (movies.length === 0) {
          toast.error('No movies found for your request');
        } else {
          // Записуємо стан - масив фільмів
          setMovies(movies);
        }
      });
    } catch {
      // Змінюємо стан для рендеринга компонента ErrorMessage
      setIsErrorMessage(true);
    } finally {
      // Змінюємо стан для рендеринга компонента Loader
      setIsLoader(false);
    }
  };

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {/* Умовний рендеринг компонента ErrorMessage в залежності від стану */}
      {isErrorMessage && <ErrorMessage />}
      {/* Умовний рендеринг компонента Loader в залежності від стану */}
      {isLoader && <Loader />}
      {/* Умовний рендеринг компонента MovieGrid в залежності від кількості фільмів */}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {/* Умовний рендеринг компонента MovieModal в залежності від стану модального вікна */}
      {isModalOpen && <MovieModal movie={movieSelect} onClose={closeModal} />}
    </div>
  );
}
