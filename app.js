document.getElementById('fileInput').addEventListener('change', textValue => {

  const file = textValue.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = readLine => {
      const contents = readLine.target.result;
      const lines = contents.split('\n');
      displayContents(lines);
  };
  reader.readAsText(file);

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
  const blob = new Blob([text], {type: 'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}