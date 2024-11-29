// ======================== /\/\ ** Global Variables ** /\/\ ========================

var selectedEmployeeToUpdate = 0;
var selectedEmployeeToUpdateImagePath = "";


// ======================== /\/\ ** HTML Elements ** /\/\ ========================

var createBtn = document.getElementById("CreateBtn");
var UpdateBtn = document.getElementById("UpdateBtn");
var emplyeesContainer = document.getElementById("Emplyees");
var btnClose = document.querySelector(".btn-close")
var IntialaBtn = document.querySelector("#IntialaBtn")
var userIcon  = document.getElementById("UserIcon") 
var userPhoto = document.getElementById("UserPhoto")
var searchSelection = document.getElementById("Selection-search")
var searchInput = document.getElementById("searchInput")

// ======================== /\/\** HTML Inputs **/\/\ ========================

var nameInput = document.getElementById("Name");
var emailInput = document.getElementById("Email");
var phoneInput = document.getElementById("Phone");
var ageInput = document.getElementById("Age");
var cityInput = document.getElementById("City");
var startDateInput = document.getElementById("StartDate");
var profileImageInput = document.getElementById("profileImageInput");
// ======================== /\/\** Array and Local Storage **/\/\ ========================

var employees = [];
var JSONData = localStorage.getItem("employees");
if (JSONData != null) {
  employees = JSON.parse(JSONData);
  displayEmployees(employees);
}

// ======================== /\/\** Create Object Of Emplyee **/\/\ ========================

function createEmplyee(
  imagePathName,
  name,
  age,
  City,
  Email,
  Phone,
  StartDate
) {
  return {
    imagePathName,
    name,
    age,
    City,
    Email,
    Phone,
    StartDate,
  };
}

// ======================== /\/\** Create HTML for Emplyee **/\/\ ========================

function EmplyeeTOHTML(Employee, Index) {
  return ` <tr style="line-height: 3;">
  <!-- <th>Profile Image</th> -->
  <td width="100px"><img
  src="./Images/${Employee.imagePathName}"
  class="img-fluid" width="100px"
  height="100px" alt></td>
  <td>${Employee.name}</td>
  <td>${Employee.age}</td>
  <td>${Employee.City}</td>
  <td>${Employee.Email}</td>
  <td>${Employee.Phone}</td>
  <td>${Employee.StartDate}</td>
  <td>
  <button class="btn btn-danger"
  id="DeleteBtn" onclick = "Delete(${Index})">Delete</button></td>
  <td>
  <button class="btn btn-primary" data-bs-toggle="modal"
  data-bs-target="#exampleModal"
  id="DeleteBtn" onclick = "showUpdateForm(${Index})">Update</button>
  </td>
  </tr>`;
}

// ======================== /\/\** Add New Emplyee  **/\/\ ========================

function createNewEmployee() {
  if(! isValidForm()){
    return;
  }
  var newEmployee = createEmplyee(
    profileImageInput.files[0]?.name,
    nameInput.value,
    ageInput.value,
    cityInput.value,
    emailInput.value,
    phoneInput.value,
    startDateInput.value
  );
  employees.push(newEmployee);
  clear();
  document.querySelector("button.btn-close").click();
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployees(employees);
  console.log(newEmployee);
}

// ======================== /\/\** Delete Emplyee  **/\/\ ========================

function Delete(index) {
  employees.splice(index, 1);
  displayEmployees(employees);
  localStorage.setItem("employees", JSON.stringify(employees));
}

// ======================== /\/\** Show Update Form To Update  **/\/\ ========================

function showUpdateForm(index) {
  selectedEmployeeToUpdateImagePath = employees[index].imagePathName
  userIcon.style.display = "none";
  userPhoto.style.display = "block";
  userPhoto.setAttribute("src",`./Images/${employees[index].imagePathName}`)
  nameInput.value = employees[index].name;
  ageInput.value = employees[index].age;
  cityInput.value = employees[index].City;
  emailInput.value = employees[index].Email;
  phoneInput.value = employees[index].Phone;
  const date = new Date( employees[index].StartDate);
  startDateInput.value =  startDateInput.value = date.toISOString().split('T')[0];;
  UpdateBtn.style.display = "block";
  createBtn.style.display = "none";
  selectedEmployeeToUpdate = index;
}

// ======================== /\/\** Update Employee  **/\/\ ========================

function update() {
  employees[selectedEmployeeToUpdate] = createEmplyee(
    profileImageInput.files[0]?.name?profileImageInput.files[0]?.name:selectedEmployeeToUpdateImagePath,
    nameInput.value,
    ageInput.value,
    cityInput.value,
    emailInput.value,
    phoneInput.value,
    startDateInput.value
  );
  localStorage.setItem("employees", JSON.stringify(employees));
  clear();
  displayEmployees(employees);
  UpdateBtn.style.display = "none";
  createBtn.style.display = "block";
  selectedEmployeeToUpdate = 0;
  document.querySelector("button.btn-close").click();
}

// ======================== /\/\** Clear Inputs  **/\/\ ========================

