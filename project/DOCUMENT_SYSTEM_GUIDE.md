# Guide du Système de Gestion des Documents

## Vue d'ensemble

Le système de gestion des documents permet aux utilisateurs de télécharger, stocker et gérer leurs CV et lettres de motivation pour chaque candidature via Supabase Storage.

## Fonctionnalités

### 1. Boutons CV et Lettre dans les cartes
- **Bouton actif** : Si un document a été uploadé, le bouton est cliquable et ouvre le document dans un nouvel onglet
- **Bouton désactivé** : Si aucun document n'a été uploadé, le bouton est grisé avec le texte "CV non ajouté" ou "Lettre non ajoutée"

### 2. Upload de documents via la modale
- Cliquez sur une candidature pour ouvrir la modale de détails
- Dans la section "Documents" sur la droite, utilisez les uploaders pour ajouter vos fichiers
- **Formats acceptés** : PDF uniquement
- **Taille maximale** : 5 MB par fichier
- Une fois uploadé, le document est automatiquement disponible via les boutons des cartes

### 3. Stockage sécurisé
- Les documents sont stockés dans Supabase Storage
- Chaque utilisateur ne peut accéder qu'à ses propres documents
- Les URLs sont publiques mais les fichiers sont organisés par utilisateur
- Les documents sont automatiquement versionnés (upsert)

## Structure de la base de données

### Table `job_applications`
```sql
- id (uuid) : Identifiant unique
- user_id (uuid) : Référence à l'utilisateur
- title, company, location : Informations du poste
- status : Statut de la candidature
- cv_url : URL du CV uploadé
- cover_letter_url : URL de la lettre de motivation
- ... autres champs
```

### Bucket Storage `job-documents`
- Organisation : `documents/{user_id}/{application_id}/{document_type}.pdf`
- Exemple : `documents/abc123/def456/cv.pdf`

## Utilisation

### Initialiser des données de test
1. Allez sur la page Job Tracker
2. Si aucune candidature n'existe, un bouton "Charger des exemples" apparaît
3. Cliquez dessus pour créer 4 candidatures d'exemple avec quelques documents

### Uploader un document
1. Ouvrez une candidature en cliquant dessus
2. Faites défiler jusqu'à la section "Documents" dans la colonne de droite
3. Cliquez sur "Choisir un fichier" pour le CV ou la lettre
4. Sélectionnez un fichier PDF
5. Le document est automatiquement uploadé et sauvegardé

### Accéder à un document
1. Dans la vue Kanban, cliquez sur le bouton "CV" ou "Lettre" d'une carte
2. Le document s'ouvre dans un nouvel onglet

## Architecture technique

### Services
- `documentService.ts` : Gestion des candidatures et upload de documents
- `seedData.ts` : Création de données de test

### Composants
- `DocumentUploader.tsx` : Composant d'upload réutilisable
- `JobTracker.tsx` : Page principale intégrant tous les éléments

### Sécurité (RLS)
- Les utilisateurs ne peuvent créer/modifier que leurs propres candidatures
- Les utilisateurs ne peuvent uploader que dans leur propre dossier
- Tous les documents sont accessibles publiquement via URL (à modifier selon besoin)

## Notes importantes

1. **Authentification requise** : L'utilisateur doit être connecté pour utiliser le système
2. **Formats supportés** : Uniquement PDF pour garantir la compatibilité
3. **Gestion des erreurs** : Des messages d'alerte informent l'utilisateur en cas de problème
4. **Performance** : Les fichiers sont uploadés avec upsert pour éviter les doublons

## Améliorations futures possibles

- Support d'autres formats (DOCX, etc.)
- Prévisualisation des documents dans la modale
- Historique des versions des documents
- Compression automatique des fichiers
- Génération de CV/lettres via IA
- Partage sécurisé avec les recruteurs
