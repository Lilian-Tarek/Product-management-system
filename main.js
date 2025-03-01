// select
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount= document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
let searchmood="title";
// get total
function getTotal()

{
    if (price.value !== "")
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
      total.innerHTML = result;
      total.style.backgroundColor = "var(--light-blue)";
          total.style.color = "var(--light-black)";
  }
  else
    {
      total.innerHTML = "";
        total.style.backgroundColor = "var(--light-black)";
        total.style.color = "var(--grey)";
      }
}
// create product
let dataproduct;
if (localStorage.getItem("product")) {
  try {
    dataproduct = JSON.parse(localStorage.getItem("product")) || [];
  } catch (error) {
    dataproduct = [];
    localStorage.removeItem("product"); 

  }
} else {
  dataproduct = [];
}


submit.onclick = function ()
{
  
  let obj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value
  };
 
  // count
  
  if (title.value != "" && obj.count<100) {
    if (mood == "create") {
      if (+obj.count > 1) {
        for (let i = 0; i < +obj.count; i++) {
          dataproduct.push(obj);
        }
      }
      else {
        dataproduct.push(obj);
      }
    }
    else if (mood == "update") {
      dataproduct[tmp] = obj;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
 clearData();
  }
  // save in local storage
  localStorage.setItem("product", JSON.stringify(dataproduct));
 
  show();
}
// clear inputs after create
function clearData()
{
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";

}
// read and show in table
function show()
{
  let table = "";
  for (let i = 0; i<dataproduct.length; i++)
  {
    table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxes}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discount}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td><button onclick="updatepro(${i})">Update</button></td>
        <td><button onclick="deletepro(${i})">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndel = document.getElementById("delete-all");
  if (dataproduct.length > 0)
  {
    btndel.innerHTML = `<button onclick="deleteAll()">Delete All (${dataproduct.length})</button>`;
  }
  else
  {
    btndel.innerHTML = ``;
  }
  getTotal();
}
show();
// delete
function deletepro(i)
{
  dataproduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataproduct);
  show();
}
delete all
function deleteAll()
{
  localStorage.clear();
  dataproduct.splice(0);
  show();
}

// update
function updatepro(i)
{
  title.value = dataproduct[i].title;
  price.value = dataproduct[i].price;
  taxes.value = dataproduct[i].taxes;
  ads.value = dataproduct[i].ads;
  discount.value = dataproduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataproduct[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth"
  });
}
// search
function searchMood(id)
{
  let searchinput = document.getElementById("search");
  if (id == "search-title")
  {
    searchmood = "title";
    
  }
  else
  {
    searchmood = "category";
   
  }   searchinput.placeholder = `Search By ${searchmood}`;
  searchinput.focus();
  searchinput.value = "";
  show();
}
function searchData(searchword)
{
  let table = "";
  for (let i = 0; i < dataproduct.length; i++) {
    if (searchmood == "title") {
          
      if (dataproduct[i].title.includes(searchword.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxes}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discount}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td><button onclick="updatepro(${i})">Update</button></td>
        <td><button onclick="deletepro(${i})">Delete</button></td>
    </tr>
    `;
      }
          
    } else {
      if (dataproduct[i].category.includes(searchword.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxes}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discount}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td><button onclick="updatepro(${i})">Update</button></td>
        <td><button onclick="deletepro(${i})">Delete</button></td>
    </tr>
    `;
      }
    }
  }
   document.getElementById("tbody").innerHTML = table;
}