function clear() {
  profileImageInput.value = "";
  nameInput.value = "";
  nameInput.classList.remove("is-invalid");
  nameInput.classList.remove("is-valid");
  nameInput.classList.add("input");
  
  ageInput.value = "";
  ageInput.classList.remove("is-invalid");
  ageInput.classList.remove("is-valid");
  ageInput.classList.add("input");

  cityInput.value = "";
  cityInput.classList.remove("is-invalid");
  cityInput.classList.remove("is-valid");
  cityInput.classList.add("input");

  emailInput.value = "";
  emailInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-valid");
  emailInput.classList.add("input");

  phoneInput.value = "";
  phoneInput.classList.remove("is-invalid");
  phoneInput.classList.remove("is-valid");
  phoneInput.classList.add("input");

  startDateInput.value = "";
  startDateInput.classList.remove("is-invalid");
  startDateInput.classList.remove("is-valid");
  startDateInput.classList.add("input");
}

// ======================== /\/\** Display Employees **/\/\ ========================

function displayEmployees(Array) {
  emplyeesContainer.innerHTML = "";
  for (let index = 0; index < Array.length; index++) {
    emplyeesContainer.innerHTML += EmplyeeTOHTML(Array[index], index);
  }
}

// ======================== /\/\** Validation Inputs **/\/\ ========================

function isValidName(){
  var name = nameInput.value ; 
  return name.length >=3
}


function isValidAge(){
  var age = +ageInput.value ; 
  return age >=18
}


function isValidEmail(){
  var email = emailInput.value; 
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

function isValidCity(){
  var Cities = ["cairo" , "giza" , "alex"]
  var City = cityInput.value.toLowerCase(); 
  return Cities.includes(City)
}

function isValidPhone(){
  var phone = phoneInput.value; 
  var phoneRegex = /^(?:\+20|20|0)1[1250][0-9]{8}$/;
  return phoneRegex.test(phone)
}

function isValidForm(){
  var valid = true;
  if(!isValidName()){
    nameInput.classList.add("is-invalid");
    valid= false;
  }
  if(!isValidEmail()){
    emailInput.classList.add("is-invalid");
    valid= false;
  }
  if(!isValidAge()){
    ageInput.classList.add("is-invalid");
    valid=false;
  }
  if(!isValidCity()){
    cityInput.classList.add("is-invalid");
    valid=false;
  }
  if(!isValidPhone()){
    phoneInput.classList.add("is-invalid");
    valid=false;
  }
  if(!isValidProfileimage()){
    return false;
  }
  return valid;
}


function isValidProfileimage(){
  var inputFiles = profileImageInput.files
  if (inputFiles.length == 0) return false;
  return true;
}

// ======================== /\/\** Add Events **/\/\ ========================
createBtn.addEventListener("click", createNewEmployee);
UpdateBtn.addEventListener("click", update);

btnClose.addEventListener("click" ,()=>{
    clear();
} )

IntialaBtn.addEventListener("click" , ()=>{
    UpdateBtn.style.display = "none";
    createBtn.style.display = "block";
})


nameInput.addEventListener("input" , ()=>{
  if(isValidName()){
    nameInput.classList.replace("input" , "is-valid");
    nameInput.classList.replace("is-invalid" , "is-valid");
  }else{
    nameInput.classList.replace("input" , "is-invalid");
    nameInput.classList.replace("is-valid" , "is-invalid");
  }
})

ageInput.addEventListener("input" , ()=>{
  if(isValidAge()){
    ageInput.classList.replace("input" , "is-valid");
    ageInput.classList.replace("is-invalid" , "is-valid");
  }else{
    ageInput.classList.replace("input" , "is-invalid");
    ageInput.classList.replace("is-valid" , "is-invalid");
  }
})

phoneInput.addEventListener("input" , ()=>{
  if(isValidPhone()){
    phoneInput.classList.replace("input" , "is-valid");
    phoneInput.classList.replace("is-invalid" , "is-valid");
  }else{
    phoneInput.classList.replace("input" , "is-invalid");
    phoneInput.classList.replace("is-valid" , "is-invalid");
  }
})

cityInput.addEventListener("input" , ()=>{
  if(isValidCity()){
    cityInput.classList.replace("input" , "is-valid");
    cityInput.classList.replace("is-invalid" , "is-valid");
  }else{
    cityInput.classList.replace("input" , "is-invalid");
    cityInput.classList.replace("is-valid" , "is-invalid");
  }
})


emailInput.addEventListener("input" , ()=>{
  if(isValidEmail()){
    emailInput.classList.replace("input" , "is-valid");
    emailInput.classList.replace("is-invalid" , "is-valid");
  }else{
    emailInput.classList.replace("input" , "is-invalid");
    emailInput.classList.replace("is-valid" , "is-invalid");
  }
  var x= " ahmefe?f"
  x.toLowerCase
  x.toLocaleLowerCase

})

profileImageInput.addEventListener("change" , (e)=>{
  var inputFiles = e.target.files;
  if (inputFiles.length != 0){
    var imgPath = inputFiles[0].name;
    userIcon.style.display = "none";
    userPhoto.style.display = "block";
    userPhoto.setAttribute("src" ,`./Images/${imgPath}`)
  }
})

searchInput.addEventListener("input" , ()=>{
  var result = [];
  if(searchSelection.value != "null"){   
    for(var i = 0 ; i < employees.length ; i ++){
      if(employees[i][searchSelection.value].toLowerCase().includes(searchInput.value.toLowerCase())){
        result.push(employees[i])
      }
    }
    displayEmployees(result) 
  }
})

searchSelection.addEventListener("change" , (e)=>{
  console.log("ah");
  
  if(e.target.value != "null"){
    console.log("aklfmkeo");
    searchInput.removeAttribute("disabled")
  }else{
    searchInput.setAttribute("disabled" )

  }
})  