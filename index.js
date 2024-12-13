// Получаем элементы
const slides = document.querySelectorAll('.slide');
const descriptions = document.querySelectorAll('.slide-description');
const titles = document.querySelectorAll('.dropping-text');
const indicators = document.querySelectorAll('.indicator');
const indicatorsContainer = document.querySelector('.indicators');
let currentIndex = 0;
let scrollDistance = 0; // Переменная для отслеживания прокрутки
const scrollThreshold = 100; // Порог для переключения слайда (в пикселях)

// Флаг для отслеживания состояния наведения на индикаторы
let isHoveringIndicators = false;
let lastHoveredIndex = null;

let touchstartX = 0
let touchendX = 0

function checkDirection() {

    if (touchendX < touchstartX) {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            console.log('swiped left!')
        }
    }
    if (touchendX > touchstartX) {
        if (currentIndex > 0) {
            currentIndex--;
            console.log('swiped right!')
        }
    }
    scrollToSlide(currentIndex);
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})

function switchTextOnSlideChange(index) {
    const height = titles[0].offsetHeight;
    const container = document.querySelector('.dropping-texts');

    // Обновляем смещение контейнера текстов
    container.style.transform = `translateY(-${height * index}px)`;
}
function handleScreenResize() {
    // Получаем текущую ширину окна
    const screenWidth = document.documentElement.clientWidth;
    if (screenWidth < 768) {
        slides.forEach((slide, i) => {
            if (i !== currentIndex) {
                // Задаем значения для неактивных слайдов
                slide.style.opacity = '0.5';
                slide.style.transform = 'translateX(100%) scaleY(0.6) scaleX(0.9)';

            } else {
                // Активному слайду задаем значение по умолчанию
                slide.style.transform = 'translateX(0) scaleY(1) scaleX(1)';
                slide.style.opacity = '1';
            }
        });
    } else if (screenWidth > 768) {
        slides.forEach((slide, i) => {
            if (i !== currentIndex) {
                // Задаем значения для неактивных слайдов
                slide.style.transform = 'translateY(100%) scaleY(0.6) scaleX(0.9)';
                slide.style.opacity = '0.5';
            } else {
                // Активному слайду задаем значение по умолчанию
                slide.style.transform = 'translateY(0) scaleY(1) scaleX(1)';
                slide.style.opacity = '1';
            }
        });
    }
}

// Слушаем изменение размера окна
window.addEventListener('resize', handleScreenResize);

// Функция для установки значений по умолчанию всем слайдам
function setDefaultSlideStyles(width) {
    if (width < 768) {
        slides.forEach((slide, i) => {
            if (i !== currentIndex) {
                // Задаем значения для неактивных слайдов
                slide.style.opacity = '0.5';
                slide.style.transform = 'translateX(100%) scaleY(0.6) scaleX(0.9)';

            } else {
                // Активному слайду задаем значение по умолчанию
                slide.style.transform = 'translateX(0) scaleY(1) scaleX(1)';
                slide.style.opacity = '1';
            }
        });
    } else if (width > 768) {
        slides.forEach((slide, i) => {
            if (i !== currentIndex) {
                // Задаем значения для неактивных слайдов
                slide.style.transform = 'translateY(100%) scaleY(0.6) scaleX(0.9)';
                slide.style.opacity = '0.5';
            } else {
                // Активному слайду задаем значение по умолчанию
                slide.style.transform = 'translateY(0) scaleY(1) scaleX(1)';
                slide.style.opacity = '1';
            }
        });
    }
}

// Вызов функции для установки значений при первичной загрузке
window.addEventListener('load', () => {
    setDefaultSlideStyles(document.documentElement.clientWidth);

});

