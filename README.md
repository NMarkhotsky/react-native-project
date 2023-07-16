# <div align=center>React Native project</div>
 
 <div align=center>Download app⬇️</div>


 <div align=center>
   
   ![Screenshot_8](https://github.com/NMarkhotsky/react-native-project/assets/111852661/a207ff45-f3b7-48a2-94e4-fdedee61893d) 
 
 </div>

###
![MyCollages](https://github.com/NMarkhotsky/react-native-project/assets/111852661/9a4e4e67-5912-47ee-a198-a2e3212e2499)
###
## <div align=center>Завдання 1: Підготовка до роботи</div>
1. Встановити `expo`
2. Встановити `Android Studio`
3. Встановити `Xcode` (якщо працюєте на Mac)
4. Ініціалізувати проект за допомогою `expo` (Вибираємо шаблон проекту `blank`)
5. Запустити проект
6. Налаштувати `Android Studio`
7. Налаштувати `Xcode` (якщо працюєте на Mac)
8. Встановити `expo client` собі на телефон
9. Запустити створений проект на телефоні, емуляторі `Android`, симуляторі `iOS` (якщо працюєте на Mac)
#
## <div align=center>Завдання 2: Верстка екранів. Робота зі стилями. Дебаг</div>
1. Створити папку `Screens`
2. Створити компонент `RegistrationScreen`
3. Створити компонент `LoginScreen`
4. Створити екран `PostsScreen`
5. Додати розмітку форми в компонент `RegistrationScreen`
6. Додати розмітку форми в компонент `LoginScreen`
7. Додати стилі до компонента `RegistrationScreen`
8. Додати стилі до компонента `LoginScreen`
###
- [Макет компонента RegistrationScreen](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?type=design&node-id=3-26)
- [Макет компонента LoginScreen](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=12-0&t=tkIKc4K19uOKNunb-0)
#
## <div align=center>Завдання 3: Обробка подій. Робота із текстовими інпутами та клавіатурою</div>
- Додати логіку роботи з формою в компонент `RegistrationScreen`
- Додати логіку роботи з формою в компонент `LoginScreen`
- Під час сабміту форм збирати дані з них і виводити в консоль
- Додати автозакриття клавіатури по кліку за межами форм (Використовуємо `Keyboard.dismiss`)
#
## <div align=center>Завдання 4: Навігація</div>
1. Створити екран `CreatePostsScreen`
2. Створити екран `CommentsScreen`
3. Створити екран `ProfileScreen`
4. Створити екран `MapScreen`
5. Створити екран `Home`
6. Підключити в проект навігацію.
7. Додати в проект переходи між екранами `LoginScreen`, `RegistrationScreen` за допомогою компонента `createStackNavigator`
8. З `RegistrationScreen` можна перейти на `LoginScreen`, натиснувши на текст <b>Увійти</b>
9. З `LoginScreen` можна перейти на `RegistrationScreen`, натиснувши на текст <b>Зареєструватися</b>
10. Після сабміту в `LoginScreen`, `RegistrationScreen` перекидає на `Home`, де відразу показується екран `PostsScreen`
11. Підключити нижню навігацію, використовуючи `createBottomTabNavigator`
12. У нижній навігації створити 3 переходи.
13. Клік по іконці №1 веде на екран `PostsScreen`
14. Клік по іконці №2 веде на екран `CreatePostsScreen`
15. Клік по іконці №3 веде на екран `ProfileScreen`
16. В хедері на екрані `PostsScreen` додати іконку для `logout`
17. Стилізувати нижню навігацію
###
- [Макет компонента PostsScreen без контенту](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=12-47)
- [Макет компонента PostsScreen з постами](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-86&t=zLy5KtBgsPgUDWY3-0)
- [Макет компонента CreatePostsScreen при переході на компонент](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-13&t=4MUcNtbjSdtiKXV7-0)
- [Макет компонента ProfileScreen](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-13&t=kFkFeqKaLVknGboO-0)
- [Інтерактивний приклад навігації в застосунку](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-86&t=YKQMU635gnlpvN39-0)
#
## <div align=center>Завдання 5: Нативні компоненти</div>
1. Підключити камеру в компонент `CreatePostsScreen`;
2. Під час відкриття екрану `CreatePostsScreen` активується камера і зображення з неї виводиться в блок з іконкою камери
3. По кліку на іконку камери робиться знімок
4. В інпут з плейсхолдером `Назва` можна додати назву фото
5. В інпут з плейсхолдером `Місцевість` можна додати назву, де було зроблено знімок
6. Додати визначення геолокації в момент створення посту при кліку на кнопку `Опублікувати`
7. Після створення посту повинно перенаправляти на екран `PostsScreen`
8. В компоненті окремого посту при кліку на іконку коментарів перекидає на екран `CommentsScreen`
9. У компоненті окремого посту під час кліку на іконку геолокації перекидає на екран `MapScreen`, де можна побачити мапу з маркером, де була зроблена фотографія.
###
- [Макет компонента CommentsScreen з коментарями](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=41-0&t=vDyJjIvhOk6v4uZ7-0)
- [Макет компонента CreatePostsScreen під час відкриття екрану](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-86&t=hdpZPYSLTyS7klkX-0)
- [Макет компонента CreatePostsScreen після зробленого фото](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=36-13&t=5kWIH0XRsJwnJfHy-0)
- [Макет компонента MapScreen](https://www.figma.com/file/YqWLNarVE4x1zkXa6PYJfi/Homework-(Copy)-(Copy)?node-id=43-54&t=58UisgPOnMIySl1m-0)
#
## <div align=center>Завдання 6: Redux і Firebase</div>
1. Підключити `Redux` до проекту
2. Підключити `Firebase` до проекту
3. Додати логіку реєстрації на екрані `RegistrationScreen` через методи `Firebase`
4. Додати логіку логіна на екрані `LoginScreen` через методи `Firebase`
5. Оновити профіль користувача на `Firebase` та додати туди логін у поле `displayName` після реєстрації
6. Зберігати дані про користувача в `Redux` після реєстрації або логінізації
7. Додати перевірку, чи залогінений користувач у застосунку чи ні. Якщо залогінений, то відразу перенаправляти на екран `PostsScreen`, інакше - на екран `LoginScreen`
8. Додати логіку `Logout` на екрані `PostsScreen` під час натискання на іконку в хедері, використовуючи методи `Firebase`
9. Додати логіку завантаження постів у базу даних, використовуючи `Firebase` та `Redux`
10. Додати логіку додавання коментаря під постом, використовуючи `Firebase` та `Redux`

#
## <div align=center>Завдання 7: Деплой на сервери expo</div>
- Викласти проект на сервери `expo`
