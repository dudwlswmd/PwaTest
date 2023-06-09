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
const dragEnd = (e) => {//드래그를 했을때 기존의 item을 지우고 새로운곳으로 이동시켜주는 기능
     console.log('드래그 끝! dragEnd함수 발생!')
     if( from == to ){//같은위치에 있을때는 안지워준다.
          return;
     }
     e.target.remove();//출발했을때 선택한 item 삭제!
     const { id } = e.target;
     lists[from]=lists[from].filter(function(item){
          if(item.id !==id){
               return item
          }else{
               createItem(to,item);
          }
     })
     // console.log('from 프롬',from, lists[from])
     // console.log('to 투',to, lists[to])

     saveList(from);//로컬 스토리지 업데이트
     saveList(to);
}

const removeItem = function(e){
     e.preventDefault();
     const {id} = e.target;
     const {id:parentId} = e.target.parentElement;//부모의 아이디까지 받아옴
     console.log(parentId);

     
     e.target.remove();
     lists[parentId] = lists[parentId].filter(function(aa){//부모어레이확인
          return aa.id !== id;
     });
     console.log(lists[parentId])
     saveList(parentId);//로컬스토리지지워졌는지 확인
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
     itemDiv.addEventListener('contextmenu',removeItem);//오른쪽 마우스를 누르면 아이템을 삭제하는 함수

     list.appendChild(itemDiv);
     // console.log(list)
     lists[listId].push(aa);//아이템 생성후 마지막으로 배열에 넣어준다.
     console.log('lists[listId]',lists[listId]);


}

//로컬스토리지에 저장하는 함수 선언
const saveList = (bb) => {//bb->listId를 가져옴
     localStorage.setItem(bb,JSON.stringify(lists[bb]));
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

     saveList('todo')
}

const loadList = function(){
     const userTodoList = JSON.parse(localStorage.getItem('todo'));
     const userDoingList = JSON.parse(localStorage.getItem('doing'));
     const userDoneList = JSON.parse(localStorage.getItem('done'));
     // console.log(userTodoList)
     userTodoList&&userTodoList.forEach(function(aa){
          createItem('todo',aa)
          console.log(userTodoList)
     })
     if(userDoingList){
          userDoingList.forEach(function(aa){
               createItem('doing',aa)
          })
     }
     userDoneList&&userDoneList.forEach(function(aa){
          createItem('done',aa)
     })
}

loadList();//로컬스토리지에 저장된 데이터를 불러옴
form.addEventListener('submit',createTodo)
listBoxes.forEach((box)=>{//.list들을 forEach로 돌린다.
     box.addEventListener('dragover',dragOver)//각각의 list들에다가 드래그했을때 반응

})