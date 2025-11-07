import { supabase } from './supabase';

export interface JobApplication {
  id: string;
  user_id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: string;
  applied_date: string;
  interview_date?: string;
  offer_deadline?: string;
  rejection_reason?: string;
  description: string;
  requirements: string[];
  logo_url?: string;
  cv_url?: string;
  cover_letter_url?: string;
  created_at: string;
  updated_at: string;
}

export const uploadDocument = async (
  file: File,
  applicationId: string,
  documentType: 'cv' | 'cover_letter'
): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${applicationId}/${documentType}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('job-documents')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('job-documents')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading document:', error);
    return null;
  }
};

export const createJobApplication = async (
  applicationData: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<JobApplication | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('job_applications')
      .insert([
        {
          ...applicationData,
          user_id: user.id,
          requirements: JSON.stringify(applicationData.requirements)
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating job application:', error);
    return null;
  }
};

export const updateJobApplication = async (
  id: string,
  updates: Partial<Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<JobApplication | null> => {
  try {
    const updateData: any = { ...updates, updated_at: new Date().toISOString() };

    if (updates.requirements) {
      updateData.requirements = JSON.stringify(updates.requirements);
    }

    const { data, error } = await supabase
      .from('job_applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating job application:', error);
    return null;
  }
};

export const getJobApplications = async (): Promise<JobApplication[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(app => ({
      ...app,
      requirements: Array.isArray(app.requirements)
        ? app.requirements
        : JSON.parse(app.requirements || '[]')
    }));
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return [];
  }
};

export const deleteJobApplication = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting job application:', error);
    return false;
  }
};

export const getDocumentUrl = (applicationId: string, documentType: 'cv' | 'cover_letter'): string => {
  return `/job-tracker/document/${applicationId}/${documentType}`;
};
