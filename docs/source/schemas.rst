Schémas de données (schemas.py)
===============================

Ce module définit les schémas Pydantic utilisés par l'API FastAPI.
Les schémas permettent de :
:raw-html:`<br />` - valider les données entrantes
:raw-html:`<br />` - structurer les réponses de l'API
:raw-html:`<br />` - faire la correspondance entre les modèles de base de données et les données exposées via l'API.

------------------------------------------------------------

Schémas liés aux utilisateurs
-----------------------------

Utilisateur
~~~~~~~~~~~

Le schéma ``Utilisateur`` représente un utilisateur de l'application
tel qu'il est échangé via l'API.

.. autoclass:: schemas.Utilisateur
   :members:
   :undoc-members:
   :show-inheritance:

Connexion et inscription
~~~~~~~~~~~~~~~~~~~~~~~~

Le schéma ``ConnexionInscription`` est utilisé pour l'authentification
et l'inscription des utilisateurs.

.. autoclass:: schemas.ConnexionInscription
   :members:
   :undoc-members:
   :show-inheritance:

------------------------------------------------------------

Schémas liés aux tâches
----------------------

Tâche (lecture enrichie)
~~~~~~~~~~~~~~~~~~~~~~~~

Le schéma ``Taches`` représente une tâche telle qu'elle est retournée
par l'API, incluant des informations calculées dynamiquement.

.. autoclass:: schemas.Taches
   :members:
   :undoc-members:
   :show-inheritance:

Création d'une tâche
~~~~~~~~~~~~~~~~~~~~

Le schéma ``TacheCreate`` est utilisé lors de la création
d'une nouvelle tâche.

.. autoclass:: schemas.TacheCreate
   :members:
   :undoc-members:
   :show-inheritance:

Mise à jour d'une tâche
~~~~~~~~~~~~~~~~~~~~~~~

Le schéma ``TacheUpdate`` permet la mise à jour partielle
des informations d'une tâche existante.

.. autoclass:: schemas.TacheUpdate
   :members:
   :undoc-members:
   :show-inheritance:

------------------------------------------------------------

Schémas liés aux demandes d'accès
--------------------------------

Demande d'accès (base)
~~~~~~~~~~~~~~~~~~~~~~

Le schéma ``DemandeAccessTache`` représente une demande d'accès
à une tâche.

.. autoclass:: schemas.DemandeAccessTache
   :members:
   :undoc-members:
   :show-inheritance:

Création d'une demande d'accès
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Le schéma ``DemandeAccessTacheCreate`` est utilisé pour créer
une nouvelle demande d'accès à une tâche
