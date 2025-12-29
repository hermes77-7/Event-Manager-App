
class EventClass{

    title: string;
    location: string;
    description: string;
    category: string;
    date: string;
    capacity: string;
    total_registered : number;

    constructor(title: string, location: string, description: string, category: string, date: string, capacity: string, total_registered : number){
        
        this.title = title;
        this.location = location;
        this.capacity = capacity;
        this.category = category;
        this.date = date;
        this.description = description;
        this.total_registered = total_registered;

    }
}

class UserClass{
    username : string;
    email: string;
    events_registered : number[];

    constructor(username : string, email: string, events_registered : number[]){
        this.email = email;
        this.username = username;
        this.events_registered = events_registered;
    }
}

class AdminClass{
    admin_name : string;
    password : string;
    email : string;

    constructor(admin_name : string , password : string, email : string){
        this.admin_name = admin_name;
        this.password = password;
        this.email = email;
    }
}


const sw_button = document.getElementById("mode");
var sw_val = 0;
var create_event_value: number = 0;
const container = document.getElementById("main_container");
const container_header = document.getElementById("header");
const hypelink1 = document.getElementById("hp1");
const hypelink2 = document.getElementById("hp2");
const container_body = document.getElementById("cont_body");
const container_footer = document.getElementById("cont_footer");
const event_body = document.getElementById("evt_body");
const home_body = document.getElementById("home_body");
const Event_container = document.getElementById("event_container") as HTMLDivElement;
const create_event_button = document.getElementById("create_event") as HTMLButtonElement | null;
const EventFormDiv = document.getElementById("EventCreator");
const EventFormReader = document.getElementById("create_event_form") as HTMLFormElement | null;
const Eventholder = document.getElementById("evholder") as HTMLDivElement | null;
const Id_input = document.getElementById("event_idz") as HTMLInputElement;
const AdminFormReader = document.getElementById("adminRegisterForm") as HTMLFormElement;
const RegistrationFormReader = document.getElementById("event_registration_form") as HTMLFormElement;


const savedAdmins = localStorage.getItem("admins");
if (savedAdmins) {
    admin_array = JSON.parse(savedAdmins);
}


var default_event = new EventClass("1", "1", "1", "1", "1", "1", 0);

var event_array : EventClass[] = [];
var users_array : UserClass[] = [];
var admin_array : AdminClass[] = [];

function Search<T>(arr: T[], target: T) : number {
    var val : number = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            val = i;
            break;
        }
        else{ val = -1; }
    }
    return val;
}

function clearArrays(){
    users_array = [];
    admin_array = [];
    event_array = [];

    localStorage.setItem("users", JSON.stringify(users_array));
    localStorage.setItem("events", JSON.stringify(event_array));
    localStorage.setItem("admins", JSON.stringify(admin_array));

}

function RegisterForEvent(){

    const savedEvents = localStorage.getItem("events");
if (savedEvents) {
    event_array = JSON.parse(savedEvents);
}

        const savedUsers = localStorage.getItem("users");
if (savedUsers) {
    users_array = JSON.parse(savedUsers);
}

    const reg_name_input = document.getElementById("user_name") as HTMLInputElement;
    const reg_email_input = document.getElementById("user_email") as HTMLInputElement;
    const evt_id_input = document.getElementById("event_idz") as HTMLInputElement;

    var rname = reg_name_input.value;
    var remail = reg_email_input.value;
    var evtid = Number(evt_id_input.value);
    var foundR : number = -2;

    if(evtid > event_array.length || evtid < 1){
        alert("invalid event id");
        return;
    }

    var evt_temp = event_array[evtid-1];

    for(const x of users_array){
        if(x.email === remail){
            foundR = Search(x.events_registered, evtid);

            if (foundR === -1){

                if(Number(evt_temp.capacity) === evt_temp.total_registered){
                    alert("this event is full");
                }
                else{

                    x.events_registered.push(evtid);
                    evt_temp.total_registered += 1;
                    localStorage.setItem("users", JSON.stringify(users_array));
                    localStorage.setItem("events", JSON.stringify(event_array));
                    alert("Succefully registered for event " + evtid);

                }
            }
            else{
                alert("You already registered for this event");
            }
            break
        }
    }

    if (foundR === -2){
            var reg_variable = new UserClass(rname, remail, []);
            users_array.push(reg_variable);
            localStorage.setItem("users", JSON.stringify(users_array));
            alert("User Sucessfully Created");
            

            if(Number(evt_temp.capacity) === evt_temp.total_registered){
                alert("this event is full");
            }
            else{

                var temp : UserClass = users_array[users_array.length - 1];
                temp.events_registered.push(evtid);
                evt_temp.total_registered += 1;
                alert("Succefully registered for event " + evtid);
                localStorage.setItem("users", JSON.stringify(users_array));
                localStorage.setItem("events", JSON.stringify(event_array));
            }
        }
}

