// DOM Elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const transcriptArea = document.getElementById('transcript');

// Check for SpeechRecognition support
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    // Configuration
    recognition.continuous = true; // Keep listening until manually stopped
    recognition.interimResults = false; // Only finalized results
    recognition.lang = 'en-US'; // You can change this to any other language (e.g., 'fr-FR' for French)

    // Event listener for start button
    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        startBtn.innerText = 'Listening...';
    });

    // Event listener for stop button
    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.innerText = 'Start Listening';
    });

    // Capture speech result
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        transcriptArea.value += transcript + '\n';
    };

    // Reset the buttons if speech recognition ends automatically
    recognition.onend = () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.innerText = 'Start Listening';
    };

    // Handle any errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error: ', event.error);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        startBtn.innerText = 'Start Listening';
        alert('Error occurred: ' + event.error);
    };
} else {
    // If SpeechRecognition API is not supported
    alert('Your browser does not support Speech Recognition.');
    startBtn.disabled = true;
}
