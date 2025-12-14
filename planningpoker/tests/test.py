from planningpoker.back.crud import hashMDP, verifierMDPEnClair

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