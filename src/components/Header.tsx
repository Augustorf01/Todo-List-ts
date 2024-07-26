// import logo from '../assets/logo.svg'
import styles from '../layouts/Header.module.css'
import logo from '../assets/logo.svg'

export function Header() {
    return (
        <header className={styles.container}>
            <img src={logo} title='Logo' />
        </header>
    )
}