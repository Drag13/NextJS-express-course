# Клієнтський Роутінг в Next.JS

Всім привіт, вітаю вас на експрес курсі Next.JS для початківців. Мене звати Віталій Рубан, я працюю в компанії Ітера і сьогодні у нас тема - Клієнтський Роутінг в Next.JS

Я розповім про

- сторінка, парамс, групування
- Layout та вкладені роути
- Додаємо сторінку про автора
- Додаємо сторінку для статті з парамс

Починаємо

Роутінг в Next відрізняються від звичного нам React Router Dom. Головна відмінність полягає в тому, що в Next будує роутинг автоматично використовуючи за основу структуру вашого проекту. Так, якщо у вас є тека about в якій лежить файл `page.jsx` або `page.tsx`, NextJS автоматично створить роут about в якому буде відображений зміст page.tsx

При цьому є два важливих правила. Перше правило: Вхідна точка для роутінга це файл який обов'язково називається `page.js/jsx/ts/tsx`. Файли які називаються по іншому є звичайними компонентами і не приймають участі в роутінгу.
Друге правило полягає в тому, що кожен Page.jsx має мати дефолтний експорт. Як бачите, базовий роутінг дійсно не складний.

Окрім статичний роутів (тобто таких які відомі наперед) Next.JS підтримує динамічні роути. Типовий приклад динамічного роуту book/123, де 123 це параметер який може приймати будь-яке значення - ми таке вже бачили в React-Router-Dom. Все що потрібно для динамічного роутінгу - це використати квадратні дужки в назві теки. Мій приклад з книгою за номером 123, на Next.JS буде виглядати так:
`/book/[id]/page.tsx`. Синтаксис може не очевидний, але простий. 

Починаючи з версії 13.4 Next.JS також підтримує Layout. Все що потрібно щоб додати layout до сторінки - створити файл layout.tsx p з дефолтним експортом. Next.JS передасть туди children, який ви зможете відобразити так як треба. 

Також доступні вкладені роути та вкладені layout

Давайте подивимось на це на практиці

Наприклад ./book/:id де id - це змінна