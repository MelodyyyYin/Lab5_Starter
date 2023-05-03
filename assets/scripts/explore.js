// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.querySelector("#voice-select");
  const textToSpeak = document.querySelector("#text-to-speak");
  const speakButton = document.querySelector("button");
  const image = document.querySelector('img[alt="Smiling face"]');

  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  speakButton.addEventListener("click", () => {
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }

    synth.speak(utterThis);
      image.src = "assets/images/smiling-open.png";

    utterThis.onend = () => {
      image.src = "assets/images/smiling.png";
    };

  });
}
