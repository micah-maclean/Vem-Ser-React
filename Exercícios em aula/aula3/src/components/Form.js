function Form({name, setName}) {
    function cadastraUsuario(e) {
        e.preventDefault();
        console.log('Usuario cadastrado')
    }
    return(
        <div>
            <h1>Meu cadastro</h1>
            <form onSubmit={cadastraUsuario}>
                <div>
                    <input type="text" placeholder="Digite sei nome" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="cadastra"/>
                </div>
            </form>
        </div>
    )
}

export default Form;