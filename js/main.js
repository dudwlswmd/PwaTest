const form = document.querySelector('form');
const boxes = document.querySelectorAll('.list');

let from,to//아이템이 출발, 도착하는 .list의 id

//각 .list id들끼리  배열, todo,doing,done 
let todoList = [];
let doingList = [];
let doneList = [];

const listsObj = {//객체
     todo : todoList,
     doing : doingList,
     done : doneList
}
//lists[todo]   -이런식으로 접근 가능

//로컬스토리지에 저장하는 함수선언
const saveList = (listId)=>{
     localStorage.setItem(listId,JSON.stringify(listsObj[listId]))
}



//각 .list위에 드래그 되는게 있을때마다 인식하는 함수 정의
const dragOver = (e) =>{ //드래그 종료지점 찾는 기능+++++++++++++++++
     e.preventDefault();//드래그할때 플러스로 바뀜
     // const targetId = e.target.id;
     const { id:targetId } = e.target;

     // console.log('타겟 아이디???',targetId)

     const listIds = Object.keys(listsObj)
     // console.log(lists)
     if( listIds.includes(targetId) ){//includes->포함 컨테인스랑똑같다 안에 있냐없냐
          to = targetId
     }

}


const dragStart = (event) => {//드래그 시작지점 찾는 기능++++++++++++++++++++++++++
     console.log('드래그 시작',event.target.parentElement.id);
     from = event.target.parentElement.id;//아이템 움직이는 시작지점 .list의 id
}
const dragEnd = (event) => { //드래그 종료후 실행하는 기능 +++++++++++++++++++++
     console.log('드래그 끝',event)
     const {id} = event.target;
     if( from === to ){//같은 list내부에서 움직였을때는 달라지는거 없음
          return;
     }
     event.target.remove();//출발점.list에서는 item지워라

     listsObj[from] = listsObj[from].filter((item)=>{
          if( item.id !== id ){
               return item;
          }else{
               createElement(to,item)
          }
     })
     //createElement(to,);
     saveList(from);
     saveList(to);

}

/*
예를 들어, 두 개의 리스트가 있고, 첫 번째 리스트에서 아이템을 드래그해서 두 번째 리스트로 이동시키는 기능을 구현한다고 가정해보겠습니다.

여기서 dragEnd 함수는 드래그가 끝나는 시점에서 호출되는 함수입니다. 이 함수가 하는 일은 다음과 같습니다.

현재 드래그 중인 아이템의 id 값을 가져옵니다.
만약 출발 리스트 from과 도착 리스트 to가 같다면 (즉, 같은 리스트 내에서 드래그 중이었다면), 이동할 필요가 없으므로 함수를 종료합니다.
그렇지 않다면, 이동할 아이템을 출발 리스트에서 제거하고(remove) 도착 리스트에 추가합니다(createElement(to, item)) .
출발 리스트(from)의 아이템 목록에서 이동한 아이템을 제외한 새로운 목록을 만들어 갱신합니다(listsObj[from] = listsObj[from].filter(...)) .
출발 리스트와 도착 리스트의 상태를 저장합니다.
이렇게 하면, 두 번째 리스트에서 드래그한 아이템이 제거되고, 첫 번째 리스트에서도 해당 아이템이 삭제되고, 두 번째 리스트에 새로운 아이템이 추가됩니다.
*/

//마우스 오른쪽을 누르면 삭제하는 함수선언
const removeItem = (event) => {
     console.log(event.target)
     event.preventDefault();
     const {id} = event.target;
     const {id:parentId} = event.target.parentElement
     console.log(parentId)
     event.target.remove();//클릭한 아이템 삭제

     listsObj[parentId] = listsObj[parentId].filter((aa)=>{//삭제한 아이템이 속해있는 배열을 의미
          return aa.id !== id
     })

     saveList(parentId)//로컬스토리지까지 지우기위해서 쓴다.
}

//item을 만드는 함수 정의 //어디에 둘지 결정해주는 메인기능+++++++++++++++++++++++++++++++
const createElement=(listId,itemaa)=>{//listId-> list의아이디(처음에는 todo지만 다른곳으로 
     //옮겨갈때는 새로 만들어 줘야함)
     const list = document.querySelector(`#${listId}`)//.list id 셋중 하나 선택
     const item = document.createElement('div');
     // console.log('listId,itemaa',listId,itemaa)
     item.id = itemaa.id;
     item.innerText = itemaa.text;
     item.className = 'item';
     item.draggable = 'true';//드래그 할 수 있게 한다.
     // console.log('list',list)
     item.addEventListener('dragstart',dragStart) //드래그를 시작했을때
     item.addEventListener('dragend',dragEnd)     //드래그를 끝냈을때

     //마우스 오른쪽을 누르면 삭제하는 함수발생
     item.addEventListener('contextmenu',removeItem);//마우스 오른쪽클릭

     list.append(item);
     //미리 만들어 놓은 해당되는 배열에 아이템을 넣어준다.
     listsObj[listId].push(itemaa);
     console.log('마지막.list',list[listId])
     // console.log('item',item)

}


//새로운 할일을 생성하는 함수
const createTodto = function(e){//만듬+++++++++++++++++
     e.preventDefault();
     const input = document.querySelector('input');
     const id = uuidv4();//uuid라이브러리를 연결해서 아이디 생성
     const newTodo = {
          id,//key와 value가 동일하면 하나만써도 괜찮다.
          // id:id,
          text:input.value
     }
     createElement('todo',newTodo);//item을 만드는 함수 실행
     console.log(newTodo);
     input.value='';
     saveList('todo'); //로컬스토리지에 저장하는 함수 실행(입력시엔 todo)


}

//로컬스토리지에 저장된 데이터를 불러오는 함수
const loadList = () => {
     const userTodoList = JSON.parse(localStorage.getItem('todo'))
     const userDoingList = JSON.parse(localStorage.getItem('doing'))
     const userDoneList = JSON.parse(localStorage.getItem('done'))
     console.log(userTodoList)
     
     if( userTodoList ){//있을때만 실행
          userTodoList.forEach((aa) =>{
          createElement('todo',aa)
          })
     }
     userDoingList&&userDoingList.forEach((aa) =>{
          createElement('doing',aa)
          })
     if(userDoneList ){
          userDoneList.forEach((aa) =>{
          createElement('done',aa)
          })
     }
}

loadList()//로컬스토리지에 저장된 데이터를 불러오는 함수 실행
form.addEventListener('submit',createTodto);
     boxes.forEach((box)=>{//각 .list 드래그 되는게 있을때마다 인식함
          box.addEventListener('dragover',dragOver)
})













