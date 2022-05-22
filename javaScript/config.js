const button = document.querySelector('button');
const text = document.querySelector('.text');

const recognition = createRecognition();
let listening = false;

button.addEventListener('click', e => {
  if(!recognition) return;

  listening ? recognition.stop() : recognition.start();

  button.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar';

  button.classList.toggle('bg-purple-200');
  button.classList.toggle('bg-red-500');

});

function createRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if(!recognition) {
    text.innerHTML = "Speech Recognition is not found!";
    return null
  };

  recognition.lang = "pt-BR";

  recognition.onstart = () => listening = true;
  recognition.onend = () => listening = false;
  recognition.onerror = () => console.log('error', e);
  recognition.onresult = eventResult => text.innerHTML = eventResult.results[0][0].transcript;

  return recognition;
};