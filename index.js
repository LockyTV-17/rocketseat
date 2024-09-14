const { select,input }= require ('@inquirer/prompts')

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
                break              
                case "listar":
                    console.log("vamos listar")
                break;
            case "sair": 
            console.log("ate a proxima")
                return
        }
    }
}
start()