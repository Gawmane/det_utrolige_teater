import style from '../../assets/Style/Footer.module.scss'
import { AiFillInstagram, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
export const Footer = () => {
    return (
        <footer>
            <article>
                <h3>Adresse</h3>
                <a>Det utrolige tearter</a>
                <a>Havnegade 901</a>
                <a>9000 Aalborg</a>
                <a>EAN 57980003279845</a>
                <a>CVR 1001 0012</a>
                <a>Find vej på kort</a>
            </article>

            <article>
                <h3>Billetservice</h3>
                <a>Se åbningstider</a>
                <a href="tel:+45 96318090">Billettelefon: +45 96 31 80 80</a>
                <a href="mailto:billet@dut.dk">billet@dut.dk</a>

                <span>
                    <h3>Administration</h3>
                    <a href="tel:+45 96318090">Telefon: +45 96 31 80 90</a>
                    <a href="mailto:adm@dut.dk">adm@dut.dk</a>

                </span>
            </article>

            <article>
                <h3>Praktisk info</h3>
                <a>Kontakt</a>
                <a>Kom trygt i teatret</a>
                <a>Presseside</a>
                <a>Skoleforestillinger</a>
                <a>Teatercaféen</a>
                <a>Handelsbetingelser</a>
            </article>
            <article>
                <AiFillFacebook />
                <AiFillInstagram />
                <AiFillLinkedin />
            </article>

        </footer>
    )
}