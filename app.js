const speaker = document.querySelector("#speaker");
const speakBtn = document.querySelector("#speak-btn");
let voices = [];

function populateVoices() {
    speaker.innerHTML = "";
    voices = speechSynthesis.getVoices();

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        speaker.appendChild(option);
    });

    const defaultVoiceIndex = voices.findIndex(v => v.default);
    if (defaultVoiceIndex !== -1) {
        speaker.value = defaultVoiceIndex;
    }
}

populateVoices();
speechSynthesis.onvoiceschanged = populateVoices;

speakBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const word = document.querySelector("#text").value;

    if (!word.trim()) {
        alert("Iltimos, gapirish uchun matn kiriting!");
        return;
    }

    const utter = new SpeechSynthesisUtterance(word);
    utter.voice = voices[parseInt(speaker.value)];
    utter.volume = 1;
    utter.rate = 1;

    speechSynthesis.speak(utter);
});