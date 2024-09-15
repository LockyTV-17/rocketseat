const { select,input, checkbox }= require ('@inquirer/prompts')

let meta = {
    //value:' tomar 3L de agua por dia',
    //checked: true
};

let metas = [meta];

const castrarmeta= async () => {
    const meta = await input ({message: "Digite a meta"})
    
    if (meta.length == 0) {
        console.log ('A Meta não pode ser vazia.')
        return    
    }
    metas.push(
        { value:meta, checked:false}

    )
}

const listarMetas = async () => {
   if (metas.length == 0) {
    mensagem ="não existe metas"
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
    
    if (metas.length == 0 ) {
        mensagem = "Não Existe Metas realizadas"
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
            console>log ("Não Existem metas abertas")
            return            
        }
        await select ({
            message: "Metas Abertas: " + Abertas.length,
            choices: [...Abertas]

        })
}

const deletarMetas = async () =>{
    const MetasDesmarcadas = metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })
    const itemsAdeletar = await checkbox({
        message: 'Escolha Um item Para Deletar: ',
        choices: [...metas],
        instructions: false,
    } )
    if (itemsAdeletar.length == 0) {
        console.log("Nenhum Item Para deletar")
        
    }
    itemsAdeletar.forEach((item) =>{
       metas=metas.filter((meta)=> {
            return meta.value !=item

       })
    })
    console.log ("Meta(s) Deleta(s) Com Sucesso! ")
}

const start = async () => {
    
    while (true) {
        
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
                console.log(metas)
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
start()