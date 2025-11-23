


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
const roomButton = document.querySelectorAll("#roomButton")

const modalSelect = document.getElementById("modalSelect")
const modalSelectContainer = document.getElementById("modalSelectContainer")



let expsContainer = document.querySelectorAll(".experiences-container")
// let ExperienceRole = document.querySelectorAll("#ExperienceRole")
let currentRole = document.getElementById("currentRole")
let memberImage = document.getElementById("memberImage")
let dateStart
let dateEnd
let memberCompany
let membersContainer = document.getElementById("membersContainer")
let modalWorker = document.getElementById("modalWorker")
let modalWorkerContainer = document.getElementById("modalWorkerContainer")
let closeMelectModal = document.getElementById("closeMelectModal")



const nameRegex = /^[A-Za-z\s]+$/;
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const numberRegex = /^0[1-9]{9}$/


let employés = []
let count = 1

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
    localStorage.setItem("employés", JSON.stringify(data))
}
function getData() {
    let dataa = localStorage.getItem("employés")
    employés = dataa ? JSON.parse(dataa) : employés = []
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
                        <option >autre</option>
                    </select>
                    <label class="member-info">start:</label>
                    <input name="datestart" type="date" class="member-info-input" id="dateStart">
                    <span id="dateStartErr" class="validErr"></span>
                    <label class="member-info">end:</label>
                    <input name="dateend" type="date" class="member-info-input" id="dateEnd">
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
        inRomme: false,
        id: "",
        namee: "",
        role: "",
        url: "",
        number: "",
        email: ""
    }
    employésInfos.namee = namee.value
    employésInfos.role = currentRole.value
    employésInfos.url = url.value
    employésInfos.number = PNumber.value
    employésInfos.email = Email.value
    employésInfos.id = count
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
    
    url.value = ""
    expsContainer.forEach((div) => {
        let inputs = div.querySelectorAll('.member-info-input');
        inputs.forEach((input) => {
            input.value = ""
        })
    })
    if (memberCompany) {
        errorStartSpan.forEach((err) => {
            err.textContent = ""
        })
    }




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


    if (dateStart.value && dateEnd.value) {
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
    else if (!dateStart.value || !dateEnd.value) {
        errorStartSpan.forEach((err) => {
            err.textContent = "invalid date"
        })
        return false
    }
    else {
        return true
    }



}
let member
function memberInContainer() {

    let template = document.createElement('div')
    template.className = "member-in-container"
    template.setAttribute("id", `${count - 1}`)
    template.innerHTML = `<img src="${employés[employés.length - 1].url}" alt="" class="member-img-in-container">
                    <div class="member-name-in-container">
                        <h3 class="member-info">${employés[employés.length - 1].namee}</h3>
                        <h4>${employés[employés.length - 1].role}</h4>
                    </div>`
    let id = template.getAttribute("id")
    membersContainer.appendChild(template)
    template.addEventListener('click', () => {
        const par = document.createElement('div')
        openModal(modalWorkerContainer)
        par.className = "member-full-infos"
        template = `<div>
                    <img src="${employés[id - 1].url}" alt="" class="member-img-in-container">
                </div>
                <div>
                    <label class="member-info">Name:</label>
                    <h4>${employés[id - 1].namee}</h4>
                </div>
                <div>
                    <label class="member-info">Role:</label>
                    <h4>${employés[id - 1].role}</h4>
                </div>
                <div>
                    <label class="member-info">Email</label>
                    <h4>${employés[id - 1].email}</h4>
                </div>
                <div>
                    <label class="member-info">Phone:</label>
                    <h4>${employés[id - 1].number}</h4>
                 </div>   
                `
        if (employés[id - 1].experiences.length > 0) {

            for (let i = 0; i < employés[id - 1].experiences.length; i++) {
                if (employés[id - 1].experiences[i].company != "") {
                    template += `<label class="member-info">experience</label>`
                    template += `<div class="experiences-div">
                    
                    <h4>Company: ${employés[id - 1].experiences[i].company}</h4>
                    <h4>Role: ${employés[id - 1].experiences[i].role}</h4>
                    <h4>Start: ${employés[id - 1].experiences[i].datestart}</h4>
                    <h4>End: ${employés[id - 1].experiences[i].dateend}</h4>
                </div>
                                
                `}

            }
            template += `<button type="button" class="modal-ajout-buttons" id="closeMemberModal" onclick="closeModal(modalWorkerContainer)">
                        close
                    </button>`
            par.innerHTML = template
            modalWorker.replaceChildren(par)
        }
        else {
            template += `<button type="button" class="modal-ajout-buttons" id="closeMemberModal" onclick="closeModal(modalWorkerContainer)">
                        close
                    </button>
                `
            par.innerHTML = template
            modalWorker.replaceChildren(par)
        }
    })
}
function rooms(room) {
    const accessToRooms = {
        "Conference": [
            "Récepionniste",
            "Technicien iT",
            "Agent de sécurité",
            "Néttoyage",
            "Manager",
            "autre"
        ],
        "Archives": [
            "Récepionniste",
            "Technicien iT",
            "Agent de sécurité",
            "Manager",
            "autre"
        ],
        "Staff": [
            "Récepionniste",
            "Technicien iT",
            "Agent de sécurité",
            "Néttoyage",
            "Manager",
            "autre"
        ],
        "Reception": [
            "Néttoyage",
            "Récepionniste",
            "Manager"
        ],
        "Security": [
            "Agent de sécurité",
            "Manager",
            "Néttoyage"
        ],
        "Server": [
            "Technicien iT",
            "Manager",
            "Néttoyage"
        ]
    }
    const roomWhereIam = accessToRooms[room]
    return roomWhereIam
}


