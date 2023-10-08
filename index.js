class Note {
    constructor(title, info, data) {
        this.title = title;
        this.info = info;
        this.data = data;
    }
}

var searchNotes = document.getElementsByClassName("searchNotes");
var addNotes = document.getElementsByClassName("addNotes");

var inputSearch = document.getElementById("inputSearch");

inputSearch.addEventListener("input", function(){
    const dadosLocalStorage = localStorage.getItem('Notes');

    // Converte a string de dados de volta para um objeto
    const cadastros = JSON.parse(dadosLocalStorage) || [];

    const filterTerm = inputSearch.value.toLowerCase();

    // Filtra as notas com base no termo de pesquisa
    const filteredCadastros = cadastros.filter(note => note.title.toLowerCase().includes(filterTerm));
    
    
});

function loadNotes() {
    const dadosLocalStorage = localStorage.getItem('Notes');

    // Converte a string de dados de volta para um objeto
    const cadastros = JSON.parse(dadosLocalStorage) || [];
    // Seleciona a div container onde você deseja adicionar as notas
    const containerDiv = document.querySelector('.searchNotes');

    // Itera sobre a lista de cadastros
    cadastros.forEach(function (data) {
        // Cria um novo elemento div para representar a nota
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        // Adiciona o título da nota (h1)
        const titleElement = document.createElement('h1');
        titleElement.textContent = data.title; // Assumindo que campo1 é o título
        noteDiv.appendChild(titleElement);

        // Adiciona a data da nota
        const dateElement = document.createElement('p');
        dateElement.textContent = data.data;
        noteDiv.appendChild(dateElement);

        // Adiciona as informações da nota (p)
        const infoElement = document.createElement('p');
        infoElement.textContent = data.info; // Assumindo que campo2 são as informações
        noteDiv.appendChild(infoElement);

        const deleteButton = document.createElement('div');
        noteDiv.appendChild(deleteButton);
        deleteButton.onclick = function () {
          
            console.log('Nota excluída:', data.title);
            const updatedCadastros = cadastros.filter(note => note.title !== data.title);
            localStorage.setItem('Notes', JSON.stringify(updatedCadastros));
          
            noteDiv.remove();
    
           };

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa', 'fa-trash');
        deleteButton.appendChild(trashIcon);
        // Adiciona o ícone à div
       

        // Adiciona a nota à div container
        containerDiv.appendChild(noteDiv);
    });
    

    //Oculta a tela de Cadastro ao carregar a página
    for (var i = 0; i < addNotes.length; i++) {
        addNotes[i].style.display = "none";
    }

}

function swithComponents(view) {
    if (view == 1) {
        for (var i = 0; i < searchNotes.length; i++) {
            searchNotes[i].style.display = "block";
        }
        for (var i = 0; i < addNotes.length; i++) {
            addNotes[i].style.display = "none";
        }
    } if (view == 2) {
        for (var i = 0; i < searchNotes.length; i++) {
            searchNotes[i].style.display = "none";
        }
        for (var i = 0; i < addNotes.length; i++) {
            addNotes[i].style.display = "block";
        }
    }
}

function saveNote() {
    const title = document.getElementById("noteTitle").value;
    const info = document.getElementById("noteInfo").value;
    const dataAtual = new Date();
    const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    const data = dataAtual.toLocaleDateString('pt-BR', options);

    const note = new Note(title, info, data);

    let allNotes = JSON.parse(localStorage.getItem('Notes')) || [];

    allNotes.push(note);
    console.log(note, allNotes)

    localStorage.setItem('Notes', JSON.stringify(allNotes));


}


