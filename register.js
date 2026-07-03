let inputOne =  document.querySelector('.user');
let inputTwo = document.querySelector('.pass');
let registerBtn = document.querySelector('.btn');

registerBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const userName =  inputOne.value;
    const userPass =  inputTwo.value;
    if(userName.trim()===""){
        alert("Username is required");
        return;
    }
    if(userPass.trim()===""){
        alert("password is required");
        return;
    }

    let users =  JSON.parse(localStorage.getItem('users'))||[];
    let userExists = users.find(user=>user.userName===userName);
    if(userExists){
        alert('this user Name alrady taken');
        return;
    }

    const newUser = {
        id:Date.now(),
        userName,
        userPass
    }
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    alert('registation  successful');
    window.location.href ='./index.html'
})