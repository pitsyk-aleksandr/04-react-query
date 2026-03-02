// ==========================================================================================
// Функція fetchMovies для виконання HTTP-запитів
// ==========================================================================================
// Типізуйте її параметри, результат, який вона повертає, та відповідь від Axios.

// Імпорт бібліотеки axios
import axios from 'axios';

// Імпорт інтерфейса для одного фільму
import { type Movie } from '../types/movie';

// Типізація відповіді від Axios
interface MoviesHttpResponse {
  results: Movie[]; // Відповідь містить масив фільмів у властивості results
  total_pages: number; // Загальна кількість сторінок результатів
}

// Отримуємо значення змінної оточення (з файлу .env)
// Не забуваємо додати .env в файл .gitignore !!!
// Додатково треба додати в Versel (Settings → Environment Variables)
const myKey = import.meta.env.VITE_TMDB_TOKEN;
const myAuthorization = 'Bearer ' + myKey;

export async function fetchMovies(
  nameQuery: string,
  pageCurrent: number = 1
): Promise<{ movies: Movie[]; totalPages: number }> {
  const url = `https://api.themoviedb.org/3/search/movie?query=${nameQuery}&include_adult=false&language=en-US&page=${pageCurrent}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: myAuthorization,
    },
  };
  // Виконуємо HTTP-запит
  const response = await axios.get<MoviesHttpResponse>(url, options);
  // console.log('response');
  // console.log(response);
  // console.log('response.data');
  // console.log(response.data);
  // Повертаємо значення results та total_pages відповіді
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
  };
}
