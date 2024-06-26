import getGeolocation from './geolocation';
import addPostToTimeline from './posts';
import showModal from './modal';

let mediaRecorder;
let audioChunks = [];
let recordingTimer;
let recordingSeconds = 0;

function showRecordingControls() {
  document.querySelector('.start-audio-record-btn').style.display = 'none';
  document.querySelector('.start-video-record-btn').style.display = 'none';
  document.querySelector('.stop-audio-record-btn').style.display = 'block';
  document.querySelector('.cancel-audio-record-btn').style.display = 'block';
  document.querySelector('.record-timer').style.display = 'block';
}

function hideRecordingControls() {
  document.querySelector('.start-audio-record-btn').style.display = 'block';
  document.querySelector('.start-video-record-btn').style.display = 'block';
  document.querySelector('.stop-audio-record-btn').style.display = 'none';
  document.querySelector('.cancel-audio-record-btn').style.display = 'none';
  document.querySelector('.record-timer').style.display = 'none';
  document.querySelector('.record-timer').textContent = '0 сек.';
}

function startTimer() {
  recordingSeconds = 0;
  recordingTimer = setInterval(() => {
    recordingSeconds += 1;
    document.querySelector('.record-timer').textContent = `${recordingSeconds} сек.`;
  }, 1000);
}

function stopTimer() {
  clearInterval(recordingTimer);
}

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = [];

      getGeolocation().then((coords) => {
        addPostToTimeline('audio', URL.createObjectURL(audioBlob), coords);
      }).catch(() => {
        showModal('audio', URL.createObjectURL(audioBlob));
      });
    };

    showRecordingControls();
    startTimer();
  }).catch(() => {
    showModal('error', 'Необходимо выдать разрешение на использование микрофона или использовать другой браузер.');
  });
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    stopTimer();
    hideRecordingControls();
  }
}

function cancelRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    audioChunks = [];
    stopTimer();
    hideRecordingControls();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.start-audio-record-btn').addEventListener('click', startRecording);
  document.querySelector('.stop-audio-record-btn').addEventListener('click', stopRecording);
  document.querySelector('.cancel-audio-record-btn').addEventListener('click', cancelRecording);
});