function limitations(e, btn) {
    if ("Conference" == `${e}` && btn.parentElement.children.length >= 5) {
        btn.style.display = "none"
    }
    if ("Conference" == `${e}` && btn.parentElement.children.length < 5) {

        btn.style.display = "inline-block"
    }
    
    if ("Archives" == `${e}` && btn.parentElement.children.length >= 3) {
        btn.style.display = "none"
    }
    if ("Archives" == `${e}` && btn.parentElement.children.length < 3) {
        btn.style.display = "inline-block"
    }
    if ("Archives" == `${e}` && btn.parentElement.children.length > 1) {
        btn.parentElement.style.border = 0
    }
    if ("Archives" == `${e}` && btn.parentElement.children.length <= 1) {
        btn.parentElement.style.border = "solid"
        btn.parentElement.style.borderColor = "red"
    }
    if ("Staff" == `${e}` && btn.parentElement.children.length >= 4) {
        btn.style.display = "none"
    }
    if ("Staff" == `${e}` && btn.parentElement.children.length < 4) {
        btn.style.display = "inline-block"
    }
    
    if ("Reception" == `${e}` && btn.parentElement.children.length >= 5) {
        btn.style.display = "none"
    }
    if ("Reception" == `${e}` && btn.parentElement.children.length < 5) {
        btn.style.display = "inline-block"
    }
    if ("Reception" == `${e}` && btn.parentElement.children.length > 1) {
        btn.parentElement.style.border = 0
    }
    if ("Reception" == `${e}` && btn.parentElement.children.length <= 1) {
        btn.parentElement.style.border = "solid"
        btn.parentElement.style.borderColor = "red"
    }
    if ("Security" == `${e}` && btn.parentElement.children.length >= 3) {
        btn.style.display = "none"
    }
    if ("Security" == `${e}` && btn.parentElement.children.length < 3) {
        btn.style.display = "inline-block"
    }
    if ("Security" == `${e}` && btn.parentElement.children.length > 1) {
        btn.parentElement.style.border = 0
    }
    if ("Security" == `${e}` && btn.parentElement.children.length <= 1) {
        btn.parentElement.style.border = "solid"
        btn.parentElement.style.borderColor = "red"
    }
    if ("Server" == `${e}` && btn.parentElement.children.length >= 3) {
        btn.style.display = "none"
    }
    if ("Server" == `${e}` && btn.parentElement.children.length < 3) {
        btn.style.display = "inline-block"
    }
    if ("Server" == `${e}` && btn.parentElement.children.length > 1) {
        btn.parentElement.style.border = 0
    }
    if ("Server" == `${e}` && btn.parentElement.children.length <= 1) {
        btn.parentElement.style.border = "solid"
        btn.parentElement.style.borderColor = "red"

    }


}

function confereceRoom() {
    roomButton.forEach(btn => {
        btn.addEventListener('click', () => {
            modalSelect.innerHTML = ""
            modalSelect.innerHTML = `<div class="select" >
                    <h2 class="select-heading">select worker to assign</h2>
                </div>`

            openModal(modalSelectContainer)
            let newArray = employés.filter(emp => {
                return rooms(btn.parentElement.id).includes(emp.role)
            })
            

            newArray.forEach((emp) => {
                if (!emp.inRomme) {
                    console.log(emp)
                    let template = document.createElement('div')
                    template.className = "member-in-container"
                    template.setAttribute("id", `${emp.id}`)
                    template.innerHTML = `<img src="${emp.url}" alt="" class="member-img-in-room">
                    <div class="member-name-in-container">
                        <label class="member-infoo">${emp.namee}</label>
                        <h4 class="member-infoo">${emp.role}</h4>
                    </div>`
                    console.log(template)
                    modalSelect.appendChild(template)
                    template.addEventListener('click', () => {
                        console.log('hello')
                        emp.inRomme = true
                        let room = document.getElementById(btn.parentElement.id)
                        room.appendChild(template)
                        closeModal(modalSelectContainer)
                        limitations(btn.parentElement.id, btn)

                        const child = document.getElementById(emp.id)
                        membersContainer.removeChild(child)
                        template.addEventListener('click', () => {
                            emp.inRomme = false
                            modalSelect.appendChild(template)
                            membersContainer.appendChild(child)
                            limitations(btn.parentElement.id, btn)
                        })

                    })


                }


            })
            let closee = document.createElement('div')
            closee.innerHTML = `<button type="button" class="modal-ajout-buttons" id="closeMelectModal" onclick="closeModal(modalSelectContainer)">
                        close
                    </button>`
            modalSelect.appendChild(closee)
            

        })


    })
}
function appInit() {
    addButton.addEventListener("click", () => {
        openModal(addModal)
    })
    appendImage()
    expButton.addEventListener("click", () => {
        
        experienceDiv()
    })
    addWorkerForm.addEventListener("submit", (e) => {
        e.preventDefault()

        nameCheck()
        urlCheck()
        emailCheck()
        numberCheck()
        regexCheck()
        // dateCheck()
        if (memberCompany) {
            if (regexCheck() && dateCheck()) {
                saveEmployesExp()
                count++
                appendImage2()
                clearInputs()
                memberInContainer()
                closeModal(addModal)
                memberCompany = ""


            }
        }
        else {
            if (regexCheck()) {
                saveEmployesExp()
                count++
                appendImage2()
                clearInputs()
                memberInContainer()
                closeModal(addModal)
                console.log(memberCompany)
            }
        }
        
    })
    closeAddModal.addEventListener("click", () => {
        closeModal(addModal)
    })
    confereceRoom()
    
}
appInit()
