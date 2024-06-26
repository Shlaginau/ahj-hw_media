import showModal from './modal';
import addPostToTimeline from './posts';
import getGeolocation from './geolocation';

let mediaRecorder;
let audioChunks = [];
let recordInterval;
let recordTime = 0;
let recording = false;

document.addEventListener('DOMContentLoaded', () => {
  const textPostBtn = document.querySelector('.add-text-post-btn');
  const textInput = document.querySelector('#textInput');
  const audioRecordBtn = document.querySelector('.start-audio-record-btn');
  const stopAudioRecordBtn = document.querySelector('.stop-audio-record-btn');
  const cancelAudioRecordBtn = document.querySelector('.cancel-audio-record-btn');
  const recordTimer = document.querySelector('.record-timer');
  const videoPostBtn = document.querySelector('.start-video-record-btn');

  const updateTimer = () => {
    recordTime += 1;
    const minutes = Math.floor(recordTime / 60);
    const seconds = recordTime % 60;
    recordTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const addTextPost = () => {
    const textInputValue = textInput.value.trim();
    if (!textInputValue) {
      alert('Введите текст сообщения');
      return;
    }
    getGeolocation().then((coords) => {
      addPostToTimeline('text', textInputValue, coords);
      textInput.value = '';
      textInput.focus();
    }).catch(() => {
      showModal('text', textInputValue);
    });
  };

  textPostBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTextPost();
  });

  textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTextPost();
    }
  });

  const addVideoPost = () => {
    alert('Функция в разработке');
  };

  videoPostBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addVideoPost();
  });

  const startRecording = () => {
    audioChunks = [];
    recordTime = 0;
    updateTimer();
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm; codecs=opus' });
        mediaRecorder.start();
        recording = true;
        recordInterval = setInterval(updateTimer, 1000);

        recordTimer.style.display = 'inline';
        stopAudioRecordBtn.style.display = 'inline';
        cancelAudioRecordBtn.style.display = 'inline';
        audioRecordBtn.style.display = 'none';
        videoPostBtn.style.display = 'none';

        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          clearInterval(recordInterval);
          if (recording) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm; codecs=opus' });
            const audioUrl = URL.createObjectURL(audioBlob);
            getGeolocation().then((coords) => {
              addPostToTimeline('audio', audioUrl, coords);
            }).catch(() => {
              showModal('audio', audioUrl);
            });
          }
        });
      })
      .catch(() => {
        alert('Не удалось получить доступ к микрофону');
      });
  };

  const stopRecording = () => {
    recording = true;
    mediaRecorder.stop();
    recordTimer.style.display = 'none';
    stopAudioRecordBtn.style.display = 'none';
    cancelAudioRecordBtn.style.display = 'none';
    audioRecordBtn.style.display = 'inline';
    videoPostBtn.style.display = 'inline';
  };

  const cancelRecording = () => {
    recording = false;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    audioChunks = [];
    clearInterval(recordInterval);
    recordTimer.textContent = '00:00';
    recordTimer.style.display = 'none';
    stopAudioRecordBtn.style.display = 'none';
    cancelAudioRecordBtn.style.display = 'none';
    audioRecordBtn.style.display = 'inline';
    videoPostBtn.style.display = 'inline';
  };

  audioRecordBtn.addEventListener('click', startRecording);
  stopAudioRecordBtn.addEventListener('click', stopRecording);
  cancelAudioRecordBtn.addEventListener('click', cancelRecording);
});

/* import { showModal } from './modal.js';
import { addPostToTimeline } from './posts.js';
import { getGeolocation } from './geolocation.js';

document.addEventListener('DOMContentLoaded', () => {
    const textPostBtn = document.querySelector('.add-text-post-btn');
    const textInput = document.querySelector('.text-input');
    const videoPostBtn = document.querySelector('.start-video-record-btn');

    const addTextPost = () => {
        const textInputValue = textInput.value.trim();
        console.log("Text Input Value:", textInputValue); // Отладочное сообщение
        if (!textInputValue) {
            alert('Введите текст сообщения');
            return;
        }
        getGeolocation().then(coords => {
            console.log("Geolocation Coordinates:", coords); // Отладочное сообщение
            addPostToTimeline('text', textInputValue, coords);
            textInput.value = ''; // Очищаем поле ввода
            textInput.focus(); // Возвращаем фокус на текстовое поле
        }).catch(() => {
            showModal('text', textInputValue);
        });
    };

    textPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTextPost();
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTextPost();
        }
    });

    const addVideoPost = () => {
        const textInputValue = textInput.value.trim();
        console.log("Text Input Value:", textInputValue); // Отладочное сообщение
        if (!textInputValue) {
            alert('Введите текст сообщения');
            return;
        }
        getGeolocation().then(coords => {
            addPostToTimeline('video', textInputValue, coords);
            textInput.value = ''; // Очищаем поле ввода
            textInput.focus(); // Возвращаем фокус на текстовое поле
        }).catch(() => {
            showModal('video', textInputValue);
        });
    };

    videoPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addVideoPost();
    });
}); */
