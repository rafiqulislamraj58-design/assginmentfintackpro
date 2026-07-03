let inputOne = document.querySelector('#username');
let inputTwo = document.querySelector('#usesrpass');
let logBtn = document.querySelector('#logbtn');

logBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const userName = inputOne.value;
    const userPass = inputTwo.value;
    if(userName.trim()===""){
        alert("Username is required");
        return;
    }
    if(userPass.trim()===""){
        alert('password is  requerd');
        return;
    }
    let users = JSON.parse(localStorage.getItem('users'))||[];
    let fondUser=users.find((user)=>
        user.userName===userName&&user.userPass===userPass
    )
    if(!fondUser){
        alert('invalid  user ');
        return;
    }
    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('currentUser',JSON.stringify(fondUser));
    alert('login successful');
    window.location.href="./dashboard.html"
})