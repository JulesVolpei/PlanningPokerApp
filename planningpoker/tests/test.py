from passlib.context import CryptContext

mdpContext = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
def verifierMDPEnClair(mdp, mdpHashe):
    """
    Vérifie si un mot de passe en clair correspond au hash en BD.

    :return: Un booléen permettant de savoir si les deux mots de passe sont similaires.
    :rtype: bool
    """
    return mdpContext.verify(mdp, mdpHashe)

def hashMDP(mdp):
    """
    Génère un hash sécurisé à partir d'un mot de passe en clair.

    :return: Une chaine de caractères correspondant au mot de passe hashé.
    :rtype: str
    """
    return mdpContext.hash(mdp)
def testHashageMDP():
    mdp = "motDePasseHyperSecuriseEtImparableIlFaudraitUneEterniteVraimenTr3sL0gt3mp4"
    hashed = hashMDP(mdp)
    assert hashed != mdp
    assert hashed.startswith("$")

def testVerificationMDPHashe():
    mdp = "secret"
    hashed = hashMDP(mdp)
    assert verifierMDPEnClair("secret", hashed) is True
    assert verifierMDPEnClair("mauvais", hashed) is False