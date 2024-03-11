# Valantis Project

Valantis Project - это веб-приложение для просмотра и фильтрации продуктов, используя API Valantis. 
Приложение включает в себя функциональность поиска по продуктам, фильтрацию по цене и бренду, а также пагинацию результатов.

#  Требования: 
<ul align ="start">
  <li>используя предоставленный апи создать страницу, которая отображает список товаров. </li>
  <li>для каждого товара должен отображаться его id, название, цена и бренд. </li>
  <li>выводить по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны. </li>
  <li>возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду. </li>
  <li>eсли API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются.</li>
  <li>eсли API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос. </li>
</ul>

## Докуменатция:
<a href="https://github.com/ValantisJewelry/TestTaskValantis/blob/main/API.md"> Документация по работе с API</a>

## Stack:
<ul align ="start">
  <li>JavaScript </li>
  <li>SCSS </li>
  <li>HTML </li>
</ul>

## Зависимости:
<p>Проект использует следующие основные зависимости: </p>

<li>md5 для хеширования паролей.</li>
<li>fetch API для выполнения HTTP-запросов к API.</p>

# Описание проекта

В этом проекте используется архитектурный паттерн Model-View-Controller (MVC), который способствует чёткому разделению кода на модель, представление и контроллер. Этот подход упрощает управление зависимостями, повышает масштабируемость и облегчает тестирование различных частей приложения.

## Почему был выбран MVC

- **Разделение ответственности:** MVC позволяет разделить приложение на три ключевых компонента, облегчая таким образом управление кодом и его тестирование.
- **Гибкость в разработке:** Разработчики могут работать параллельно над моделью, представлением и контроллером, что ускоряет процесс разработки.
- **Легкость масштабирования:** Благодаря чёткому разделению, приложение легко масштабируется за счёт добавления новых функций и изменения логики без вмешательства в пользовательский интерфейс.

## Преимущества использования MVC в этом проекте

1. **Облегчает тестирование:** Независимость модели от пользовательского интерфейса позволяет тестировать логику приложения отдельно от UI.
2. **Улучшает управление состоянием:** Централизованное управление состоянием упрощает отслеживание изменений в данных и их обновление.
3. **Повышает гибкость UI:** Представления могут быть легко изменены или обновлены без необходимости переписывать модель или контроллер.

## Хорошие практики, применяемые в проекте

- **Асинхронная инициализация:** Использование асинхронных функций обеспечивает эффективную загрузку данных и отзывчивость приложения.
- **Модульность:** Компоненты MVC разделены на отдельные модули, что упрощает управление зависимостями и повторное использование кода.
- **Обработка ошибок и отображение индикаторов загрузки:** Методы для отображения ошибок и загрузки улучшают взаимодействие с пользователем.

