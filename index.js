const form = document.getElementById('form');
const input = document.getElementById('input');
const tareasUL = document.getElementById('tareas');

const tareas = JSON.parse(localStorage.getItem ('tareas'));

if (tareas) {
        tareas.forEach(tarea => {
            
            addTarea(tarea)
        });
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTarea();
});

function addTarea(tarea) {
    let tareaText = input.value;

    if(tarea) { 
        tareaText = tarea.Text;
    }

    if(tareaText) {
            const tareaEl = document.createElement("li");
            if (tarea && tarea.completed) {
                tareaEl.classList.add("completed");
            }

            tareaEl.innerText = tareaText;
            
            tareaEl.addEventListener('click', () => {
                tareaEl.classList.toggle('completed');
    
                updateLS(); //colocar aca igual el update, asi en el lstorage te figura true cuando tachas y borras la task.
    
            });
            // esto de abajo me permite usar el click derecho para anular lo realizado en la lista ó lo que quieras utilizar.
            tareaEl.addEventListener("contextmenu", (e)=> {
                e.preventDefault();
    
                tareaEl.remove();              //en este caso nos borra la tarea que realizamos o finalizamos de la lista.
                updateLS(); //colocar aca igual el update, asi en el lstorage te figura true cuando tachas y borras la task.
            });
    //
            tareasUL.appendChild(tareaEl);
            
            input.value = "";
    
            updateLS();
        }
}   

function updateLS() {
    const tareasEl = document.querySelectorAll('li');

    const tareas = [];

    tareasEl.forEach(tareaEL => {               //si esta completada la agrega en el storage
        tareas.push({
            text: tareaEL.innerText,
            completed: tareaEL.classList.contains ('completed')
        });
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));
}