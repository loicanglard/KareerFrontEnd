import { supabase } from './supabase';

export const seedJobApplications = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated');
    return;
  }

  const sampleApplications = [
    {
      user_id: user.id,
      title: 'Développeur Frontend',
      company: 'Google',
      location: 'Paris, France',
      type: 'Temps plein',
      status: 'En cours d\'examen',
      applied_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Rejoignez notre équipe pour construire la prochaine génération d\'applications web...',
      requirements: JSON.stringify(['React', 'TypeScript', 'Node.js']),
      logo_url: 'https://logo.clearbit.com/google.com',
      cv_url: 'https://example.com/cv/sample-cv.pdf',
      cover_letter_url: 'https://example.com/cover-letters/sample-letter.pdf'
    },
    {
      user_id: user.id,
      title: 'Designer UX',
      company: 'Airbnb',
      location: 'À distance',
      type: 'Temps plein',
      status: 'Candidature envoyée',
      applied_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Concevez des expériences utilisateur belles et intuitives...',
      requirements: JSON.stringify(['Figma', 'Recherche utilisateur', 'Prototypage']),
      logo_url: 'https://logo.clearbit.com/airbnb.com'
    },
    {
      user_id: user.id,
      title: 'Développeur Full Stack',
      company: 'Microsoft',
      location: 'Paris, France',
      type: 'Temps plein',
      status: 'Entretien technique',
      applied_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      interview_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Créez des applications web évolutives avec des technologies modernes...',
      requirements: JSON.stringify(['React', 'C#', '.NET', 'Azure']),
      logo_url: 'https://logo.clearbit.com/microsoft.com',
      cv_url: 'https://example.com/cv/microsoft-cv.pdf'
    },
    {
      user_id: user.id,
      title: 'Ingénieur Logiciel',
      company: 'Apple',
      location: 'Londres, UK',
      type: 'Temps plein',
      status: 'Offre reçue',
      applied_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      offer_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Développez des solutions logicielles innovantes...',
      requirements: JSON.stringify(['Swift', 'iOS', 'Objective-C']),
      logo_url: 'https://logo.clearbit.com/apple.com',
      cv_url: 'https://example.com/cv/apple-cv.pdf',
      cover_letter_url: 'https://example.com/cover-letters/apple-letter.pdf'
    }
  ];

  const { data, error } = await supabase
    .from('job_applications')
    .insert(sampleApplications)
    .select();

  if (error) {
    console.error('Error seeding data:', error);
    return null;
  }

  console.log('Sample data created:', data);
  return data;
};
