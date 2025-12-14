Fonctions principales (main.py)
===============================

Ce module définit les routes principales de l'API FastAPI ainsi que
la gestion du cycle de vie de l'application et l'accès aux données.

------------------------------------------------------------

Gestion du cycle de vie de l'application FastAPI
------------------------------------------------

Pour gérer le cycle de vie de l'application (démarrage et arrêt du serveur),
on utilise la fonction ``lifespan`` :

.. autofunction:: main.lifespan

------------------------------------------------------------

Initialisation de la base de données
------------------------------------

Pour exécuter l'initialisation de la base de données au lancement du serveur,
on utilise la fonction ``on_startup`` :

.. autofunction:: main.on_startup

------------------------------------------------------------

Gestion des utilisateurs
------------------------

Récupérer tous les utilisateurs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour récupérer tous les utilisateurs présents dans la base de données,
on utilise la fonction ``getUsers`` :

.. autofunction:: main.getUsers

------------------------------------------------------------

Authentification
----------------

Connexion d'un utilisateur
~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour authentifier un utilisateur à partir de son nom et mot de passe,
on utilise la fonction ``connexion`` :

.. autofunction:: main.connexion

Inscription d'un utilisateur
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour inscrire un nouvel utilisateur dans la base de données,
on utilise la fonction ``inscription`` :

.. autofunction:: main.inscription

------------------------------------------------------------

Gestion des tâches
------------------

Récupérer toutes les tâches
~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour récupérer l'ensemble des tâches enregistrées dans la base de données,
on utilise la fonction ``getTaches`` :

.. autofunction:: main.getTaches

Récupérer les tâches d'un utilisateur
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour récupérer toutes les tâches créées par un utilisateur donné,
on utilise la fonction ``getUserTaches`` :

.. autofunction:: main.getUserTaches

Créer une tâche
~~~~~~~~~~~~~~~

Pour créer une nouvelle tâche à partir des informations fournies par l'utilisateur,
on utilise la fonction ``creerTache`` :

.. autofunction:: main.creerTache

Récupérer le créateur d'une tâche
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour obtenir l'utilisateur ayant créé une tâche donnée,
on utilise la fonction ``getCreateurTache`` :

.. autofunction:: main.getCreateurTache

------------------------------------------------------------

Gestion des demandes d'accès aux tâches
---------------------------------------

Créer une demande d'accès
~~~~~~~~~~~~~~~~~~~~~~~~~

Pour permettre à un utilisateur de demander l'accès à une tâche,
on utilise la fonction ``DemanderAcces`` :

.. autofunction:: main.DemanderAcces

Récupérer les demandes par tâche
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour récupérer toutes les demandes d'accès associées à une tâche,
on utilise la fonction ``getDemandeParTache`` :

.. autofunction:: main.getDemandeParTache

Récupérer les demandes par utilisateur
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour récupérer toutes les demandes d'accès effectuées par un utilisateur,
on utilise la fonction ``getDemandeParUtilisateur`` :

.. autofunction:: main.getDemandeParUtilisateur

Récupérer les demandes liées aux tâches d'un créateur
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour récupérer toutes les demandes d'accès concernant les tâches créées par un utilisateur,
on utilise la fonction ``demandesCreateur`` :

.. autofunction:: main.demandesCreateur

Accepter une demande d'accès
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour accepter une demande d'accès à une tâche,
on utilise la fonction ``accepterDemande`` :

.. autofunction:: main.accepterDemande

Refuser une demande d'accès
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour refuser une demande d'accès à une tâche,
on utilise la fonction ``refuserDemande`` :

.. autofunction:: main.refuserDemande

Récupérer les demandes acceptées pour une tâche
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour récupérer uniquement les demandes acceptées pour une tâche donnée,
on utilise la fonction ``demandesAcceptees`` :

.. autofunction:: main.demandesAcceptees

------------------------------------------------------------

Gestion des évaluations
----------------------

Créer ou mettre à jour une évaluation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pour créer ou mettre à jour une évaluation (vote) associée à une tâche,
on utilise la fonction ``creerEvaluation`` :

.. autofunction:: main.creerEvaluation