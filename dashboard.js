const isLoggedIn =  localStorage.getItem('isLoggedIn');
if(isLoggedIn!=='true'){
    window.location.href="./index.html";
}
const currentUser =JSON.parse(localStorage.getItem('currentUser'));
const welcomeUser = document.querySelector('#welcomeUser');
if(currentUser){
    welcomeUser.textContent=`wellcome, ${currentUser.userName}`;

}
const logoutBtn = document.querySelector('#logoutBtn');
logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href='./index.html'
})
const darkMode = document.querySelector('#darkMode');

const theme = localStorage.getItem('theme');
if(theme==='dark'){
    document.body.classList.add('dark');
    darkMode.checked = true;
}
darkMode.addEventListener('change',()=>{
    document.body.classList.toggle('dark');
    if ( document.body.classList.contains('dark')) {
        localStorage.setItem('theme','dark')
        
    } else {
        localStorage.setItem('theme','light')
        
    }

})
const addTransctionBtn = document.querySelector('#addTransactionBtn');
const transactionModel = document.querySelector('#transactionModal');
const closeModel = document.querySelector('#closeModal');
addTransctionBtn.addEventListener('click',()=>{
    transactionModel.classList.add('active')
});
closeModel.addEventListener('click',()=>{
    transactionModel.classList.remove('active')
});
window.addEventListener('click',(e)=>{
     if(e.target===transactionModel){
        transactionModel.classList.remove('active')
     }
})
let transctions = JSON.parse(localStorage.getItem('transctions'))||[];
const transctionsFrom = document.querySelector('#transactionForm');
transctionsFrom.addEventListener('submit',(e)=>{
    e.preventDefault();
    const description =  document.querySelector('#description').value;
    const amount = Number(document.querySelector('#amount').value);
    const type  = document.querySelector('#type').value;
    const date =  document.querySelector('#date').value;
    const category = document.querySelector("#category").value;
   const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
    category,
    date
    };

    transctions.push(transaction);
    localStorage.setItem('transctions',JSON.stringify(transctions));
    transctionsFrom.reset();
    transactionModel.classList.remove('active');
    renderTranstion()
    updateSummary()

});
const tableBody = document.querySelector('#tableBody');

function renderTranstion(){
   const currency = localStorage.getItem("currency") || "$";
    tableBody.innerHTML="";
    const searchText = searchInput.value.toLowerCase();
    const selectedType = filterType.value;
    transctions.forEach((e)=>{
        const matchSearch = e.description.toLowerCase().includes(searchText);
        const matchType = selectedType === "all" || e.type === selectedType;
         if(matchSearch&&matchType){
         tableBody.innerHTML+=`
        <tr>
        <td>${e.date}</td>
        <td>${e.description}</td>
        <td>${e.category}</td>
        <td>${currency}${e.amount}</td>
        <td>
        <button class="btn" onclick="deletTranscation(${e.id})">Delete</button>
        </td>
        </tr>
        ` 
       }
    })
    
}
const  balance =  document.querySelector('#balance');
const  income =  document.querySelector('#income');
const  expense =  document.querySelector('#expense');
const  transctionsCount = document.querySelector('#transactionCount')

function updateSummary(){
   const currency = localStorage.getItem("currency") || "$";

    let totalIncome = 0;
    let totalExpance = 0;

    transctions.forEach((transctions)=>{
        if(transctions.type==="income"){
            totalIncome+=transctions.amount;
        }else{
            totalExpance+=transctions.amount;
        }
    });
    chart.data.datasets[0].data = [
    totalIncome,
    totalExpance
    ];
    chart.update();
    const totalBlance =  totalIncome-totalExpance;

    balance.textContent =`${currency} ${totalBlance}`;
    income.textContent = `${currency} ${totalIncome}`;
    expense.textContent=`${currency} ${totalExpance}`;
    transctionsCount.textContent=transctions.length;
}
const searchInput = document.querySelector('#searchInput');
const filterType =  document.querySelector('#filterType');
searchInput.addEventListener('input',()=>{
    renderTranstion()
})
filterType.addEventListener('change',()=>{
    renderTranstion()
})
function deletTranscation(id){
transctions=transctions.filter(transction=>transction.id!==id);
localStorage.setItem("transctions", JSON.stringify(transctions));
renderTranstion()
updateSummary()
}
const  ctx= document.querySelector('#myChart');
const chart = new  Chart(ctx,{
    type:"doughnut",
    data:{
        labels:["Income","Expense"],
        datasets:[{
            data:[0,0]
        }]
    }
})
let  resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click',()=>{
    const  confrimReset = confirm("are you sure");
    if(confrimReset){
        transctions=[];
        localStorage.setItem("transactions",JSON.stringify(transctions));
        renderTranstion();
        updateSummary()
    }
});
renderTranstion();
updateSummary();