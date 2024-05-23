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

document.getElementById('fileInput').addEventListener('change', event => {

  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
      const contents = event.target.result;
      const lines = contents.split('\n');
      displayContents(lines);
  };
  reader.readAsText(file);//기본 인코딩 UTF-8

});

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

  document.getElementById('saveBtn').style.display = 'block';
  document.getElementById('tempSave').style.display = 'block';

}

document.getElementById('saveBtn').addEventListener('click', function() {
  const contents = [];
  const items = document.querySelectorAll('.item');
  items.forEach(function(item, index) {
      const qnaIndex = index+1;
      const question = item.querySelector('div').textContent;
      const answer = item.querySelector('textarea').value;
      contents.push(`질문${qnaIndex}: ${question}\n답변${qnaIndex}: ${answer}\n`);
  });

  saveTextFile(contents.join('\n'), 'QA.txt');

});

function saveTextFile(text, filename) {
  const blob = new Blob([text], {
