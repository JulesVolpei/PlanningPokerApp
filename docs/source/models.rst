Modèles de données (models.py)
==============================

Ce module définit les modèles SQLAlchemy utilisés par l'application.
Chaque modèle correspond à une table de la base de données et décrit
les relations entre les entités (utilisateurs, tâches, demandes d'accès
et évaluations).

------------------------------------------------------------

Utilisateur
-----------

Le modèle ``Utilisateur`` représente un utilisateur de l'application.
Il stocke les informations d'identification et définit les relations
avec les tâches créées, les demandes d'accès et les évaluations.

.. autoclass:: models.Utilisateur
   :members:
   :undoc-members:
   :show-inheritance:

------------------------------------------------------------

Tâche
-----

Le modèle ``Tache`` représente une tâche créée par un utilisateur.
Il contient les informations descriptives de la tâche et définit
les relations avec les utilisateurs participants et les évaluations.

.. autoclass:: models.Tache
   :members:
   :undoc-members:
   :show-inheritance:

------------------------------------------------------------

Évaluation de tâche
-------------------

Le modèle ``EvaluationTache`` représente une évaluation (vote)
laissée par un utilisateur sur une tâche.

.. autoclass:: models.EvaluationTache
   :members:
   :undoc-members:
   :show-inheritance:

------------------------------------------------------------

Demande d'accès à une tâche
---------------------------

Le modèle ``DemandeAccessTache`` représente une demande d'accès
formulée par un utilisateur pour participer à une tâche.

.. autoclass:: models.DemandeAccessTache
   :members:
   :undoc-members:
   :show-inheritance: