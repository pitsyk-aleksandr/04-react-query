// ==========================================================================================
// Компонент SearchBar - Хедер з формою пошуку
// ==========================================================================================
// Компонент SearchBar приймає один пропс :
// onSubmit – функцію для передачі значення інпуту під час сабміту форми.
// ------------------------------------------------------------------------------------------

// Імпорт модуля зі стилями компонента
import styles from "./SearchBar.module.css";

// Імпорт бібліотеки react-hot-toast (Додатково - npm install react-hot-toast)
// toast - функция вызова уведомления
import toast from "react-hot-toast";

// Оголошення інтерфейса SearchBarProps, який описує типи для пропсів компонента.
interface SearchBarProps {
  // Типізація функцій - стандартна (через стрілочну функцію)
  onSubmit: (query: string) => void;
}

// Компонент SearchBar
export default function SearchBar({ onSubmit }: SearchBarProps) {
  // Функція - обробник події Submit форми - через Form Action
  // Отримуємо значення поля <input name="query" />
  const handleSubmit = (formData: FormData) => {
    const nameQuery = formData.get("query") as string;
    // Перевірка значення поля
    if (nameQuery === "") {
      // Якщо поле пусте, то виводиться повідомлення про помилку
      toast.error("Please enter your search query.");
      // Вихід з функції
      return;
    }
    // Якщо поле не пусте, то викликається функція з Props з передачею строки запиту
    onSubmit(nameQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
