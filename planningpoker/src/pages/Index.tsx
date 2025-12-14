import DashboardTaches from "@/components/Index/DashboardTaches.tsx";

/**
 * Page d'accueil de l'application.
 * Ce composant est la route par défaut (`/`). Il est responsable de l'affichage du tableau de bord principal
 * permettant aux utilisateurs de visualiser et d'interagir avec les sessions de Planning Poker.
 *
 * @remarks
 * Il agit comme un conteneur de mise en page pour le composant {@link DashboardTaches}.
 *
 * @category Pages
 * @returns {JSX.Element} La vue principale de l'application.
 */
const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="m1-16 flex items-center justify-center pt-12">
                <DashboardTaches titre={"Planning Poker"}/>
            </div>
        </div>
    )
}

export default Index;