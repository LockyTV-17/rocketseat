const { select,input, checkbox }= require ('@inquirer/prompts')

let mensagem = "Faça Suas Metas Aqui";
let metas = []

const castrarmeta= async () => {
    const meta = await input ({message: "Digite a meta"})
    
    if (meta.length == 0) {
        mensagem ='A Meta não pode ser vazia.'
        return    
    }
    metas.push(
        { value:meta, checked:false}

    )

    mensagem = "Meta Cadastrada!"
}

const listarMetas = async () => {
   if (metas.length == 0) {
    mensagem = "não existe metas"
    return
    
   }
   
    const respostas = await checkbox({
        message: 'Use as Setas Para Mudar de meta, Espaço Para marca ou desmarca e enter para selecionar',
        choices: [...metas],
        instructions: false,
    } )

    metas.forEach ((m) => {
        m.checked = false

    })

    if (respostas.length == 0) {
        mensagem = "nenhuma meta selecionada"
        return      
    }
    
    respostas.forEach((respostas)=> {
        const meta = metas.find((m)=> {
            return  m.value == respostas
        })
        meta.checked = true
    }) 
    mensagem = "Meta(s) Marcadas como concluidas"   
}

const MetasRealizadas = async () => {
    
    if (metas.length == 0 ) {
        mensagem = "Não Existe Metas"
        return
        
    }
    const Realizadas = metas.filter((meta)=>{
        return meta.checked
    })
    if (Realizadas.length == 0 ) {
        mensagem = "Não Existe Metas realizadas"
        return
    }
    await select({
        message: "Metas Realizadas: " + Realizadas.length,
        choices: [...Realizadas]
    })
}

const MetasAbertar = async () => {
    const Abertas = metas.filter ((meta)=>{
        return meta.checked != true
        
        })
        if (Abertas.length == 0) {
            mensagem ="Não Existem metas abertas"
            return            
        }
        await select ({
            message: "Metas Abertas: " + Abertas.length,
            choices: [...Abertas]

        })
}

const deletarMetas = async () =>{
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
            return
    }
    const MetasDesmarcadas = metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })
    const itemsAdeletar = await checkbox({
        message: 'Escolha Um item Para Deletar: ',
        choices: [...MetasDesmarcadas],
        instructions: false,
    } )
    if (itemsAdeletar.length == 0) {
        mensagem = "Nenhum Item Para deletar"
        return
    }
    itemsAdeletar.forEach((item) =>{
       metas=metas.filter((meta)=> {
            return meta.value !=item

       })
    })
    mensagem = "Meta(s) Deleta(s) Com Sucesso! "
}

const mostrarMensagem = () => {
    console.clear();
   
    if (mensagem != "") {
        console.log(mensagem)
        console.log ("")
        mensagem = ""       
    }
}

const start = async () => {
    
    while (true) {
        mostrarMensagem()

        const opcao = await select ({
            message: "Menu >",
             choices:[
                {
                    name: "cadastra meta",
                    value: "cadastrar"
                },
                {
                    name: "listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "Realizadas"
                },
                
                {
                    name: "Metas abertar",
                    value: "Abertas"
                },
                {
                    name: "deletar metas",
                    value: "deletar"
                },
                {
                    name: "sair",
                    value: "sair"
                }

             ]
        })

        switch (opcao) {
            case "cadastrar":
                await castrarmeta()                           
                break    
            case "listar":
                await listarMetas()
                break
            case "Realizadas":
                await MetasRealizadas()
                break
            case "Abertas":
                await MetasAbertar()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair": 
            console.log("ate a proxima")
                return
        }
    }
}
start();