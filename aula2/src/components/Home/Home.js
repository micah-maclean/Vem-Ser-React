import Card from "../Card/Card";
import Section from "../Section/Section";
import styles from "./Home.module.css"
import Mushroom from "../images/mushroom.png"

const Home = () => {
    return(
        <main>
            <Section title='Estamos aprendendo HTML e CSS com o melhor professor de todos'>
                <ul className={styles.gridRow}>
                    <Card img={Mushroom} subtitle='Cogumelo 1'/>
                    <Card img={Mushroom} subtitle='Cogumelo 2'/>
                    <Card img={Mushroom} subtitle='Cogumelo 3'/>
                </ul>
            </Section>
            <Section backgroundColor="#444" color="white">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo debitis libero ex facere blanditiis, quaerat, quo dolorum vitae assumenda voluptatum voluptates a maxime nisi adipisci? Animi, consequatur repudiandae minus eligendi ratione, tenetur voluptatem expedita distinctio quaerat placeat, nisi vel fugiat obcaecati doloremque consequuntur! Placeat nihil repellendus rerum eum sint illum doloremque tempore mollitia blanditiis, vitae exercitationem eveniet dignissimos eos obcaecati dolores delectus provident amet facilis quaerat animi fuga. Officia dolorum eos ab velit rerum quasi nostrum explicabo cumque voluptates quaerat, atque accusantium distinctio aperiam nesciunt expedita? In reprehenderit maiores quaerat cum magnam illo, illum porro nihil error, repudiandae, architecto vel.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet quaerat numquam dolores facilis asperiores dolor, unde eos voluptate aut, provident, harum repudiandae! Laborum tempora voluptatem alias possimus perspiciatis autem exercitationem reiciendis provident dignissimos! Error eligendi labore sunt. Sit ad illo beatae iste delectus in aut dicta, deleniti doloribus ipsam perferendis.</p>
            </Section>
            <Section title='Endereço da DBC'>
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.4089120483973!2d-51.20348518488026!3d-29.99641283600465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951977775fc4c071%3A0x6de693cbd6b0b5e5!2sDBC%20Company!5e0!3m2!1spt-BR!2sbr!4v1658318726458!5m2!1spt-BR!2sbr" 
                width="600" 
                height="450"
                style={{ border:0 }}
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"/>
            </Section>
        </main>
    )
}

export default Home;