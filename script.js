const taskButton = document.getElementById('hedbtn');

const Todo = document.getElementById('Todo');


let count=0;

taskButton.addEventListener("click", () => {
   
    let task = document.createElement('div');
        task.className ='card';
        task.id=`task-${++count}`
        task.innerText = "Give task name!";
        task.contentEditable = true;
        task.setAttribute("draggable", 'true');
    Todo.append(task);
   
    task.addEventListener("click", () => {
        if (task.innerText.trim() == "Give task name!") {
            task.innerText = "";
        }
    })
    task.addEventListener("blur", () => {
        if (task.innerText.trim() == "") {
            task.remove();
            updateCounts();
        }
    })

    task.addEventListener("dragstart", (event)=>{
        task.style.opacity="0.5";
        event.dataTransfer.setData("text", task.id);
    })
    task.addEventListener("dragend", ()=>{
        task.style.opacity="0.75";
        updateCounts();
    })

    let dragEvents = ["dragover","dragenter", "drop"];

    dragEvents.forEach((eventOfDrag)=>{
        let areasOfDrop=document.getElementsByClassName("section_child");
        for(let area of areasOfDrop){
            area.addEventListener(eventOfDrag, (event)=>{
                event.preventDefault();
                if(eventOfDrag=="drop"){
                    let taskId= event.dataTransfer.getData("text");
                    let dragTask = document.getElementById(taskId);
                    let dropArea= event.target;

                    dropArea.append(dragTask);
                   
                }
                updateCounts();
            })
        }

    })

    updateCounts();
})

function updateCounts() {
    let todoListCount = Todo.children.length-1;
    let progressListCount = Progress.children.length-1;
    let doneListCount = Done.children.length-1;

    document.querySelector('.td').innerText = todoListCount;
    document.querySelector('.pro').innerText = progressListCount;
    document.querySelector('.dn').innerText = doneListCount;
}