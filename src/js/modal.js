import addPostToTimeline from './posts';
import parseCoordinates from './coordinates';

export default function showModal(type, content) {
  const modal = document.querySelector('.modal');
  const manualCoordsInput = document.querySelector('.manual-coords');
  const manualCoordsBtn = document.querySelector('.manual-coords-btn');
  const textInput = document.querySelector('.text-input');

  modal.style.display = 'block';
  manualCoordsInput.value = '';
  manualCoordsInput.focus();

  /* eslint-disable no-use-before-define */

  const removeEventListeners = () => {
    manualCoordsBtn.removeEventListener('click', addPost);
    manualCoordsInput.removeEventListener('keypress', handleKeyPress);
  };

  const addPost = () => {
    const manualCoords = manualCoordsInput.value.trim();
    try {
      const coords = parseCoordinates(manualCoords);
      addPostToTimeline(type, content, `[${coords.latitude}, ${coords.longitude}]`);
      modal.style.display = 'none';
      textInput.focus();
      removeEventListeners();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPost();
    }
  };

  /* eslint-enable no-use-before-define */

  manualCoordsBtn.addEventListener('click', addPost);
  manualCoordsInput.addEventListener('keypress', handleKeyPress);

  const closeModal = () => {
    removeEventListeners();
    modal.style.display = 'none';
  };

  const modalCloseBtn = document.querySelector('.modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  document.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';
    });
  }
});

/* import addPostToTimeline from './posts';
import parseCoordinates from './coordinates';

export default function showModal(type, content) {
  const modal = document.querySelector('.modal');
  const manualCoordsInput = document.querySelector('.manual-coords');
  const manualCoordsBtn = document.querySelector('.manual-coords-btn');
  const textInput = document.querySelector('.text-input');

  modal.style.display = 'block';
  manualCoordsInput.value = '';
  manualCoordsInput.focus();

  const addPost = () => {
    const manualCoords = manualCoordsInput.value.trim();
    try {
      const coords = parseCoordinates(manualCoords);
      addPostToTimeline(type, content, `[${coords.latitude}, ${coords.longitude}]`);
      modal.style.display = 'none';
      textInput.focus();

      manualCoordsBtn.removeEventListener('click', addPost);
      manualCoordsInput.removeEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addPost();
        }
      });
    } catch (error) {
      alert(error.message);
    }
  };

  manualCoordsBtn.addEventListener('click', addPost);
  manualCoordsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPost();
    }
  });

  const closeModal = () => {
    manualCoordsBtn.removeEventListener('click', addPost);
    manualCoordsInput.removeEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addPost();
      }
    });
    modal.style.display = 'none';
  };

  const modalCloseBtn = document.querySelector('.modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  document.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';
    });
  }
});
 */
/* import addPostToTimeline from './posts';
import parseCoordinates from './coordinates';

export default function showModal(type, content) {
  const modal = document.querySelector('.modal');
  const manualCoordsInput = document.querySelector('.manual-coords');
  const manualCoordsBtn = document.querySelector('.manual-coords-btn');
  const textInput = document.querySelector('.text-input');

  modal.style.display = 'block';
  manualCoordsInput.value = '';
  manualCoordsInput.focus();

  const addPost = () => {
    const manualCoords = manualCoordsInput.value.trim();
    try {
      const coords = parseCoordinates(manualCoords);
      addPostToTimeline(type, content, `[${coords.latitude}, ${coords.longitude}]`);
      modal.style.display = 'none';
      textInput.focus();

      manualCoordsBtn.removeEventListener('click', addPost);
      manualCoordsInput.removeEventListener('keypress', handleKeyPress);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPost();
    }
  };

  manualCoordsBtn.addEventListener('click', addPost);
  manualCoordsInput.addEventListener('keypress', handleKeyPress);
}

document.addEventListener('DOMContentLoaded', () => {
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';
    });
  }
});
 */
