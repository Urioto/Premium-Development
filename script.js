// Получаем все элементы с классом '.service'
const services = document.querySelectorAll('.service');

services.forEach(service => {
    // Наводим курсор на блок
    service.addEventListener('mouseover', () => {
        // Плавное исчезновение краткого текста
        const serviceText = service.querySelector('.service-text');
        const fullText = service.querySelector('.service-full-text');

        // Скрываем краткое описание
        serviceText.style.transition = 'opacity 0.5s ease';
        serviceText.style.opacity = 0;

        // Увеличиваем блок сразу, не дожидаясь исчезновения текста
        service.classList.add('expanded'); // Увеличиваем блок

        // Плавное появление полного описания
        setTimeout(() => {
            fullText.style.transition = 'opacity 0.5s ease, max-height 0.5s ease';
            fullText.style.opacity = 1;
            fullText.style.maxHeight = '300px'; // Разворачиваем описание
        }, 0); // Без задержки для появления полного текста
    });

    // Убираем курсор с блока
    service.addEventListener('mouseout', () => {
        // Скрываем полное описание
        const serviceText = service.querySelector('.service-text');
        const fullText = service.querySelector('.service-full-text');

        // Плавное исчезновение полного текста
        fullText.style.transition = 'opacity 0.5s ease, max-height 0.5s ease';
        fullText.style.opacity = 0;
        fullText.style.maxHeight = '0'; // Скрываем блок с полным текстом

        // Уменьшаем блок сразу, не дожидаясь исчезновения полного текста
        service.classList.remove('expanded'); // Уменьшаем блок

        // Плавное возвращение краткого текста
        setTimeout(() => {
            serviceText.style.transition = 'opacity 0.5s ease';
            serviceText.style.opacity = 1;
        }, 500); // Задержка, чтобы полное описание исчезло
    });
});

// Получаем все элементы проекта и кнопки
const projects = document.querySelectorAll('.project-container');
const prevProjectButton = document.querySelector('.prev-project');
const nextProjectButton = document.querySelector('.next-project');
const prevImageButtons = document.querySelectorAll('.prev-image');
const nextImageButtons = document.querySelectorAll('.next-image');

// Индекс текущего проекта
let currentProjectIndex = 0;

// Функция для обновления видимости проектов
function updateProjects() {
    // Скрыть все проекты
    projects.forEach((project, index) => {
        if (index === currentProjectIndex) {
            project.style.display = 'flex'; // Показываем текущий проект
        } else {
            project.style.display = 'none'; // Скрываем остальные проекты
        }
    });

    // Сбрасываем отображение изображений при переключении проекта
    const currentProjectImages = projects[currentProjectIndex].querySelectorAll('.project-img');
    currentProjectImages.forEach((image, index) => {
        if (index === 0) {
            image.style.display = 'block'; // Показываем первое изображение
        } else {
            image.style.display = 'none'; // Прячем остальные
        }
    });
}

// Функция для перехода к предыдущему проекту
function showPrevProject() {
    if (currentProjectIndex > 0) {
        currentProjectIndex--;
    } else {
        currentProjectIndex = projects.length - 1; // Переход к последнему проекту
    }
    updateProjects();
}

// Функция для перехода к следующему проекту
function showNextProject() {
    if (currentProjectIndex < projects.length - 1) {
        currentProjectIndex++;
    } else {
        currentProjectIndex = 0; // Переход к первому проекту
    }
    updateProjects();
}

// Функция для переключения изображений в проекте
function switchImage(projectIndex, direction) {
    const projectImages = projects[projectIndex].querySelectorAll('.project-img');
    let currentImageIndex = 0;

    // Находим активное изображение
    projectImages.forEach((image, index) => {
        if (image.style.display !== 'none') {
            currentImageIndex = index;
        }
    });

    // Скрываем текущее изображение
    projectImages[currentImageIndex].style.display = 'none';

    // Определяем новое изображение
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex === 0) ? projectImages.length - 1 : currentImageIndex - 1;
    } else if (direction === 'next') {
        currentImageIndex = (currentImageIndex === projectImages.length - 1) ? 0 : currentImageIndex + 1;
    }

    // Показываем новое изображение
    projectImages[currentImageIndex].style.display = 'block';
}

// Привязываем обработчики к кнопкам проектов
prevProjectButton.addEventListener('click', showPrevProject);
nextProjectButton.addEventListener('click', showNextProject);

// Привязываем обработчики к кнопкам смены изображений
prevImageButtons.forEach((button, index) => {
    button.addEventListener('click', () => switchImage(currentProjectIndex, 'prev'));
});

nextImageButtons.forEach((button, index) => {
    button.addEventListener('click', () => switchImage(currentProjectIndex, 'next'));
});

// Изначально показываем первый проект
updateProjects();

// Модальное окно для увеличения изображения
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const caption = document.getElementById('caption');
const closeModal = document.getElementsByClassName('close')[0];

// Функция для открытия модального окна с увеличенным изображением
function openModal(image) {
    modal.style.display = "block";
    modalImage.src = image.src;
    caption.innerHTML = image.alt; // Можем добавить описание изображения, если оно есть
}

// Обработчик для закрытия модального окна
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Закрытие модального окна при клике вне его области
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Вставляем обработчик для всех изображений в проекте
const projectImages = document.querySelectorAll('.project-img');
projectImages.forEach(image => {
    image.addEventListener('click', () => openModal(image));
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal");
    if (modal) {
        modal.style.display = "none"; // Скрываем модальное окно при загрузке
    }
});