function createSubCard(label: string, value: string) {
  const sub = document.createElement("div");
  sub.className = "subcard";

  const labelEl = document.createElement("h4");
  labelEl.innerHTML = `<b>${label}</b>`;

  const valueEl = document.createElement("h4");
  valueEl.textContent = value;

  sub.appendChild(labelEl);
  sub.appendChild(valueEl);

  return sub;
}

function RenderEvents() {
    
    const savedEvents = localStorage.getItem("events");
if (savedEvents) {
    event_array = JSON.parse(savedEvents);
}

const savedUsers = localStorage.getItem("users");
if (savedUsers) {
    users_array = JSON.parse(savedUsers);
}

  if (!Eventholder) return;

  Eventholder.innerHTML = "";
  var idz : number = 1;

  event_array.forEach((evt, index) => {
    
    const card = document.createElement("div");
    card.className = "card";

    const headcard = document.createElement("div");
    headcard.className = "headcard";

    const title = document.createElement("h2");
    title.innerHTML = `<b>${evt.title}</b>`;

    const date = document.createElement("h3");
    date.innerHTML = `<b>${evt.date}</b>`;

    headcard.appendChild(title);
    headcard.appendChild(date);

    const bodycard = document.createElement("div");
    bodycard.className = "bodycard";

    
    const desc = createSubCard("Description:", evt.description);
    const loc = createSubCard("Location:", evt.location);
    const cat = createSubCard("Category:", evt.category);
    const cap = createSubCard("Capacity:", evt.capacity);
    const event_id = createSubCard("Event ID:", idz.toString());

    const registerBtn = document.createElement("button");
    registerBtn.className = "register_button";
    registerBtn.id = idz.toString();
    registerBtn.textContent = "Register For Event";
    registerBtn.addEventListener("click", () => {
      window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
  if(Id_input){
    Id_input.value = registerBtn.id;
  }
    });

    bodycard.appendChild(desc);
    bodycard.appendChild(loc);
    bodycard.appendChild(cat);
    bodycard.appendChild(cap);
    bodycard.appendChild(event_id);
    bodycard.appendChild(registerBtn);

    card.appendChild(headcard);
    card.appendChild(bodycard);

    Eventholder.appendChild(card);

    idz = idz + 1;
  });
}

event_array.push(default_event);
RenderEvents();


function CreateAdmin(){
    const savedAdmins = localStorage.getItem("admins");
if (savedAdmins) {
    admin_array = JSON.parse(savedAdmins);
}

    const admin_name_input = document.getElementById("adminName") as HTMLInputElement;
    const admin_email_input = document.getElementById("adminEmail") as HTMLInputElement;
    const admin_password_input = document.getElementById("adminPassword") as HTMLInputElement;

    var aname = admin_name_input.value;
    var aemail = admin_email_input.value;
    var apass = admin_password_input.value;
    var foundA : number = 0;
    

    for(const j of admin_array){
        if(j.admin_name === aname){
            alert("This admin already exists");
            foundA = 1;
            break
        }
    }
    
    if(foundA == 0){
        var admin_variable = new AdminClass(aname, apass, aemail);

    admin_array.push(admin_variable);
    localStorage.setItem("admins", JSON.stringify(admin_array));
    alert("Admin Registered");
    }
}


function CreateEvent(){

    const savedAdmins = localStorage.getItem("admins");
if (savedAdmins) {
    admin_array = JSON.parse(savedAdmins);
}

const savedEvents = localStorage.getItem("events");
if (savedEvents) {
    event_array = JSON.parse(savedEvents);
}

    const event_title_input = document.getElementById("evtitle") as HTMLInputElement;
    const event_desc_input = document.getElementById("evdesc") as HTMLInputElement;
    const event_loc_input = document.getElementById("evloc") as HTMLInputElement;
    const event_date_input = document.getElementById("evdate") as HTMLInputElement;
    const event_cat_input = document.getElementById("evcat") as HTMLInputElement;
    const event_cap_input = document.getElementById("evcap") as HTMLInputElement;
    const admin_name_input = document.getElementById("admin_name") as HTMLInputElement;
    const admin_password_input = document.getElementById("admin_password") as HTMLInputElement;

    const adm_name = admin_name_input.value;
    const adm_password = admin_password_input.value;

    let found = 0;

    for (const admin of admin_array) {
        if (admin.admin_name === adm_name) {
            if (admin.password === adm_password) {
                found = 1;
            } else {
                found = 2;
            }
            break;
        }
    }

    if (found === 1) {
        const evt_variable = new EventClass(
            event_title_input.value,
            event_loc_input.value,
            event_desc_input.value,
            event_cat_input.value,
            event_date_input.value,
            event_cap_input.value,
            0
        );

        event_array.push(evt_variable);
        localStorage.setItem("events", JSON.stringify(event_array));
        RenderEvents();
        alert("Event Successfully Created");
    }

    if (found === 2) {
        alert("Invalid admin password");
    }

    if(found === 0){
        alert("Invalid Admin");
    }
}

