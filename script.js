// HTML 요소들을 가져옵니다.
const generateButton = document.getElementById('generateButton');
const outputSentence = document.getElementById('outputSentence');

// 문장 목록을 저장할 변수 (초기에는 비어있음)
let sentences = [];

// 텍스트 파일에서 문장들을 불러오는 비동기 함수
async function loadSentences() {
    try {
        // 'sentences.txt' 파일을 비동기적으로 가져옵니다.
        const response = await fetch('sentences.txt');

        // 응답이 성공적인지 확인합니다. (HTTP 상태 코드 200 OK)
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }

        // 응답 본문을 텍스트로 읽어옵니다.
        const text = await response.text();

        // 텍스트를 줄바꿈 기준으로 분리하여 배열에 저장합니다.
        // 각 줄의 앞뒤 공백을 제거하고, 빈 줄은 제외합니다.
        sentences = text.split('\n')
                        .map(sentence => sentence.trim())
                        .filter(sentence => sentence.length > 0);

        // 문장 로딩이 완료되면 첫 문장을 바로 출력합니다.
        updateSentence();

    } catch (error) {
        // 파일을 불러오는 중 에러가 발생하면 콘솔에 출력하고 사용자에게 알립니다.
        console.error("문장 파일을 불러오는 데 실패했습니다:", error);
        outputSentence.textContent = "문장을 불러오는 데 실패했습니다.";
        // 버튼을 비활성화하여 더 이상 오류가 발생하지 않도록 할 수도 있습니다.
        generateButton.disabled = true;
    }
}

// 랜덤 문장을 선택하여 업데이트하는 함수 (이전과 동일)
function updateSentence() {
    // 문장 배열이 비어있으면 오류 메시지 출력
    if (sentences.length === 0) {
        outputSentence.textContent = "불러올 문장이 없습니다.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];
    outputSentence.textContent = randomSentence;
}

// "문장 생성" 버튼을 클릭했을 때 updateSentence 함수를 실행하도록 연결합니다.
generateButton.addEventListener('click', updateSentence);

// 페이지 로드 시 문장 파일 불러오기 함수 호출
loadSentences();