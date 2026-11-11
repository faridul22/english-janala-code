const createElements = (array) => {
  const htmlElement = array.map(
    (ele) => `<button class="btn mr-2">${ele}<button>`,
  );
  return htmlElement.join("");
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word_container").classList.add("hidden");
  } else {
    document.getElementById("word_container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const loadLesson = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((lesson) => displayLesson(lesson.data));
};
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson_btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  manageSpinner(true);
  if (!id) return;

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson_btn-${id}`);
      clickBtn.classList.add("active");
      displayWord(data.data);
    });
};
const loadDetails = async (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.data);
  word_modal.showModal();
};

const displayDetails = (data) => {
  const { word, meaning, pronunciation, sentence, synonyms } = data;
  const modalContainer = document.getElementById("modal_container");
  modalContainer.innerHTML = `
            <!-- modal -->
            <h1 class="text-3xl font-bold text-gray-900 mb-6">
             ${word}
              <span class="text-xl font-normal text-gray-700"
                >(<i class="fa-solid fa-microphone-lines"></i> :${pronunciation})</span
              >
            </h1>

            <!-- Meaning -->
            <div class="mb-5">
              <h2 class="text-base font-bold text-gray-900 mb-1">Meaning</h2>
              <p class="text-lg text-gray-800 font-medium">${meaning}</p>
            </div>

            <!-- Example -->
            <div class="mb-6">
              <h2 class="text-base font-bold text-gray-900 mb-1">Example</h2>
              <p class="text-base text-gray-700">
                ${sentence}
              </p>
            </div>

            <!-- Synonyms -->
            <div class="mb-8">
              <h2 class="text-base font-bold text-gray-900 mb-3">
                সমার্থক শব্দ গুলো
              </h2>
              <div class="">
              ${createElements(synonyms)}
              </div>
            </div>
             
  `;
  manageSpinner(false);
};
const displayWord = (words) => {
  const wordContainer = document.getElementById("word_container");
  wordContainer.innerHTML = " ";

  for (let word of words) {
    const wordCard = document.createElement("article");
    wordCard.innerHTML = `
          <div
            class="min-h-[238px] rounded-xl bg-white px-8 py-7 shadow-sm flex flex-col items-center"
          >
            <h1 id="word_title" class="text-2xl font-bold text-black">${word.word}</h1>
            <p class="mt-1 text-sm text-black">Meaning /Pronunciation</p>
            <p class="mt-3 text-xl font-semibold text-[#555] font_bangla">
              "${word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"} / ${word.pronunciation}"
            </p>
  
            <div class="mt-auto flex w-full items-center justify-between pt-7">
              <button
              onclick="loadDetails(${word.id})"
                // onclick="my_modal_5.showModal()"
                id="details_button"
                type="button"
                aria-label="Word information"
                class="h-9 w-9 rounded-lg bg-[#e8f4ff] text-[#374957] cursor-pointer"
              >
                <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
              </button>
              <button
                onclick="pronounceWord('${word.word}')"
                type="button"
                aria-label="Hear pronunciation"
                id="speak_button"
                class="h-9 w-9 rounded-lg bg-[#e8f4ff] text-[#374957] cursor-pointer"
              >
                <i class="fa-solid fa-volume-high" aria-hidden="true"></i>
              </button>
            </div>
          </div>
    `;
    wordContainer.appendChild(wordCard);
  }
  loadLevelWord();
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level_container");
  levelContainer.innerHTML = " ";

  for (let lesson of lessons) {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
              <button 
              onclick="loadLevelWord(${lesson.level_no})"
              id="lesson_btn-${lesson.level_no}"
                href=""
                class="flex items-center gap-2 px-4 py-1.5 border-2 border-[#6366f1] text-[#4f46e5] hover:bg-[#6366f1] hover:text-white rounded-lg text-sm font-semibold transition-all duration-300 lesson_btn cursor-pointer"
              >
              <i class="fa-solid fa-book-open text-base"></i>
                <span>Lesson-${lesson.level_no}</span>
              </button>
    `;
    levelContainer.appendChild(lessonDiv);
  }
  manageSpinner(false);
};
loadLesson();

// search implement
document.getElementById("btn_search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input_search");
  const inputText = input.value.trim().toLowerCase();
  console.log(inputText);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWord = allWords.filter((word) =>
        word.word.toLowerCase().includes(inputText),
      );
      displayWord(filterWord);
    });
});
