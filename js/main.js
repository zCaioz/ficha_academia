
const rotina_list = document.querySelector("#rotina-list")
const exercicio_list = document.querySelector("#exercicios-list")
const form_edit = document.querySelector("#form-edit")
const edit_input = document.querySelector("#edit-input")
const cancel_edit = document.querySelector("#cancel-edit")
const rotina_form = document.querySelector("#form-rotina")
const rotina_input = document.querySelector("#rotina-input")
const header_titulo = document.querySelector('header h1')
const form_p = document.querySelector("#form-label")
const back_button = document.querySelector('#back-button')
const antigo_titulo = header_titulo.innerText
const antigo_placeholder = rotina_input.placeholder
const antigo_indexador = form_p.innerHTML
let titulo_antigo

function add_rotina_treino(value){
    const html_rotina = `
        <div class="rotina" id"">
            <h2>${value}</h2>
            <button class="excluir">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="edit-rotina">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="acessa_exercicios"  onclick="abre_rotina(this)">
                <i class="fa-solid fa-arrow-right"></i>
             </button>

        </div>
    `
    rotina_list.innerHTML += html_rotina
    rotina_input.value = ""
    rotina_input.focus()
}

function gera_exercicio(value){
    const h2 = value
    const header_titulo_rotina = document.querySelector('header h1')
    const nome_classe = header_titulo_rotina.innerText.replace(/\s+/g, '-')
    const objs = {h2,nome_classe}
    salva_exercicio_localstorage(objs)

    return objs
}

function add_exercicio(objeto){
    const nome_classe = objeto.nome_classe
    const value = objeto.h2

    const html_exercicio = `
        
        <div class="${nome_classe} exercicio">
            <h2>${value}</h2>
            <button class="excluir">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `
    exercicio_list.innerHTML += html_exercicio
    rotina_input.value = ""
    rotina_input.focus() 
}

function itens_localstorage(){
    const exercicios = JSON.parse(localStorage.getItem("exercicios")) || []
    const rotinas = JSON.parse(localStorage.getItem("rotinas")) || []
    return {exercicios, rotinas}
}

function carrega_localstorage(){
    const objetos = itens_localstorage()
    objetos.rotinas.forEach(e => {
        add_rotina_treino(e)
    })
}

function carrega_localstorage2(){
    const objetos = itens_localstorage()
    objetos.exercicios.forEach(e => {
        add_exercicio(e)
    })

    for(const child of exercicio_list.children){
        child.style.display = "none"
    }
}

function salva_rotina_localstorage(rotina){
    const objetos = itens_localstorage()
    const rotinas = objetos.rotinas
    rotinas.push(rotina)
    localStorage.setItem("rotinas", JSON.stringify(rotinas))
}

function salva_exercicio_localstorage(exercicio_obj){
    const objetos = itens_localstorage()
    const exercicios = objetos.exercicios
    exercicios.push(exercicio_obj)
    localStorage.setItem("exercicios", JSON.stringify(exercicios))
}

function delete_localstorage(value){
    const objetos = itens_localstorage()
    const rotinas = objetos.rotinas
    const rotinas_filter = rotinas.filter((item) => item != value)

    localStorage.setItem("rotinas", JSON.stringify(rotinas_filter))
}

function delete_exercicio_localstorage(value){
    const nome_classe = value.classList.item(0)
    const h2 = value.querySelector("h2").innerText
    const objetos = itens_localstorage()
    const exercicios = objetos.exercicios
    const exercicios_filter = exercicios.filter(e =>{
        return e.h2 != h2 || e.nome_classe != nome_classe
    })
    
    localStorage.setItem("exercicios", JSON.stringify(exercicios_filter))
}

function delete_todos_exer_localstorage(value){

    const objetos = itens_localstorage()
    const exercicios = objetos.exercicios
    const exercicios_filter =  exercicios.filter(item => item.nome_classe != value)
    localStorage.setItem("exercicios", JSON.stringify(exercicios_filter))
    
}

function atualiza_edit_localstorage(value_antigo, value_novo){
    const objetos = itens_localstorage()
    const rotinas = objetos.rotinas
    const new_rotinas = []

    for (let i = 0; i < rotinas.length; i++) {
        const element = rotinas[i]

        if(element === value_antigo){
            new_rotinas.push(value_novo)
        }
        else{
            new_rotinas.push(element)
        }
        
    }

    localStorage.setItem("rotinas", JSON.stringify(new_rotinas))
}

function edit_exercicio_localstorage(value_antigo,value_novo){
    const objetos = itens_localstorage()
    const exercicios = objetos.exercicios
    const antigo = value_antigo.replace(/\s+/g, '-')
    const novo = value_novo.replace(/\s+/g, '-')
    
    for (let i =0; i < exercicios.length; i++){
        if(exercicios[i].nome_classe === antigo){
            exercicios[i].nome_classe = novo
        }
    }

    localStorage.setItem("exercicios", JSON.stringify(exercicios))

}

function esconde_atividades(value){
    
    value.forEach(elemento => {
        
        elemento.style.display = 'none'
        
    })

}

