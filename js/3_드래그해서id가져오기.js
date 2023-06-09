const form = document.querySelector('form');
const listBoxes = document.querySelectorAll('.list');

//출발from,이동to(도착) .list의 id이름
let from;
let to;

let todoList = [];
let doingList = [];
let doneList = [];

let lists = {//객체형태로 list들을 묶어주기
     //아이디 이름으로 todo,doing,done으로 맞춤 위에 배열과 이름을 맞춤 보기 쉬우라고
     todo : todoList,
     doing : doingList,
     done : doneList
     // todo : todoList, -> aa:jjj
     // doing : doingList, ->bb:fff
     // done : doneList ->cc:ddd //이렇게해도 노상관
}

//.list가 (item)이 드래그 되는걸 인식할때 발생하는 함수
const dragOver = (e) =>{
     e.preventDefault();//금지표시에서 플러스표시로 바꿈
     // console.log('마우스 올렸을때 .list의 id',e.target.id)
     const { id : targetId } = e.target;//마우스가 지나가는 곳의 아이디 확인
     // console.log('마우스 올렸을때 .list의 id',targetId)
     const listIds = Object.keys(lists);//오브젝트의 키값만 배열로 가져옴(카값은lists의 todo,doing,done이다.)
     // console.log(listIds)
     if( listIds.includes(targetId) ){//마우스가 지나가는 곳 id가 셋중 하나와 같을때만
          to = targetId//도착지점을 의미하는 to에 targetId를 넣는다.
     }
     console.log(to)
}

const dragStart = (e) => {
     console.log('드래그시작! dragStart함수 발생!')
     console.log('콘솔로 부모아이디 확인',e.target.parentElement.id)//부모아이디 확인
     from = e.target.parentElement.id
     console.log('부모아이디 from에다가 넣음',from)
}
const dragEnd = () => {
     console.log('드래그 끝! dragEnd함수 발생!')
}

//item 엘리먼트 만들어주는 함수선언
const createItem = (listId,aa) => {//여기서 말하는 aa는newTodo를 뜻한다.
     const list = document.querySelector(`#${listId}`);
     const itemDiv = document.createElement('div');//div새로만듬

     itemDiv.id = aa.id;//받아온 id를 새로 만든 div의 id
     itemDiv.innerText = aa.text;
     itemDiv.classList.add('item')
     itemDiv.draggable = 'true'; //드래그할수있는 기능api를 넣는다고유하다

     itemDiv.addEventListener('dragstart',dragStart);//드래그 시작했을때 발생하는 함수
     itemDiv.addEventListener('dragend',dragEnd);//드래그 끝냈을때 발생하는 함수

     list.appendChild(itemDiv);
     // console.log(list)


}

//입력값을 받아오고,아이디 만들고, 새로운 아이템 만들어주는 함수
const createTodo = (e) =>{
     e.preventDefault();//자동으로 새로고침되는 효과를 막아줌

     const input = document.querySelector('form input');
     const id = uuidv4();//uuid라이브러리 연결해서 아이디 생성함
     // const text =  input.value;
     const newTodo = {
          id:id,
          text:input.value,

     }
     //console.log(newTodo.id,newTodo.text);

     createItem('todo',newTodo)//item만드는 함수 실행, 들어갈list의 아이디는 todo/newTodo를 인자로 남겨줌
     input.value='';//인풋벨류값을 초기화 //엔터쳤을때 글씨 남아있지 않게
}

form.addEventListener('submit',createTodo)

listBoxes.forEach((box)=>{//.list들을 forEach로 돌린다.
     box.addEventListener('dragover',dragOver)//각각의 list들에다가 드래그했을때 반응

})