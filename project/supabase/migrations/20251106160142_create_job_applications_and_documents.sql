/*
  # Création du système de gestion des candidatures et documents

  1. Nouvelles Tables
    - `job_applications` : Candidatures aux offres d'emploi
      - `id` (uuid, primary key)
      - `user_id` (uuid, référence auth.users)
      - `title` (text) : Titre du poste
      - `company` (text) : Nom de l'entreprise
      - `location` (text) : Localisation
      - `type` (text) : Type de contrat
      - `status` (text) : Statut de la candidature
      - `applied_date` (timestamptz) : Date de candidature
      - `interview_date` (timestamptz, nullable) : Date d'entretien
      - `offer_deadline` (timestamptz, nullable) : Date limite de réponse à l'offre
      - `rejection_reason` (text, nullable) : Raison du rejet
      - `description` (text) : Description du poste
      - `requirements` (jsonb) : Compétences requises
      - `logo_url` (text) : URL du logo de l'entreprise
      - `cv_url` (text, nullable) : URL du CV envoyé
      - `cover_letter_url` (text, nullable) : URL de la lettre de motivation
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Policies pour que les utilisateurs puissent gérer leurs propres candidatures
*/

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Temps plein',
  status text NOT NULL DEFAULT 'Candidaté',
  applied_date timestamptz DEFAULT now(),
  interview_date timestamptz,
  offer_deadline timestamptz,
  rejection_reason text,
  description text DEFAULT '',
  requirements jsonb DEFAULT '[]'::jsonb,
  logo_url text,
  cv_url text,
  cover_letter_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policies for job_applications
CREATE POLICY "Users can view own applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications"
  ON job_applications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