function voltar(){
    const elementos_treino = document.querySelectorAll('.exercicio')

    exercicio_list.style.display = "none"
    rotina_list.style.display = ''
    header_titulo.innerHTML = antigo_titulo
    form_p.innerHTML = antigo_indexador
    rotina_input.placeholder = antigo_placeholder
    rotina_input.value = ""
    back_button.style.display = "none"

    esconde_atividades(elementos_treino)
}

function atualiza_class_name_ex(value){
    const list_exerc = document.querySelector("#exercicios-list")
    const percorre_list = list_exerc.children
    const tratamento = titulo_antigo.replace(/\s+/g, '-')
    const old_name_class = `${tratamento} exercicio`
    const new_class_name = value.replace(/\s+/g, '-')

    if(percorre_list.length > 1){
        Array.from(percorre_list).forEach(e => {
            
            if(e.classList.toString() === old_name_class){
                e.classList.remove(tratamento)
                e.classList.remove("exercicio")
                e.classList.add(new_class_name)
                e.classList.add("exercicio")
                
            }

        })
    }

}

function muda_pagina(h2){
    exercicio_list.style.display = ''
    rotina_list.style.display = "none"
    header_titulo.innerHTML = h2
    form_p.innerHTML = "Adicione um exercicio"
    rotina_input.placeholder = " EXERCICIO..."
    back_button.style.display = "flex"
}

function abre_rotina(value){
    const teste = document.querySelector("#exercicios-list")
    const h2_div_selecionada = value.closest(".rotina").querySelector("h2")
    const content_h2 = h2_div_selecionada.innerText
    const nome_classe = content_h2.replace(/\s+/g, '-')
    const classe_completa = `${nome_classe} exercicio`
    
    if (teste.children.length >= 1) {
        Array.from(teste.children).forEach(e => {
                   
            if (e.classList && e.classList.toString() === classe_completa) {
                e.style.display = ''
            }
        })
    }
    
    muda_pagina(content_h2)
  
}

function verifica_h2repetido(value, h2_list) {
    for (const element of h2_list) {
        const h2Element = element.querySelector('h2')

        if (h2Element && h2Element.innerText === value) {
            return true
        }
    }

    return false
}

function atualiza(value){
    const rotinas = document.querySelectorAll(".rotina")

    rotinas.forEach(element => {
        
        let title_rotina = element.querySelector("h2")
        
        if(title_rotina.innerText === titulo_antigo){
            title_rotina.innerText = value
            atualiza_edit_localstorage(titulo_antigo,value)
            edit_exercicio_localstorage(titulo_antigo,value)
        }
    })
}

rotina_form.addEventListener("submit", (element) => {
    element.preventDefault()
    
    const input_form_value = rotina_input.value
    const h2_list = document.querySelectorAll('.rotina')
    const verifica = verifica_h2repetido(input_form_value,h2_list)
    const verifica_campo_vazio = input_form_value.trim() == ''
    const estado_usuario = (header_titulo.innerText === antigo_titulo)

    if(!estado_usuario){
        if(verifica_campo_vazio){
            alert("vazio")  
            rotina_input.value = ""
        }
        else{
            const new_ex = gera_exercicio(input_form_value)
            add_exercicio(new_ex)
            
        }
    }
    else if (verifica || verifica_campo_vazio){
        alert("Já adicionado, ou, vazio")  
        rotina_input.value = ""
    }  
    else{
        add_rotina_treino(input_form_value)
        salva_rotina_localstorage(input_form_value)
        
    }
    
} )

document.addEventListener("click", (element) => {

    const element_clicado = element.target
    const pai_elemento = element_clicado.closest("div")
    const h2_select = pai_elemento.querySelector("h2")
    const estado_usuario = header_titulo.innerText === antigo_titulo
    
    let titulo_rotina

    if(pai_elemento && pai_elemento.querySelector("h2")){
        titulo_rotina = pai_elemento.querySelector("h2").innerText
    }

    if (element_clicado.classList.contains("excluir")) {
        if (estado_usuario) {
            const content_h2 = h2_select.innerText
            const nome_classe = content_h2.replace(/\s+/g, '-')
            const classe = document.querySelectorAll(`.${nome_classe}.exercicio`)

            classe.forEach(e => {
                e.remove()
            
            })
            delete_todos_exer_localstorage(nome_classe)
        }

        pai_elemento.remove()
        delete_exercicio_localstorage(pai_elemento)
        delete_localstorage(titulo_rotina)
           
    }
    
    if(element_clicado.classList.contains("edit-rotina")){
        form_edit.style.display = 'flex'
        edit_input.value = titulo_rotina
        titulo_antigo = titulo_rotina       
    }
})

cancel_edit.addEventListener("click", (element) => {
    element.preventDefault()

    form_edit.style.display = "none"
})

form_edit.addEventListener("submit", (element) => {
    element.preventDefault()

    const titulo_selecionado = edit_input.value
    const h2_list = document.querySelectorAll('.rotina')
    const verifica_rep = verifica_h2repetido(titulo_selecionado,h2_list)

    if(verifica_rep){
        alert("Já adicionado")
    }
    
    else if(titulo_selecionado){
        atualiza(titulo_selecionado)
        atualiza_class_name_ex(titulo_selecionado)

    }
    form_edit.style.display = "none"
})

carrega_localstorage()
carrega_localstorage2()