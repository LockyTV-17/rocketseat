const { select,input, checkbox }= require ('@inquirer/prompts')

let meta = {
    //value:' tomar 3L de agua por dia',
    //checked: true,
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

    metas.forEach ((m) => {
        m.checked = false

    })

    if (respostas.length == 0) {
        console.log("nenhuma meta selecionada")
        return      
    }
    
    respostas.forEach((respostas)=> {
        const meta = metas.find((m)=> {
            return  m.value == respostas
        })
        meta.checked = true
    }) 
    console.log ("Meta(s) Marcadas como concluidas")   
}

const MetasRealizadas = async () => {
    const Realizadas = metas.filter((meta)=>{
        return meta.checked
    })
    if (Realizadas.length==0) {
        console.log ("Não Existe Metas realizadas")
        return
        
    }
    
    await select({
        message: "Metas Realizadas",
        choices: [...Realizadas]
    })

    console.log(Realizadas)
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
                    name: "Metas Realizadas",
                    value: "Realizadas"
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
                break
            case "Realizadas":
                await MetasRealizadas()
                break
            case "sair": 
            console.log("ate a proxima")
                return
        }
    }
}
start()