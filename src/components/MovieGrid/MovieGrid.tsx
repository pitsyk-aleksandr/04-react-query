// ==========================================================================================
// Компонент MovieGrid – це список карток фільмів.
// ==========================================================================================
// Він приймає два пропси:
//    - onSelect – функцію для обробки кліку на картку фільму;
//    - movies – масив фільмів.
// ------------------------------------------------------------------------------------------

// import { useState } from 'react';

// Імпорт модуля зі стилями компонента
import css from './MovieGrid.module.css';

// Імпорт інтерфейса для одного фільму
import type { Movie } from '../../types/movie';

// Оголошення інтерфейса MovieGridProps, який описує типи для пропсів компонента.
interface MovieGridProps {
  // Типізація функцій - стандартна (через стрілочну функцію)
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

// Константа для базового URL фото
const BASE_URL = 'https://image.tmdb.org/t/p/';
const FILE_SIZE = 'w500/';

// Компонент MovieGrid
export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map(movie => (
        <li key={movie.id}>
          <div
            className={css.card}
            onClick={() => {
              onSelect(movie);
            }}
          >
            <img
              className={css.image}
              src={BASE_URL + FILE_SIZE + movie.poster_path}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
