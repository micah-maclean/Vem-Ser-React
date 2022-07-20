import Section from "../Section/Section";
import styles from "./Contato.module.css";
const Contato = () => {
    return(
        <Section title="Contato" className={styles.contato}>
            <form className={styles.form}>
                <label htmlFor="nome">Digite seu nome completo:</label>
                <input type="text" id="nome" placeholder="Nome Completo" name="nome"/>

                <label htmlFor="email">Digite seu email</label>
                <input type="email" id="email" placeholder="Email" name="email"/>

                <label htmlFor="motivo">Qual o motivo de contato:</label>
                    <select name="motivo" id="motivo">
                        <option>Elogios</option>
                        <option>Dúvidas</option>
                        <option>Problemas no site</option>
                        <option>Outro</option>
                    </select>

                <label htmlFor="mensagem">Sua mensagem:</label>
                <textarea cols="30" rows="10" id="mensagem" placeholder="Mensagem" name="mensagem"></textarea>
                
                <button>Salvar</button>
            </form>
        </Section>
    )
}

export default Contato;