let isPosting = false;

export default function addPostToTimeline(type, content, coords) {
  if (isPosting) return;
  isPosting = true;

  const timeline = document.querySelector('.timeline');
  const newPost = document.createElement('li');
  newPost.classList.add('timeline-item');
  const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');

  let postContent;
  if (type === 'text') {
    postContent = `<div class="text-post">${content}</div>`;
  } else if (type === 'audio') {
    postContent = '<div class="audio-post"><audio controls></audio></div>';
  } else if (type === 'video') {
    postContent = '<div class="video-post"><video width="320" height="240" controls></video></div>';
  }

  newPost.innerHTML = `
        <div class="post-header">
            <button class="delete-post">&times;</button>
            <div class="timestamp">${timestamp}</div>
        </div>
        <div class="post-content">${postContent}</div>
        <div class="coordinates">${coords}</div>
    `;

  timeline.prepend(newPost);
  document.querySelector('.text-input').value = '';

  const audioElement = newPost.querySelector('audio');
  if (audioElement) {
    audioElement.src = content;
    audioElement.addEventListener('canplaythrough', () => {});
    audioElement.addEventListener('error', (e) => {
      console.error('Error loading audio:', e);
    });
  }

  newPost.querySelector('.delete-post').addEventListener('click', () => {
    newPost.remove();
  });

  isPosting = false;
}
