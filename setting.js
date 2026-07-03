const isLoggedIn = localStorage.getItem("isLoggedIn");
if(isLoggedIn!=="true"){
    window.location.href="./index.html"
}
let dashBordbtn = document.querySelector(".Home-btn");
const logoutBtn = document.querySelector("#logoutBtn");
dashBordbtn.addEventListener('click',()=>{
    window.location.href="./dashboard.html"
});
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const userName = document.querySelector('#userName');
const userPass = document.querySelector('#userPass');
userName.value = currentUser.userName;
userPass.value = currentUser.userPass;
logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href="./index.html"
})
const darkMode = document.querySelector('#darkMode');
const theme = localStorage.getItem('theme');
if(theme==="dark"){
    document.body.classList.add('dark');
    darkMode.checked=true;
}
darkMode.addEventListener('change',()=>{
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')) {
        localStorage.setItem('theme','dark');      
    } else {
        localStorage.setItem('theme','light')
    }
});
const saveProfile = document.querySelector("#saveProfile");

saveProfile.addEventListener("click", () => {
    currentUser.userName = userName.value;
    currentUser.userPass = userPass.value;
    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user=>{
        if(user.Name===currentUser.userName){
            return{
                ...user,
                userName:userName.value,
                userPass:userPass.value,
            }

        }
        return user;
    });
    localStorage.setItem('users',JSON.stringify(users))
    alert("Profile Updated");

});
const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click',()=>{
    const ok =confirm('are you sure?');
    if(!ok) return;
    localStorage.removeItem("transctions");
    alert('all tranction deleted');
    window.location.href="./dashboard.html"
})
const currency = document.querySelector('#currency');
const savedCurrency =  localStorage.getItem('currency')||"$";
currency.value=savedCurrency;
currency.addEventListener('change',()=>{
    localStorage.setItem('currency',currency.value);
    alert('currency updated');
    window.location.href= "./dashboard.html";
})