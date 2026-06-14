// =====================================
// TYPING EFFECT
// =====================================

const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Problem Solver",
    "Community Leader",
    "MERN Stack Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex++);

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex--);

    }

    if (charIndex === currentRole.length + 1) {

        deleting = true;

        setTimeout(typeEffect, 1200);

        return;
    }

    if (charIndex === 0) {

        deleting = false;

        roleIndex =
            (roleIndex + 1) % roles.length;
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 120
    );
}

typeEffect();


// =====================================
// THEME TOGGLE
// =====================================

const themeButton =
    document.querySelector(".theme-toggle");

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';
}

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("light");

        if (
            document.body.classList.contains("light")
        ) {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeButton.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeButton.innerHTML =
                '<i class="fa-solid fa-moon"></i>';
        }
    }
);


// =====================================
// CUSTOM CURSOR
// =====================================

const cursor =
    document.querySelector(".cursor");

document.addEventListener(
    "mousemove",
    (e) => {

        cursor.style.left =
            e.clientX + "px";

        cursor.style.top =
            e.clientY + "px";
    }
);


// =====================================
// COUNTER ANIMATION
// =====================================

const counters =
    document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    counters.forEach(counter => {

        const target =
            +counter.dataset.target;

        let count = 0;

        const increment =
            target / 60;

        const updateCounter = () => {

            if (count < target) {

                count += increment;

                counter.innerText =
                    Math.ceil(count);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.innerText =
                    target;
            }
        };

        updateCounter();

    });

}


// =====================================
// SCROLL REVEAL
// =====================================

const revealElements =
document.querySelectorAll(
".section, .stat-card, .skill, .project-card, .achievement-card"
);

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{
threshold:0.15
}

);

revealElements.forEach(el=>{

revealObserver.observe(el);

});


// =====================================
// START COUNTERS WHEN VISIBLE
// =====================================

const statsSection =
document.querySelector(".stats-section");

const statsObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(
entry.isIntersecting &&
!counterStarted
){

counterStarted = true;

startCounters();

}

});

},
{
threshold:0.3
}

);

statsObserver.observe(statsSection);


// =====================================
// SKILL BAR ANIMATION
// =====================================

const progressBars =
document.querySelectorAll(".progress");

const skillSection =
document.querySelector("#skills");

let skillsAnimated = false;

const skillObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(
entry.isIntersecting &&
!skillsAnimated
){

skillsAnimated = true;

progressBars.forEach(bar=>{

const width =
bar.dataset.width;

bar.style.width =
width + "%";

});

}

});

},

{
threshold:0.3
}

);

skillObserver.observe(skillSection);


// =====================================
// ACTIVE NAVIGATION
// =====================================

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(
"nav ul li a"
);

window.addEventListener(
"scroll",
()=>{

let current = "";

sections.forEach(section=>{

const sectionTop =
section.offsetTop;

if(
window.scrollY >=
sectionTop - 200
){

current =
section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href")
===
`#${current}`
){

link.classList.add("active");

}

});

}
);


// =====================================
// SMOOTH SCROLL
// =====================================

document
.querySelectorAll("nav a")
.forEach(anchor=>{

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

document
.querySelector(
this.getAttribute("href")
)
.scrollIntoView({

behavior:"smooth"

});

});

});


// =====================================
// TOAST MESSAGE
// =====================================

function showToast(message){

const toast =
document.createElement("div");

toast.className = "toast";

toast.innerText = message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add(
"show-toast"
);

},100);

setTimeout(()=>{

toast.classList.remove(
"show-toast"
);

setTimeout(()=>{

toast.remove();

},500);

},3000);

}


// =====================================
// CONTACT FORM
// =====================================

const contactForm =
document.getElementById(
"contactForm"
);

contactForm.addEventListener(
"submit",
(e)=>{

e.preventDefault();

const inputs =
contactForm.querySelectorAll(
"input, textarea"
);

let valid = true;

inputs.forEach(input=>{

if(
input.value.trim() === ""
){

valid = false;

}

});

if(!valid){

showToast(
"Please fill all fields"
);

return;

}

showToast(
"Message Sent Successfully 🚀"
);

contactForm.reset();

}
);


// =====================================
// PROJECT MODAL
// =====================================

const modal =
document.getElementById(
"projectModal"
);

const modalTitle =
document.getElementById(
"modalTitle"
);

const modalDescription =
document.getElementById(
"modalDescription"
);

const projectButtons =
document.querySelectorAll(
".project-btn"
);

projectButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

const projectName =
button.parentElement
.querySelector("h3")
.innerText;

modalTitle.innerText =
projectName;

if(
projectName ===
"Clean Slate"
){

modalDescription.innerText =
"Developed a MERN Stack platform connecting households and freelancers. Features include secure APIs, dashboard management, and scalable architecture.";

}
else{

modalDescription.innerText =
"Built a Machine Learning model using K-Means, DBSCAN, Hierarchical Clustering and GMM for fake news detection and analysis.";

}

modal.style.display =
"flex";

}
);

});

document
.querySelector(".close-modal")
.addEventListener(
"click",
()=>{

modal.style.display =
"none";

}
);

window.addEventListener(
"click",
(e)=>{

if(
e.target === modal
){

modal.style.display =
"none";

}

}
);


// =====================================
// PAGE LOAD EFFECT
// =====================================

window.addEventListener(
"load",
()=>{

document.body.classList.add(
"loaded"
);

}
);