function Eventos({number}) {
    function meuEvento() {
        console.log(`Opa foi clicado ${number}`)
    }
    return(
        <div>
            <p>Clique para disparar um evento</p>
            <button onClick={meuEvento}>Ativar!</button>
        </div>
    );
}

export default Eventos;