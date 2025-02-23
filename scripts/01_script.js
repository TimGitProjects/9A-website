document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const body = document.body;

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    
    const fullImage = document.createElement('img');
    fullImage.className = 'gallery-full-image';
    
    // Добавляем кнопку закрытия
    const closeBtn = document.createElement('i');
    closeBtn.className = 'ri-close-line gallery-close';
    
    overlay.append(fullImage, closeBtn);
    document.body.appendChild(overlay);

    // Обработчики
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            fullImage.src = img.src;
            fullImage.alt = img.alt;
            overlay.classList.add('active');
            body.classList.add('no-scroll');
        });
    });

    const closeGallery = () => {
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    };

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay || e.target === fullImage) closeGallery();
    });
    
    closeBtn.addEventListener('click', closeGallery);
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') closeGallery();
    });
});

// Обновление значения рейтинга
document.getElementById('rating').addEventListener('input', function(e) {
    document.getElementById('ratingValue').textContent = e.target.value;
  });
  
  // Отправка формы
  document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Установка имени по умолчанию
    const nameField = document.getElementById('name');
    if (!nameField.value.trim()) nameField.value = 'Аноним';
  
    // Отправка через Formspree
    fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Спасибо за отзыв!');
        this.reset(); // Сброс формы
        document.getElementById('ratingValue').textContent = '5'; // Сброс рейтинга
      } else {
        response.json().then(data => {
          alert('Ошибка отправки: ' + JSON.stringify(data));
        })
      }
    })
    .catch(error => {
      alert('Произошла ошибка! Попробуйте ещё раз.');
    });
  });

