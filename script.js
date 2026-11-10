// Load saved data
let subjects = JSON.parse(
    localStorage.getItem("subjects")
) || [];

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

// Save data
function saveData() {
    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// Add subject
function addSubject() {
    let input = document.getElementById("subjectInput");
    let subject = input.value.trim();

    if (subject === "") {
        alert("Please enter a subject!");
        return;
    }

    subjects.push(subject);
    input.value = "";

    saveData();
    displaySubjects();
    updateDashboard();
}

// Display subjects
function displaySubjects() {
    let list = document.getElementById("subjectList");
    list.innerHTML = "";

    subjects.forEach((subject, index) => {
        let li = document.createElement("li");
        let name = document.createElement("span");
        name.textContent = subject;

        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => deleteSubject(index);

        li.append(name, btn);
        list.appendChild(li);
    });
}

// Delete subject
function deleteSubject(index) {
    subjects.splice(index, 1);

    saveData();
    displaySubjects();
    updateDashboard();
}

// Add task
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: task,
        completed: false
    });

    input.value = "";

    saveData();
    displayTasks();
    updateDashboard();
}

// Display tasks
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let name = document.createElement("span");
        name.textContent = task.name;

        if (task.completed) {
            name.style.textDecoration = "line-through";
        }

        let completeBtn = document.createElement("button");
        completeBtn.textContent =
            task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => completeTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        li.append(name, completeBtn, deleteBtn);
        list.appendChild(li);
    });
}

// Complete task
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveData();
    displayTasks();
    updateDashboard();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);

    saveData();
    displayTasks();
    updateDashboard();
}

// Update dashboard
function updateDashboard() {
    document.getElementById("subjectCount").textContent =
        subjects.length;

    document.getElementById("taskCount").textContent =
        tasks.length;

    document.getElementById("completedCount").textContent =
        tasks.filter(task => task.completed).length;
}

// Load everything when page opens
displaySubjects();
displayTasks();
updateDashboard();
let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function addAssignment() {
    let name = document.getElementById("assignmentName").value.trim();
    let subject = document.getElementById("assignmentSubject").value.trim();
    let date = document.getElementById("assignmentDate").value;

    if (name === "" || subject === "" || date === "") {
        alert("Please fill all assignment details!");
        return;
    }

    assignments.push({
        name: name,
        subject: subject,
        date: date,
        completed: false
    });

    saveAssignments();

    document.getElementById("assignmentName").value = "";
    document.getElementById("assignmentSubject").value = "";
    document.getElementById("assignmentDate").value = "";

    displayAssignments();
}

function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function displayAssignments() {
    let list = document.getElementById("assignmentList");
    list.innerHTML = "";

    assignments.forEach((item, index) => {
        let li = document.createElement("li");

        let details = document.createElement("span");
        details.textContent = item.name + " | " + item.subject +
            " | Due: " + item.date + " | " +
            (item.completed ? "Completed" : "Pending");

        let complete = document.createElement("button");
        complete.textContent = item.completed ? "Undo" : "Complete";

        complete.onclick = function () {
            assignments[index].completed = !assignments[index].completed;
            saveAssignments();
            displayAssignments();
        };

        let remove = document.createElement("button");
        remove.textContent = "Delete";

        remove.onclick = function () {
            assignments.splice(index, 1);
            saveAssignments();
            displayAssignments();
        };

        li.append(details, complete, remove);
        list.appendChild(li);
    });
}

displayAssignments();
let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

function addTimetable() {
    let subject = document.getElementById("timeSubject").value.trim();
    let start = document.getElementById("startTime").value;
    let end = document.getElementById("endTime").value;

    if (subject === "" || start === "" || end === "") {
        alert("Please fill all timetable details!");
        return;
    }

    if (end <= start) {
        alert("End time must be after start time!");
        return;
    }

    timetable.push({
        subject: subject,
        start: start,
        end: end
    });

    localStorage.setItem("timetable", JSON.stringify(timetable));

    document.getElementById("timeSubject").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";

    displayTimetable();
}

function displayTimetable() {
    let list = document.getElementById("timetableList");
    list.innerHTML = "";

    timetable.forEach((item, index) => {
        let li = document.createElement("li");

        let details = document.createElement("span");
        details.textContent = item.subject + " | " +
            item.start + " - " + item.end;

        let button = document.createElement("button");
        button.textContent = "Delete";

        button.onclick = function () {
            deleteTimetable(index);
        };

        li.append(details, button);
        list.appendChild(li);
    });
}

function deleteTimetable(index) {
    timetable.splice(index, 1);
    localStorage.setItem("timetable", JSON.stringify(timetable));
    displayTimetable();
}

displayTimetable();
let exams = JSON.parse(localStorage.getItem("exams")) || [];

function addExam() {
    let name = document.getElementById("examName").value.trim();
    let subject = document.getElementById("examSubject").value.trim();
    let date = document.getElementById("examDate").value;

    if (name === "" || subject === "" || date === "") {
        alert("Please fill all exam details!");
        return;
    }

    exams.push({
        name: name,
        subject: subject,
        date: date
    });

    saveExams();

    document.getElementById("examName").value = "";
    document.getElementById("examSubject").value = "";
    document.getElementById("examDate").value = "";

    displayExams();
}

function saveExams() {
    localStorage.setItem("exams", JSON.stringify(exams));
}

function displayExams() {
    let list = document.getElementById("examList");
    list.innerHTML = "";

    exams.forEach((item, index) => {
        let li = document.createElement("li");

        let details = document.createElement("span");
        details.textContent = item.name + " | " +
            item.subject + " | Exam Date: " + item.date;

        let remove = document.createElement("button");
        remove.textContent = "Delete";

        remove.onclick = function () {
            exams.splice(index, 1);
            saveExams();
            displayExams();
        };

        li.append(details, remove);
        list.appendChild(li);
    });
}

displayExams();
function updateProgress() {
    document.getElementById("totalSubjects").textContent = subjects.length;

    document.getElementById("totalTasks").textContent = tasks.length;

    let completed = tasks.filter(task => task.completed).length;
    let pending = tasks.length - completed;

    let percentage = tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("progressPercent").textContent = percentage + "%";
}

updateProgress();