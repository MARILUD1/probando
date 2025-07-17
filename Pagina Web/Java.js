document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const edad = document.getElementById("edad");
    const submitBtn = document.getElementById("submitBtn");

    const errorNombre = document.getElementById("errorNombre");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorConfirmPassword = document.getElementById("errorConfirmPassword");
    const errorEdad = document.getElementById("errorEdad");

    function validarNombre() {
        const valido = nombre.value.trim().length >= 3;
        errorNombre.textContent = valido ? "" : "El nombre debe tener al menos 3 caracteres.";
        nombre.classList.toggle("valid", valido);
        nombre.classList.toggle("invalid", !valido);
        return valido;
    }

    function validarEmail() {
        const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        errorEmail.textContent = valido ? "" : "Correo electrónico no válido.";
        email.classList.toggle("valid", valido);
        email.classList.toggle("invalid", !valido);
        return valido;
    }

    function validarPassword() {
        const valido = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password.value);
        errorPassword.textContent = valido ? "" : "La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.";
        password.classList.toggle("valid", valido);
        password.classList.toggle("invalid", !valido);
        return valido;
    }

    function validarConfirmPassword() {
        const valido = password.value === confirmPassword.value && confirmPassword.value !== "";
        errorConfirmPassword.textContent = valido ? "" : "Las contraseñas no coinciden.";
        confirmPassword.classList.toggle("valid", valido);
        confirmPassword.classList.toggle("invalid", !valido);
        return valido;
    }

    function validarEdad() {
        const valor = parseInt(edad.value);
        const valido = !isNaN(valor) && valor >= 18;
        errorEdad.textContent = valido ? "" : "Debes tener al menos 18 años.";
        edad.classList.toggle("valid", valido);
        edad.classList.toggle("invalid", !valido);
        return valido;
    }

    function validarFormulario() {
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const passwordValido = validarPassword();
        const confirmValido = validarConfirmPassword();
        const edadValida = validarEdad();
        const todoValido = nombreValido && emailValido && passwordValido && confirmValido && edadValida;
        submitBtn.disabled = !todoValido;
        return todoValido;
    }

    [nombre, email, password, confirmPassword, edad].forEach(input => {
        input.addEventListener("input", validarFormulario);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            alert("Formulario enviado correctamente.");
            form.reset();
            submitBtn.disabled = true;
            [nombre, email, password, confirmPassword, edad].forEach(input => {
                input.classList.remove("valid", "invalid");
            });
        }
    });

// --- Lógica para el botón "Cambiar contenido" ---
    const boton = document.getElementById("boton");
    const descripcion = document.getElementById("descripcion");

    if (boton && descripcion) {
        boton.addEventListener("click", () => {
            descripcion.innerHTML = `
                <strong>En cambio:</strong><br>
                <strong>¿Qué es JavaScript?</strong><br>
                <em>JavaScript es esencialmente el cerebro de la mayoría de los sitios web modernos. 
                Es lo que hace que las páginas sean interactivas, dinámicas y ofrezcan una experiencia de usuario fluida y receptiva. 
                Sin JavaScript, la web sería mucho más estática y menos atractiva.</em>
            `;
        });
    }

    // --- Lógica para la Galería de imágenes ---
    const inputUrl = document.getElementById("imageUrl");
    const addBtn = document.getElementById("addImageBtn");
    const deleteBtn = document.getElementById("deleteImageBtn");
    const gallery = document.getElementById("gallery");

    let selectedImage = null; // Para mantener un registro de la imagen actualmente seleccionada

    // Comprobar que todos los elementos existen antes de añadir event listeners
    if (inputUrl && addBtn && deleteBtn && gallery) {
        // Función para deseleccionar todas las imágenes
        function deselectAllImages() {
            document.querySelectorAll(".gallery-image").forEach((el) => {
                el.classList.remove("selected");
            });
        }

        // Agregar imagen
        addBtn.addEventListener("click", () => {
            const url = inputUrl.value.trim();
            if (url === "") {
                alert("Por favor, ingresa una URL válida para la imagen.");
                return;
            }

            const img = document.createElement("img");
            img.src = url;
            img.classList.add("gallery-image");

            // Event listener para seleccionar la imagen
            img.addEventListener("click", () => {
                deselectAllImages(); 
                img.classList.add("selected"); // Seleccionar esta imagen
                selectedImage = img; // Actualizar la referencia a la imagen seleccionada
            });

            gallery.appendChild(img); // Añadir la imagen a la galería
            inputUrl.value = ""; // Limpiar el input
            selectedImage = null; 
            
        });

        // Eliminar imagen seleccionada
        deleteBtn.addEventListener("click", () => {
            if (selectedImage) {
                if (confirm("¿Estás seguro de que quieres eliminar la imagen seleccionada?")) {
                    selectedImage.remove(); // Eliminar la imagen del DOM
                    selectedImage = null; // Resetear la referencia de la imagen seleccionada
                }
            } else {
                alert("Por favor, selecciona una imagen para eliminar.");
            }
        });

        // Tecla Enter para agregar imagen en el campo de URL
        inputUrl.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Evita el envío del formulario si hay uno
                addBtn.click(); // Simula un clic en el botón de agregar
            }
        });
    } else {
        console.error("Uno o más elementos de la galería no fueron encontrados en el DOM.");
    }

    // --- Lógica para la Lista de Tareas (si existe y quieres activarla) ---
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const botonRosa = document.getElementById("cambiarColorRosaBtn");

if (botonRosa) {
    botonRosa.addEventListener("click", () => {
        document.body.style.backgroundColor = "pink";
    });
}


    if (taskInput && addTaskBtn && taskList) {
        addTaskBtn.addEventListener("click", () => {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item"); // Clase de Bootstrap para ítems de lista
                listItem.textContent = taskText;

                // Opcional: Agregar un botón para eliminar la tarea
                const deleteSpan = document.createElement("span");
                deleteSpan.textContent = " X";
                deleteSpan.style.cursor = "pointer";
                deleteSpan.style.float = "right";
                deleteSpan.style.color = "red";
                deleteSpan.addEventListener("click", () => {
                    listItem.remove();
                });
                listItem.appendChild(deleteSpan);

                taskList.appendChild(listItem);
                taskInput.value = ""; // Limpiar el input
            } else {
                alert("Por favor, escribe una inquietud.");
            }

        });


        // Permitir agregar con Enter en el campo de texto
        taskInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Previene el salto de línea por defecto
                addTaskBtn.click();
            }
            
        });
    }
});