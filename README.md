# Диагностическая сессия: блок «Знакомство»

React + Vite + TypeScript + Tailwind. Данные сохраняются в браузере (localStorage), кнопка «Очистить» внизу стирает всё.

## Запуск
Дважды кликнуть `start.command` в папке выше, сайт откроется на http://localhost:8080
Или вручную: `npm install` и `npm run dev`.

## Что менять под другого клиента
Все тексты, вопросы, имя эксперта и курсы валют: `src/config.ts`.
Фото эксперта: `public/images/expert.jpg`. Иконка вкладки: `public/favicon.svg`.

## Структура
```
src/
  App.tsx                  сборка страницы, смена валюты, «Очистить»
  config.ts                тексты и вопросы
  components/              Header, Hero, ProfileForm, LiveAnalysis, MoneySlider, Select, Segmented, Photo
  lib/                     money (шаг 50, формат 1,500), types, useLocalStorage
```

## GitHub и Lovable
Залить содержимое этой папки в репозиторий, затем в Lovable: Import from GitHub.
