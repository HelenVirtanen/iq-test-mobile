# iq-test-mobile

Проект представляет собой реализацию простого IQ теста с адаптацией под различные разрешения экранов.

**Содержание:**
1) Меню в хедере и бургер-меню для мобильной версии. 
- добавлено скрытие и отображение бургер-меню в зависимости от разрешения экрана.
2) Общее описание теста (4 секции). 
- добавлена анимация кнопок.
3) Серия вопросов с вариантами ответа (11 вопросов, выбор радиокнопки, цвета, номера). 
- добавлена анимация вариантов выбора, изменения ширины прогресс-бара.
4) Лоадер с анимацией для визуализации обработки результатов.
5) Итоговая секция с результатами теста, таймером и возможностью выполнить API GET-запрос. 
- полученные данные выводятся в табличной форме под кнопкой. 

**Реализована логика на нативном JavaScript** следующих элементов:
- переход по ссылкам меню;
- переход последовательно по вопросам (и обратно к предыдущим вопросам по backspace);
- возврат в начало по ссылкам лого, названия теста в хедере, ссылке в меню;
- таймер;
- сброс выбранных вариантов и таймера при возврате в начало;
- выполнение API-запроса.

**Клонирование репозитория: **
https://github.com/HelenVirtanen/iq-test-mobile.git

