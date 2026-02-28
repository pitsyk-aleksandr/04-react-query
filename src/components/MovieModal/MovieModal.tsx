// ==========================================================================================
// Компонент MovieModal – це модальне вікно.
// ==========================================================================================
// Під час натискання на зображення галереї повинно відкриватися модальне вікно,
// яке відображатиме додаткову інформацію про фільм у великому форматі.
// ------------------------------------------------------------------------------------------
// Компонент MovieModal використовується в компоненті App
// MovieModal отримує два пропси:
//      - movie - посилання на об’єкт обраного фільма;
//      - onClose - функцію закриття модального вікна.
// ------------------------------------------------------------------------------------------

// Функція createPortal дозволяє рендерити компонент в інше місце DOM-дерева,
// зазвичай безпосередньо в <body>.
import { createPortal } from 'react-dom';

import { useEffect } from 'react';

// Імпорт інтерфейса для одного фільму
import type { Movie } from '../../types/movie';

// Імпорт модуля зі стилями компонента
import css from './MovieModal.module.css';

// Оголошення інтерфейса MovieModalProps, який описує типи для пропсів компонента.
interface MovieModalProps {
  // movie - посилання на об’єкт обраного фільма (null - якщо не вибраний спочатку)
  movie: Movie | null;
  // onClose - функція закриття модального вікна
  // Типізація функцій - стандартна (через стрілочну функцію)
  onClose: () => void;
}

// Константа для базового URL фото
const BASE_URL = 'https://image.tmdb.org/t/p/';
const FILE_SIZE_ORIGINAL = 'original/';

// Компонент MovieModal
export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Функція закриття модального вікна по кліку на Backdrop
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Еффект для перевірки натискання клавіші Esc
  useEffect(() => {
    // Обробник події - натискання клавіатури
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    // Додаємо слухач клавіатури на весь документ
    document.addEventListener('keydown', handleKeyDown);
    // Додаємо у useEffect код блокуання скролу при відкритті модалки
    document.body.style.overflow = 'hidden';
    return () => {
      // Видалення слухача клавіатури
      document.removeEventListener('keydown', handleKeyDown);
      // Видаляємо з useEffect код блокуання скролу
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Створення розмітки компонента в кінці елемента document.body
  // Умовний рендеринг (movie &&), якщо movie - НЕ null
  return createPortal(
    movie && (
      <div
        className={css.backdrop}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.modal}>
          <button
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          <img
            src={BASE_URL + FILE_SIZE_ORIGINAL + movie.backdrop_path}
            alt={movie.title}
            className={css.image}
          />
          <div className={css.content}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
          </div>
        </div>
      </div>
    ),
    document.body
  );
}
