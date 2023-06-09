const form = document.querySelector('form');


//item 엘리먼트 만들어주는 함수선언
const createItem = (listId,aa) => {//여기서 말하는 aa는newTodo를 뜻한다.
     const list = document.querySelector(`#${listId}`);
     const itemDiv = document.createElement('div');//div새로만듬

     itemDiv.id = aa.id;//받아온 id를 새로 만든 div의 id
     itemDiv.innerText = aa.text;
     itemDiv.classList.add('item')
     console.log(listId)

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