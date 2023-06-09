const form = document.querySelector('form');  // 1. HTML form 요소 찾기
const boxes = document.querySelectorAll('.list');  // 2. HTML list 요소들 찾기

let from, to;  // 3. 이동 시작점과 끝점

let todoList = [];  // 4. 할 일 목록
let doingList = [];  // 5. 진행 중인 일 목록
let doneList = [];  // 6. 완료된 일 목록

const lists = {  // 7. 모든 일 목록을 lists 객체로 만듦
    todo : todoList,
    doing : doingList,
    done : doneList
};

const dragOver = (event) => {  // 8. 드래그가 될 때 호출되는 함수
    event.preventDefault();  // 기본 이벤트 방지
    const targetId = event.target.id;  // 드롭이 될 대상의 ID
    const listIds = Object.keys(lists);  // 객체의 키 값들을 배열로 가져옴
    if(listIds.includes(targetId)){  // 리스트에 포함된 ID인 경우
        to = targetId;  // 목표 ID를 to에 저장
    }
    console.log(to);  // to값 콘솔에 출력
};

const createElement =(listId,item)=>{  // 9. 새로운 일을 만드는 함수
    const list = document.querySelector(`#${listId}`);  // 리스트를 찾음
    const itemNew = document.createElement('div');  // 새로운 item을 생성

    function dragStart(event){  // 드래그 시작 함수
        console.log(event.target.parentElement.id);  // 드래그 시작 시 부모 ID 콘솔에 출력
        from = event.target.parentElement.id;  // 이동 시작점을 from에 저장
    }

    function dragEnd(event){  // 드래그 종료 함수
        console.log('end',event);  // 종료 이벤트 콘솔에 출력
        const {id} = event.target;  // 드롭 대상의 ID를 가져옴
        event.target.remove();  // 이동된 대상을 삭제

        lists[from] = lists[listId].filter((item)=>{  // 이동된 리스트에서 삭제된 대상을 제외하고 다시 리스트에 추가
            if(item.id !== id){
                return item
            } else {
                createElement(to, item);  // 이동된 대상을 새로운 리스트에 추가
            }
        })
    }

    itemNew.id = item.id;  // 새로운 item의 ID를 설정
    itemNew.className = 'item';  // 새로운 item의 클래스를 설정
    itemNew.innerText = item.text;  // 새로운 item의 내용을 설정
    itemNew.draggable='true';  // 드래그 가능하도록 설정

    itemNew.addEventListener('dragstart', dragStart);  // 드래그 시작 이벤트 추가
    itemNew.addEventListener('dragend', dragEnd);  // 드래그 종료 이벤





Regenerate response
Send a message...

Ch