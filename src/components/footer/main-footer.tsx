

export default function mainFooter() {
    return (
        <>
            <footer>
                <div>
                    {/*social media section */}
                    <div>
                        <h3>Nos Réseaux :</h3>
                        <a href="">facebook</a>
                        <a href="">Instagram</a>
                        <a href="">Snapchat</a>
                    </div>
                    {/*detail session */}
                    <div>
                        <h3>Détail session:</h3>
                        <a href="">accéder au detail</a>
                    </div>
                    {/*Contact form */}
                    <div>
                        <h3>Nous contacter</h3>
                        <form action="">
                            <input type="text" name="" id="" placeholder="Entrer votre Nom"/>
                            <input type="text" name="" id="" placeholder="Entrer votre Email" />
                            <input type="text" name="" id="" placeholder="Sujet"/>

                            <textarea name="" id="" placeholder="Votre message">

                            </textarea>
                        </form>
                    </div>
                    {/*Copyright*/}
                    <div>
                        <p>&copy; 2025 Tous droit réservés à la maison H mon pote </p>
                    </div>
                </div>
            </footer>
        </>
    )
}