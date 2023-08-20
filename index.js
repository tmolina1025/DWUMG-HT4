const readline = require('readline-sync');
const fs = require('fs');

const studentsFile = 'students.json';
let studentsData = [];

// Cargar datos de estudiantes desde el archivo JSON al iniciar la aplicación
try {
  const data = fs.readFileSync(studentsFile, 'utf8');
  studentsData = JSON.parse(data);
} catch (error) {
  console.error('Error al cargar datos:', error.message);
}

// Función para ingresar los datos del estudiante
function addStudent() {
  const carnet = readline.question('Ingrese el carnet del estudiante: ');
  const name = readline.question('Ingrese el nombre del estudiante: ');

  studentsData.push({ carnet, name, tasks: [] });
}

// Función para ingresar notas para una tarea específica
function addTask() {
  const carnet = readline.question('Ingrese el carnet del estudiante: ');
  const student = studentsData.find(s => s.carnet === carnet);

  if (!student) {
    console.log('Estudiante no encontrado.');
    return;
  }

  const taskName = readline.question('Ingrese el nombre de la tarea: ');
  const grade = parseFloat(readline.question('Ingrese la nota obtenida: '));

  student.tasks.push({ taskName, grade });
}

// Función para buscar un estudiante por carnet
function searchStudent() {
  const carnet = readline.question('Ingrese el carnet del estudiante: ');
  const student = studentsData.find(s => s.carnet === carnet);

  if (student) {
    console.log('Estudiante encontrado:');
    console.log('Nombre:', student.name);
    console.log('Tareas y Notas:');
    student.tasks.forEach(task => {
      console.log('Tarea:', task.taskName, 'Nota:', task.grade);
    });
  } else {
    console.log('Estudiante no encontrado.');
  }
}

// Función para mostrar el resumen de notas
function showSummary() {
  studentsData.forEach(student => {
    console.log('Carnet:', student.carnet);
    console.log('Nombre:', student.name);
    console.log('Tareas y Notas:');
    student.tasks.forEach(task => {
      console.log('Tarea:', task.taskName, 'Nota:', task.grade);
    });
    console.log('-------------------------------');
  });
}

// Función para guardar los datos en el archivo JSON
function saveData() {
  fs.writeFileSync(studentsFile, JSON.stringify(studentsData, null, 2), 'utf8');
  console.log('Datos guardados correctamente.');
}

// Menú de opciones
function main() {
  while (true) {
    console.log('\nMenú:');
    console.log('1. Ingresar Estudiante');
    console.log('2. Ingresar Notas');
    console.log('3. Buscar Estudiante');
    console.log('4. Mostrar Resumen');
    console.log('5. Guardar y Salir');

    const option = readline.questionInt('Seleccione una opcion: ');

    switch (option) {
      case 1:
        addStudent();
        break;
      case 2:
        addTask();
        break;
      case 3:
        searchStudent();
        break;
      case 4:
        showSummary();
        break;
      case 5:
        saveData();
        return;
      default:
        console.log('Opcion inválida.');
    }
  }
}

// Ejecutar el menú principal
main();
