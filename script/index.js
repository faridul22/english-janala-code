const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((lesson) => displayLevel(lesson.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWord(data.data));
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
              "${word.meaning} / ${word.pronunciation}"
            </p>
  
            <div class="mt-auto flex w-full items-center justify-between pt-7">
              <button
                id="details_button"
                type="button"
                aria-label="Word information"
                class="h-9 w-9 rounded-lg bg-[#e8f4ff] text-[#374957]"
              >
                <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                aria-label="Hear pronunciation"
                id="speak_button"
                class="h-9 w-9 rounded-lg bg-[#e8f4ff] text-[#374957]"
              >
                <i class="fa-solid fa-volume-high" aria-hidden="true"></i>
              </button>
            </div>
          </div>
    `;
    wordContainer.appendChild(wordCard);
  }
  loadLevelWord();
};

const displayLevel = (lessons) => {
  const levelContainer = document.getElementById("level_container");
  levelContainer.innerHTML = " ";

  for (let lesson of lessons) {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
              <button 
              onclick="loadLevelWord(${lesson.level_no})"
                href=""
                class="flex items-center gap-2 px-4 py-1.5 border-2 border-[#6366f1] text-[#4f46e5] hover:bg-[#6366f1] hover:text-white rounded-lg text-sm font-semibold transition-all duration-300"
              >
              <i class="fa-solid fa-book-open text-base"></i>
                <span>Lesson-${lesson.level_no}</span>
              </button>
    `;
    levelContainer.appendChild(lessonDiv);
  }
};
loadLesson();
