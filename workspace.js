const addModal = document.getElementById("addModal")
const addButton = document.getElementById("addButton")
const expButton = document.getElementById("expButton")
const closeAddModal = document.getElementById("closeModal")
const expContainer = document.getElementById("experiencesContainer")
const rolRegex = /^[A-Za-z]+$/;
const nameRegex = /^[A-Za-z\s]+$/;
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
let namee = document.getElementById("memberNameInput")
let url = document.getElementById("memberUrlinput")
let addWorkerForm = document.getElementById("addWorkerForm")
const errorNameSpan = document.getElementById("nameError")
const errorRoleSpan = document.getElementById("roleError")
const errorUrlSpan = document.getElementById("urlError")
let employés = []



function openModal(modal) {
    modal.style.display = "flex"
}
function closeModal(modal) {
    modal.style.display = "none"
}
function nameCheck() {
    if (!nameRegex.test(namee.value)) {
        return false
    }
    else {
        return true
    }
}
function urlCheck() {
    if (!urlRegex.test(url.value)) {
        return false
    }
    else {
        return true
    }
}
function regexCheck() {
    if (!nameCheck()) {
        errorNameSpan.textContent = "invalid name"
    }
    else {
        errorNameSpan.textContent = ""
    }

    if (!urlCheck()) {
        errorUrlSpan.textContent = "invalid url"
    }
    else {
        errorUrlSpan.textContent = ""
    }

}
function saveData(data) {
    localStorage.setItem("data", JSON.stringify(data))
}
function experienceDiv() {
    let template=document.createElement("div")
    template.className="experiences-container"
    template.innerHTML= `
                    <label class="member-info">Company:</label>
                    <input type="text" class="member-info-input">
                    <label class="member-info">Experience:</label>
                    <select name="role-select" id="" class="member-info-input">
                        <option value="">Récepionniste</option>
                        <option value="">Technicien iT</option>
                        <option value="">Agent de sécurité</option>
                        <option value="">Manager</option>
                        <option value="">Néttoyage</option>
                    </select>
                    <button class="modal-ajout-buttons" onclick="return this.parentNode.remove()" >close</button>

                `
    expContainer.appendChild(template)    
    
}
function deleteExp(){ 
}
function appInit() {
    addButton.addEventListener("click", () => {
        openModal(addModal)
    })
    expButton.addEventListener("click", () => {
        console.log("hello")
        experienceDiv()
    })
    addWorkerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        nameCheck()
        urlCheck()
        regexCheck()
    })
    closeAddModal.addEventListener("click", () => {
        closeModal(addModal)
    })
}
appInit()
