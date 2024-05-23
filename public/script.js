document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const contents = event.target.result;
    const lines = contents.split('\n');
    displayContents(lines);
  };
  reader.readAsText(file); // 기본 인코딩은 UTF-8
}

function displayContents(lines) {
  const contentDiv = document.getElementById('content');
  // 초기화
  contentDiv.innerHTML = '';
  lines.forEach(function(line, index) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = ` <div>${index + 1}. ${line}</div>
                          <textarea rows="4"></textarea>`;
    contentDiv.appendChild(itemDiv);
  });

  displayBtn();//button 보이기

}

document.getElementById('saveBtn').addEventListener('click', function() {
  const contents = [];
  const items = document.querySelectorAll('.item');
  items.forEach(function(item, index) {
    const qnaIndex = index + 1;
    const question = item.querySelector('div').textContent;
    const answer = item.querySelector('textarea').value;
    contents.push(`질문${qnaIndex}: ${question}\n답변${qnaIndex}: ${answer}\n`);
  });

  saveTextFile(contents.join('\n'), 'QA.txt');
});

function saveTextFile(text, filename) {
  const blob = new Blob([text], {type: 'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
//임시저장
const TEMP_SAVE_BTN = document.querySelector('#tempSave');
TEMP_SAVE_BTN.addEventListener('click', () => {

  const items = document.querySelectorAll('#content .item');
  const dataToSave = [];//초기화

  items.forEach((item) => {

    const textContent = item.querySelector('div').textContent;//질문
    const textareaValue = item.querySelector('textarea').value;//답변

    dataToSave.push({ textContent, textareaValue });
  });

  localStorage.setItem('temp', JSON.stringify(dataToSave));

  alert('임시 저장 되었습니다.');

});

//불러오기
const TEMP_LOAD_BTN = document.querySelector('#tempLoad');
TEMP_LOAD_BTN.addEventListener('click', () => {
  //저장된 데이터 가져오기
  let temp = localStorage.getItem('temp');

  if (temp === null) return alert('저장된 데이터가 없습니다.');

  displayBtn();//button 보이기

  const savedData = JSON.parse(temp);

  const contents = document.querySelector('#content');
  contents.innerHTML = '';//초기화

  savedData.forEach((data) => {

    const newItem = document.createElement('div');
    newItem.classList.add('item');

    //질문
    const textContentDiv = document.createElement('div');
    textContentDiv.textContent = data.textContent;

    //답변
    const textarea = document.createElement('textarea');
    textarea.rows = 4;
    textarea.value = data.textareaValue;

    newItem.appendChild(textContentDiv);
    newItem.appendChild(textarea);
    contents.appendChild(newItem);

  });

  alert('저장된 데이터를 불러왔습니다.');

});

/*
top 버튼
*/
const HTML_HEIGHT = window.innerHeight;
const TOP_BTN = document.querySelector('.topBtn');
window.addEventListener('scroll', () => toggleTopBtn(TOP_BTN));

function toggleTopBtn(topBtn){
  const y = window.scrollY;
  if(y >= HTML_HEIGHT) topBtn.classList.remove('d-none');
  else topBtn.classList.add('d-none');
}

function displayBtn(){
  document.getElementById('saveBtn').classList.remove('d-none');
  document.getElementById('tempSave').classList.remove('d-none');
}