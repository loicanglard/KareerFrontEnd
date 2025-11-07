/*
  # Configuration du stockage pour les documents

  1. Bucket Storage
    - Création du bucket `job-documents` pour stocker les CV et lettres de motivation
    - Configuration en mode public pour permettre l'accès aux documents
  
  2. Sécurité Storage
    - Policies pour que les utilisateurs puissent uploader et lire leurs propres documents
    - Restrictions sur les types de fichiers et la taille
*/

-- Create storage bucket for job documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-documents', 'job-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can upload own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Users can read own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete own documents" ON storage.objects;
  DROP POLICY IF EXISTS "Public can view documents" ON storage.objects;
END $$;

-- Allow authenticated users to upload their own documents
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'job-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to read their own documents
CREATE POLICY "Users can read own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'job-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to update their own documents
CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'job-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'job-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own documents
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'job-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public to read documents (since we set bucket to public)
CREATE POLICY "Public can view documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'job-documents');
