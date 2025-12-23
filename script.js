// Функция для создания снежинок
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    
    // Очищаем контейнер перед созданием новых снежинок
    snowflakesContainer.innerHTML = '';
    
    // Создаем 80 снежинок
    for (let i = 0; i < 80; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        
        // Случайные параметры
        const size = Math.random() * 20 + 10;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.7 + 0.3;
        
        // Применяем стили
        snowflake.style.left = ${startX}vw;
        snowflake.style.fontSize = ${size}px;
        snowflake.style.opacity = opacity;
        snowflake.style.animation = fall ${duration}s linear infinite;
        snowflake.style.animationDelay = ${delay}s;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// Функция для создания салюта
function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    fireworksContainer.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Позиция
        const left = 20 + Math.random() * 60;
        const top = 30 + Math.random() * 40;
        
        firework.style.left = ${left}%;
        firework.style.top = ${top}%;
        firework.style.animation = explode ${Math.random() * 2 + 3}s infinite;
        firework.style.animationDelay = ${Math.random() * 2}s;
        
        fireworksContainer.appendChild(firework);
    }
}

// Функция для обновления таймера
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYear = new Date(nextYear, 0, 1, 0, 0, 0);
    
    const diff = newYear - now;
    
    // Если Новый Год уже наступил
    if (diff <= 0) {
        updateUIForNewYear();
        return;
    }
    
    // Расчет времени
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Обновление отображения
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Обновление даты
    document.getElementById('new-year-date').textContent = 1 января ${nextYear} года;
    
    // Динамическое сообщение
    updateMessage(days, hours, minutes);
    
    // Проигрываем звук тика каждую секунду
    if (soundEnabled && seconds % 5 === 0) {
        playTickSound();
    }
}

// Функция для обновления UI при наступлении Нового Года
function updateUIForNewYear() {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    
    document.getElementById('message').innerHTML = 
        '🎉 <strong>С НОВЫМ 2025 ГОДОМ!</strong> 🎉<br>' +
        'Пусть этот год принесёт вам счастье, здоровье, удачу и исполнение всех желаний!';
    
    document.getElementById('new-year-date').innerHTML = 
        '<span style="color: #FFD700">🎆 С НОВЫМ ГОДОМ! 🎆</span>';
    
    // Активируем салют
    document.querySelector('.countdown-container').classList.add('new-year-active');
    
    // Проигрываем праздничный звук
    if (soundEnabled) {
        playNewYearSound();
    }
}// Функция для обновления сообщения
function updateMessage(days, hours, minutes) {
    const messageElement = document.getElementById('message');
    let message = '';
    
    if (days > 60) {
        message = 'Время планировать новые цели и мечты на следующий год!';
    } else if (days > 30) {
        message = 'Пора задуматься о новогодних украшениях и подарках!';
    } else if (days > 14) {
        message = 'Скоро предновогодняя суета! Не забудьте про ёлку!';
    } else if (days > 7) {
        message = 'Неделя до праздника! Готовим меню и наряды!';
    } else if (days > 3) {
        message = 'Последние приготовления! Проверьте, всё ли готово к празднику!';
    } else if (days > 1) {
        message = 'Совсем скоро! Наслаждайтесь предновогодней атмосферой!';
    } else if (days === 1) {
        message = 'Завтра Новый Год! Последние штрихи и ожидание чуда!';
    } else if (hours > 12) {
        message = 'Сегодня вечером собираемся за праздничным столом!';
    } else if (hours > 6) {
        message = 'Готовьте шампанское и загадывайте желания!';
    } else if (hours > 2) {
        message = 'Приготовьте бокалы! Скром бой курантов!';
    } else if (hours > 0) {
        message = 'Почти наступило! Проведите эти часы с самыми близкими!';
    } else if (minutes > 30) {
        message = 'Считаем минуты! Волшебство совсем рядом!';
    } else {
        message = 'Каждая секунда приближает нас к новым возможностям!';
    }
    
    messageElement.textContent = message;
}

// Переменные для управления
let soundEnabled = true;
let darkTheme = false;

// Воспроизведение звуков
function playTickSound() {
    const sound = document.getElementById('tick-sound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
}

function playNewYearSound() {
    const sound = document.getElementById('new-year-sound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
}

// Переключение темы
function toggleTheme() {
    darkTheme = !darkTheme;
    if (darkTheme) {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').textContent = '☀ Светлая тема';
    } else {
        document.body.classList.remove('dark-theme');
        document.getElementById('theme-toggle').textContent = '🌙 Тёмная тема';
    }
}

// Переключение звука
function toggleSound() {
    soundEnabled = !soundEnabled;
    document.getElementById('sound-toggle').textContent = 
        soundEnabled ? '🔇 Звук выкл' : '🔊 Звук вкл';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем снежинки и салют
    createSnowflakes();
    createFireworks();
    
    // Запускаем таймер
    updateCountdown();
    
    // Обновляем каждую секунду
    setInterval(updateCountdown, 1000);
    
    // Добавляем обработчики кнопок
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('sound-toggle').addEventListener('click', toggleSound);
    
    // Эффект при наведении на блоки времени
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Пересоздаем снежинки при изменении размера окна
    window.addEventListener('resize', createSnowflakes);
});