function initEvtp(){
    RenderEvents();
}

function DisplayEvtForm(){
    if(create_event_value == 0){
    if(EventFormDiv){
        EventFormDiv.style.display = "none";
    }    
}
else{
    if(EventFormDiv){
        EventFormDiv.style.display = "flex";
    }
}
}


function LightMode(){
    if(home_body){
        home_body.style.backgroundImage = "url(assets/OverallWhiteBG.png)";
    }
    if(event_body){
        event_body.style.backgroundImage = "url( /assets/OverallWhiteBG.png)";
    }
    
    if(sw_button){
        sw_button.textContent = "Dark Mode"
    }

        sw_val = 0;
        
        if(container){
            container.style.backgroundImage = "url(assets/WhiteContainerBG.jpg)";
            }
            if(Event_container){
                Event_container.style.backgroundColor = "#ffffffff"
            }
        if(container_header){
            container_header.style.backgroundColor = "#070391";
            container_header.style.color = "#ffffffff"
        }
        if(hypelink1){
            hypelink1.style.color = "#ffffffff";
        }
        if(hypelink2){
            hypelink2.style.color = "#ffffffff";
        }
        if(container_body){
            container_body.style.color = "#000000"
        }
        if(container_footer){
            container_footer.style.color = "#000000"
        }
}

function DarkMode(){

     if(home_body){
        home_body.style.backgroundImage = "url(assets/OverallBlackBG.jpeg)";
    }
    if(event_body){
        event_body.style.backgroundImage = "url( /assets/OverallBlackBG.jpeg)";
    }
        sw_val = 1;

        if(sw_button){
        sw_button.textContent = "Light Mode"
    }

        if(container){
            container.style.backgroundImage = "url(assets/BlackContainerBG.jpg)";
            }
        if(Event_container){
            Event_container.style.backgroundColor = "#060527ff"
        }

        if(container_header){
            container_header.style.backgroundColor = "#000000ff";
            container_header.style.color = "#ffffffff";
            
        }
        if(hypelink1){
            hypelink1.style.color = "#ffffffff";
        }
        if(hypelink2){
            hypelink2.style.color = "#ffffffff";
        }
        if(container_body){
            container_body.style.color = "#ffffffff"
        }
        if(container_footer){
            container_footer.style.color = "#ffffffff"
        }
}



if(home_body){
        home_body.style.backgroundImage = "url(assets/OverallWhiteBG.png)";
    }

if(event_body){
        event_body.style.backgroundImage = "url( /assets/OverallWhiteBG.png)";
    }
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";

if(container){
container.style.backgroundImage = "url(assets/WhiteContainerBG.jpg)";
}
if(Event_container){
    Event_container.style.backgroundColor = "#ffffffff"
}

sw_button?.addEventListener("click", () => {
    if(sw_val == 0){
        DarkMode();
    }

    else{
        LightMode();
    }
});


create_event_button?.addEventListener("click", () => {
    if(create_event_value == 0){
        create_event_value = 1;
    }
    else{
        create_event_value = 0
    }
    DisplayEvtForm();
});

if(create_event_value == 0){
    if(EventFormDiv){
        EventFormDiv.style.display = "none";
    }    
}



EventFormReader?.addEventListener("submit", (e) => {
    
    CreateEvent();
    create_event_value = 0;
    
});

AdminFormReader?.addEventListener("submit", (a) => {
    
    a.preventDefault();
    CreateAdmin();
    
});


document.addEventListener("DOMContentLoaded", () => {
    if(document.body.id === "evt_body"){
        initEvtp();
    }
});

RegistrationFormReader.addEventListener("submit", (z) => {

    z.preventDefault();
    RegisterForEvent();

});