const { select,input, checkbox }= require ('@inquirer/prompts');
const { isUtf8 } = require('buffer');
const fs = require ("fs").promises;

let mensagem = "Faça Suas Metas Aqui";

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(error) {
        metas = []
    }   
}

const salvarMetas = async () => {
    try {
        await fs.writeFile('metas.json', JSON.stringify(metas, null, 2));
    } catch (err) {
        console.error('Erro ao salvar metas:', err);
    }
};

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
    mensagem = "Não existe metas"
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
        mensagem = "Nenhuma meta selecionada"
        return      
    }
    
    respostas.forEach((respostas)=> {
        const meta = metas.find((m)=> {
            return  m.value == respostas
        })
        meta.checked = true
    }) 
    mensagem = "Meta(s) Marcadas como concluida(a):"   
}

const MetasRealizadas = async () => {
    
    if (metas.length == 0 ) {
        mensagem = "Não Existe Metas realaizadas"
        return
        
    }
    const Realizadas = metas.filter((meta)=>{
        return meta.checked
    })
    if (Realizadas.length == 0 ) {
        mensagem = "Não Existe Metas Realizadas"
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
            mensagem ="Não Existem Metas abertas"
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
        mensagem = "Nenhum Item Para Deletar"
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
    await carregarMetas()    
    
    while (true) {
        mostrarMensagem()
        await salvarMetas()

        const opcao = await select ({
            message: "Menu >",
             choices:[
                {
                    name: "Cadastra Meta:",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas:",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas:",
                    value: "Realizadas"
                },
                
                {
                    name: "Metas em Abertar:",
                    value: "Abertas"
                },
                {
                    name: "Deletar Metas:",
                    value: "deletar"
                },
                {
                    name: "Sair",
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