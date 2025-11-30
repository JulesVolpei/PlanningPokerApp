import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/api.ts";

interface User {
    id: number;
    nom: string;
}

const TestAffichageUtilisateurs = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchAllUser();
                setUsers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Liste des utilisateurs</h1>
            {users.length === 0 ? (
                <p>Aucun utilisateur trouvé.</p>
            ) : (
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="border p-2 rounded bg-gray-50 hover:bg-gray-100"
                        >
                            <p>
                                <strong>{user.nom}</strong>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TestAffichageUtilisateurs;
