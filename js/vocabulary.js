let allWords = [];

async function loadWords(){

    try{

        const response =
        await fetch(
            "data/toeic-3000.json"
        );

        allWords =
        await response.json();

        renderWords(allWords);

    }

    catch(error){

        document
        .getElementById(
            "wordContainer"
        )
        .innerHTML =
        "<h2>無法載入資料庫</h2>";

        console.log(error);

    }

}

function renderWords(words){

    let html="";

    words.forEach(word=>{

        html += `

        <div class="card">

            <div class="level">
                TOEIC ${word.level}
            </div>

            <div class="word">
                ${word.word}
            </div>

            <div class="part">
                ${word.part}
            </div>

            <div class="meaning">
                ${word.meaning}
            </div>

            <div class="example">
                ${word.example || ""}
            </div>

            <button
            class="speak"
            onclick="speak('${word.word}')">

            🔊 發音

            </button>

            <button
            class="favorite"
            onclick="addFavorite('${word.word}')">

            ⭐ 收藏

            </button>

        </div>

        `;

    });

    document
    .getElementById(
        "wordContainer"
    )
    .innerHTML = html;

}

function speak(word){

    let msg =
    new SpeechSynthesisUtterance(word);

    msg.lang="en-US";

    speechSynthesis.speak(msg);

}

function addFavorite(word){

    let favorites =

    JSON.parse(
      localStorage.getItem(
        "favorites"
      )
    ) || [];

    if(
      !favorites.includes(word)
    ){

        favorites.push(word);

        localStorage.setItem(
          "favorites",
          JSON.stringify(
            favorites
          )
        );

        alert(
          word+" 已收藏"
        );

    }

}

function searchWord(){

    let keyword=

    document
    .getElementById(
      "search"
    )
    .value
    .toLowerCase();

    let result=

    allWords.filter(word=>

      word.word
      .toLowerCase()
      .includes(keyword)

      ||

      word.meaning
      .includes(keyword)

    );

    renderWords(result);

}

loadWords();
