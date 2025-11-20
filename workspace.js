const addModal = document.getElementById("addModal")
const addButton = document.getElementById("addButton")
const expButton = document.getElementById("expButton")
const closeAddModal = document.getElementById("closeModal")
const experiencesContainer = document.getElementById("experiencesContainer")
const addWorkerForm = document.getElementById("addWorkerForm")
const errorNameSpan = document.getElementById("nameError")
const errorRoleSpan = document.getElementById("roleError")
const errorUrlSpan = document.getElementById("urlError")
const errorEmailSpan = document.getElementById("EmailError")
const errorNumberSpan = document.getElementById("NumberError")
let errorStartSpan
// const errorEndSpan = document.getElementById("dateEndErr")
const namee = document.getElementById("memberNameInput")
const url = document.getElementById("memberUrlinput")
const Email = document.getElementById('memberEmilInput')
const PNumber = document.getElementById('memberNumberInput')
let expsContainer = document.querySelectorAll(".experiences-container")
// let ExperienceRole = document.querySelectorAll("#ExperienceRole")
let currentRole = document.getElementById("currentRole")
let memberImage = document.getElementById("memberImage")
let dateStart
let dateEnd
let memberCompany
const nameRegex = /^[A-Za-z\s]+$/;
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const numberRegex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/

let employés = []

function openModal(modal) {
    modal.style.display = "flex"
}
function closeModal(modal) {
    modal.style.display = "none"
}
function nameCheck() {
    if (!nameRegex.test(namee.value)) {
        errorNameSpan.textContent = "invalid name"
        return false
    }
    else {
        return true
    }
}
function urlCheck() {
    if (!urlRegex.test(url.value)) {
        errorUrlSpan.textContent = "invalid Url"
        return false
    }
    else {
        return true
    }
}
function emailCheck() {
    if (!emailRegex.test(Email.value)) {
        errorEmailSpan.textContent = "invalid email"
        return false
    }
    else {
        return true
    }
}
function numberCheck() {
    if (!numberRegex.test(PNumber.value)) {
        errorNumberSpan.textContent = "invalid number"
        return false
    }
    else {
        return true
    }
}
function regexCheck() {
    if (!nameCheck() || !urlCheck() || !emailCheck() || !numberCheck()) {
        return false
    }
    else {
        return true
    }




}
function saveData(data) {
    localStorage.setItem("data", JSON.stringify(data))
}
function experienceDiv() {
    let template = document.createElement("div")
    template.className = "experiences-container"
    template.innerHTML = `
                    <label class="member-info">Company:</label>
                    <input name="company" type="text" class="member-info-input" id="memberCompany">
                    <label class="member-info">Experience:</label>
                    <select name="role" id="memberCompanyRole" class="member-info-input">
                        <option >Récepionniste</option>
                        <option >Technicien iT</option>
                        <option >Agent de sécurité</option>
                        <option >Manager</option>
                        <option >Néttoyage</option>
                    </select>
                    <label class="member-info">start:</label>
                    <input name="date-start" type="date" class="member-info-input" id="dateStart">
                    <span id="dateStartErr" class="validErr"></span>
                    <label class="member-info">end:</label>
                    <input name="date-end" type="date" class="member-info-input" id="dateEnd">
                    <span id="dateStartErr" class="validErr"></span>
                    <button class="modal-ajout-buttons" onclick="return this.parentNode.remove()" >close</button>

                `

    experiencesContainer.appendChild(template)
    dateStart = document.getElementById("dateStart")
    dateEnd = document.getElementById("dateEnd")
    errorStartSpan = document.querySelectorAll("#dateStartErr")
    expsContainer = document.querySelectorAll(".experiences-container")
    memberCompany = document.getElementById("memberCompany")

}
function saveEmployesExp() {
    let employésInfos = {
        namee: "",
        role: "",
        url: ""
    }
    employésInfos.namee = namee.value
    employésInfos.role = currentRole.value
    employésInfos.url = url.value
    employés.push(employésInfos)
    let experiences = []


    expsContainer.forEach((div) => {
        let inputs = div.querySelectorAll('.member-info-input');
        let experience = {}
        inputs.forEach((input) => {
            console.log(input);
            experience[input.name] = input.value
        })
        experiences.push(experience)
    })
    employésInfos.experiences = experiences
}
function clearInputs() {
    currentRole.value = ""
    namee.value = ""
    Email.value = ""
    PNumber.value = ""
    errorNameSpan.textContent = ""
    errorRoleSpan.textContent = ""
    errorUrlSpan.textContent = ""
    errorEmailSpan.textContent = ""
    errorNumberSpan.textContent = ""
    // memberCompanyRole.value = ""
    url.value = ""
    expsContainer.forEach((div) => {
        let inputs = div.querySelectorAll('.member-info-input');
        inputs.forEach((input) => {
            input.value = ""
        })
    })



}
function appendImage() {
    url.addEventListener("keyup", () => {
        template = `<img src="${url.value}" alt="">`
        memberImage.innerHTML = template
    })
}
function appendImage2() {
    template = `<img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="">`
    memberImage.innerHTML = template
}
function dateCheck() {
    if (dateStart && dateEnd) {
        let start = new Date(dateStart.value)
        let end = new Date(dateEnd.value)
        if (start > end) {
            errorStartSpan.forEach((err) => {
                err.textContent = "invalid date"
            })
            return false
        }
        else {
            return true
        }
    }
    else return

}
function appInit() {
    addButton.addEventListener("click", () => {
        openModal(addModal)
    })
    appendImage()
    expButton.addEventListener("click", () => {
        console.log("hello")
        experienceDiv()
    })
    addWorkerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        nameCheck()
        urlCheck()
        emailCheck()
        numberCheck()
        regexCheck()
        dateCheck()
        if (memberCompany) {
            if (regexCheck() && dateCheck()) {
                saveEmployesExp()
                appendImage2()
                clearInputs()
            }
        }
        else {
            if (regexCheck()) {
                saveEmployesExp()
                appendImage2()
                clearInputs()
            }
        }
        console.log(employés)
    })
    closeAddModal.addEventListener("click", () => {
        closeModal(addModal)
    })
}
appInit()
