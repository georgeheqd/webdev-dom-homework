
    const buttonElement = document.getElementById("add-button");
    const commentsElement = document.getElementById("comments");
    const commentElement = document.getElementById("comment");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.getElementById("text-input");
    let comments = []
    
   // window.load = function () {
    //  buttonElement.disabled = true;
     //  buttonElement.textContent = 'Комментарии загружаются, подождите...';
//
  //  }
    window.onload = function () {
      document.body.classList.add('loaded_hiding');
      window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
      }, 500);
    }
    function getComments() {
      const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/george-kuznecov/comments', {
        method: "GET",
  });

  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      comments = responseData.comments;
      renderComments(comments);
    });
  });
}

    getComments(); 
    function getDate(){
      const dateNow = new Date();
      const dateNumber = String(dateNow.getDate()).padStart(2, '0');
      const dateMonth = String(dateNow.getMonth() + 1).padStart(2, '0');
      const dateYear =dateNow.getFullYear()
      const dateHours = dateNow.getHours()
      const dateMinutes = dateNow.getMinutes()

      return dateNumber + "." + dateMonth +"."+ dateYear + " "+ dateHours +":"+dateMinutes;
    }

    const addNewElToList = () =>{

      nameInputElement.classList.remove("error");
      textInputElement.classList.remove("error");


      if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
      }

      if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
      }

       comments.push({
         name: nameInputElement.value
         .replaceAll("<", "&lt;")
         .replaceAll("<", "&lt;"),
         comment: textInputElement.value
         .replaceAll("<", "&lt;")
         .replaceAll("<", "&lt;"),
         date: getDate(),
         likes: 0,
         isLiked: "",
       })


       buttonElement.disabled = true;
       buttonElement.textContent = 'Комментарий добавляется, подождите...';
       const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/george-kuznecov/comments', {
         method: "POST",
         body: JSON.stringify({
           name: nameInputElement.value,
           text: textInputElement.value
         }),
       })
       .then((response) => {
       })
       .then((responseData) => {
         getComments();
         renderComments();
       })
       .then (() =>{
         buttonElement.disabled = false;
         buttonElement.textContent = 'Написать';
         nameInputElement.value = "";
         textInputElement.value = "";
         nameInputElement.placeholder = "Введите ваше имя";
         textInputElement.placeholder = "Введите ваш комментарий";
       })
       
       renderComments();
 
     }
   
     buttonElement.addEventListener("click",() => {
       addNewElToList();
       
     });
 
    
     function removeLastElement() {
       comments.pop(); 
       renderComments(); 
     }
      
     
 
   

      //const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/george-kuznecov/comments', {
      //  method: "POST",
      //  body: JSON.stringify({
      //    name: nameInputElement.value,
      //    text: textInputElement.value
      //  }),
    //  });

   //   fetchPromise.then((response) => {
     //   const jsonPromise = response.json();
    //    jsonPromise.then((responseData) => {
     //     getComments();
          //renderComments(commentsServer);
          //console.log(commentsServer);
      //  });
    //  });



  



    const renderComments = () =>{
      const commentsHTML = comments
      .map((comment, index) => {
       return `<li id= "comment" class="comment" data-index="${index}">
           <div class="comment-header">
             <div class= "comment-name" data-name="${comment.author.name}">${comment.author.name}</div>
             <div>${getDate(comment.date)}</div>
            </div>    
            <div class="comment-body">
              <div class="comment-text" data-text="${comment.text}">
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes" data-index="${index}">
                <span class="likes-counter" data-index="${index}">${comment.likes}</span>
                <button class= "like-button ${comment.isLiked ? '-active-like' : '' }" data-index="${index}"></button>
              </div>
            </div>
         </li>`;

      }).join("");


      const commentsEl = document.getElementById("comments");

      commentsEl.innerHTML = commentsHTML;


      const usersLikes = document.querySelectorAll('.likes');
      const numberLikesEl = document.querySelectorAll('.likes-counter');
      const likesPainter = document.querySelectorAll('.like-button')


      for (let userLike of usersLikes ) {
        userLike.addEventListener('click',(event) => {
          event.stopPropagation();
          const indexUserLike = userLike.dataset.index;
          console.log(indexUserLike)
          console.log(comments)
          if (comments[indexUserLike].isLiked === false) {
              comments[indexUserLike].likes += 1;
              comments[indexUserLike].isLiked = true;
          } else{
              comments[indexUserLike].likes -= 1;
              comments[indexUserLike].isLiked = false;
            }
          renderComments();

        })
      }

      const responseUsersComments = document.querySelectorAll('.comment');
      for(const responseUserComment of responseUsersComments ){
        responseUserComment.addEventListener('click',() => {
          const userName = comments[responseUserComment.dataset.index].name;
          const userText = comments[responseUserComment.dataset.index].comment;
          textInputElement.value = '>'+ "  " + ' "' + `${userText}`  + ' "' + ' ©' + '\n' +'('+ `${userName}`+')' + '\n'; 
        })
      }

    }

    renderComments();