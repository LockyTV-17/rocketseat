const { select,input, checkbox }= require ('@inquirer/prompts')

let meta = {
    value:' tomar 3L de agua por dia',
    checked: true,
}

let metas = [meta]

const castrarmeta= async () => {
    const meta = await input ({message: "Digite a meta"})
    
    if (meta.length == 0) {
        console.log ('A Meta não pode ser vazia.')
        return    
    }
    metas.push(
        { value:meta, checked: false}

    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: 'Use as Setas Para Mudar de meta, Espaço Para marca ou desmarca e enter para selecionar',
        choices: [...metas],
        instructions:false
    } )

    if (respostas.length == 0) {
        console.log("nenhuma meta selecionada")
        return      
    }
    
    metas.forEach ((m) => {
        m.checked = false

    })

    respostas.forEach((respostas)=> {
        const meta = metas.find((m)=> {
            return  m.value == respostas
        })
        meta.checked = true
    })    
}

const start = async () => {
    
    while (true) {
        
        const opcao = await select ({
            message: "menu >",
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
                    name: "sair",
                    value: "sair"
                }

             ]
        })

        switch (opcao) {
            case "cadastrar":
                await castrarmeta()                           
                console.log(metas)
                break    
            case "listar":
                await listarMetas(metas)
                break;
            case "sair": 
            console.log("ate a proxima")
                return
        }
    }
}
start()