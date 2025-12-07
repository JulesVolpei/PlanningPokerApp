import DashboardTaches from "@/components/Index/DashboardTaches.tsx";

/**
 * Composant à la racine de l'affichage des composants du menu principal.
 *
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