// Функция для обработки переключения слайда
function scrollToSlide(index) {
    const screenWidth = document.documentElement.clientWidth;
    // console.log(screenWidth, document.documentElement.clientWidth)
    currentIndex = index;
    if (screenWidth < 768) {
        slides.forEach((slide, i) => {
            const offset = i - index;
            if (isHoveringIndicators && lastHoveredIndex === null) {
                // Если курсор над блоком всех индикаторов, уменьшаем масштаб для всех слайдов, кроме текущего
                slide.style.transform = `translateX(${offset * 100}%) scale(${i === currentIndex ? 0.95 : 0.8}) `;
                slide.style.borderRadius = '90px';
            } else if (lastHoveredIndex !== null) {
                // Если курсор над конкретным индикатором
                slide.style.transform = `translateX(${offset * 100}%) scale(${i === lastHoveredIndex ? 0.95 : 0.8})`;
                slide.style.borderRadius = '90px';
            } else {
                // Обычное состояние (когда курсор не на индикаторах)
                const scaleY = offset === 0 ? 1 : 0.6;
                const scaleX = offset === 0 ? 1 : 0.9;
                slide.style.transform = `translateX(${offset * 100}%) scaleY(${scaleY}) scaleX(${scaleX}) `;
                slide.style.borderRadius = '10px';
            }

            slide.style.opacity = offset === 0 ? '1' : '0.5';
        });
    } else {
        slides.forEach((slide, i) => {
            const offset = i - index;

            if (isHoveringIndicators && lastHoveredIndex === null) {
                // Если курсор над блоком всех индикаторов, уменьшаем масштаб для всех слайдов, кроме текущего
                slide.style.transform = `translateY(${offset * 100}%) scale(${i === currentIndex ? 0.95 : 0.8}) `;
                slide.style.borderRadius = '90px';
            } else if (lastHoveredIndex !== null) {
                // Если курсор над конкретным индикатором
                slide.style.transform = `translateY(${offset * 100}%) scale(${i === lastHoveredIndex ? 0.95 : 0.8})`;
                slide.style.borderRadius = '90px';
            } else {
                // Обычное состояние (когда курсор не на индикаторах)
                const scaleY = offset === 0 ? 1 : 0.6;
                const scaleX = offset === 0 ? 1 : 0.9;
                slide.style.transform = `translateY(${offset * 100}%) scaleY(${scaleY}) scaleX(${scaleX}) `;
                slide.style.borderRadius = '10px';
            }

            slide.style.opacity = offset === 0 ? '1' : '0.5';
        });
    }

    slides.forEach((title, i) => {
        if (i === index) {
            title.classList.add('active');
        } else {
            title.classList.remove('active');
        }
    });

    descriptions.forEach((description, i) => {
        description.classList.remove('active');
    });

    titles.forEach((title, i) => {
        if (i === index) {
            title.classList.add('active');
        } else {
            title.classList.remove('active');
        }
    });

    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    setTimeout(() => {
        descriptions[currentIndex].classList.add('active');
    }, 800);
    switchTextOnSlideChange(index);
}

// Наведение на блок всех индикаторов: переключение слайдов и масштаб
indicatorsContainer.addEventListener('mouseenter', () => {
    isHoveringIndicators = true;
    lastHoveredIndex = null; // Сброс индикатора, чтобы масштабировать все слайды
    scrollToSlide(currentIndex); // Обновление слайдов при наведении
});

// Уход курсора с блока индикаторов: возвращение состояния слайдов
indicatorsContainer.addEventListener('mouseleave', () => {
    isHoveringIndicators = false;
    lastHoveredIndex = null; // Сбрасываем индекс
    scrollToSlide(currentIndex); // Возвращаемся к текущему слайду
});

// Обработчик для движения мыши по индикаторам
indicators.forEach((indicator, index) => {
    indicator.addEventListener('mouseenter', () => {
        isHoveringIndicators = true; // Устанавливаем флаг, что курсор находится на индикаторе
        lastHoveredIndex = index; // Запоминаем индекс текущего индикатора
        scrollToSlide(lastHoveredIndex); // Переключаем слайд при наведении
    });

    indicator.addEventListener('mouseleave', () => {
        if (isHoveringIndicators) {
            lastHoveredIndex = null; // Сбрасываем индекс, когда курсор уходит с индикатора
            scrollToSlide(currentIndex); // Возвращаемся к текущему слайду
        }
    });
});

// Обработчик колесика мыши
window.addEventListener('wheel', (event) => {
    if (!isHoveringIndicators) { // Если курсор не на индикаторах
        scrollDistance += event.deltaY;

        // Проверка на достижение порога для переключения слайда
        if (Math.abs(scrollDistance) >= scrollThreshold) {
            if (scrollDistance > 0) {
                // Прокрутка вниз
                if (currentIndex < slides.length - 1) {
                    currentIndex++;

                }
            } else {
                // Прокрутка вверх
                if (currentIndex > 0) {
                    currentIndex--;
                }
            }

            scrollDistance = 0; // Сбросим прокрутку после переключения слайда
            scrollToSlide(currentIndex);
        }
    }
});


// Сброс прокрутки при отпускании колесика мыши
window.addEventListener('wheel', (event) => {
    if (event.deltaY === 0) {
        scrollDistance = 0;
    }
});

// Обработчик для клика на индикаторы (по-прежнему работает)
indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        const index = parseInt(indicator.dataset.index, 10);
        currentIndex = index;
        scrollToSlide(currentIndex);
    });
});
