export interface DonationRequest {
  amount: number;
  email?: string;
  artistName: string;
  artTitle: string;
}

export const createDonation = async (donationData: DonationRequest): Promise<{ url: string }> => {
  // Check if Supabase URL is configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Payment system is not configured. Please contact the museum directly at jaxsen@jxsen.com to make a donation.');
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/create-donation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(donationData),
    });

    if (!response.ok) {
      let errorMessage = 'Payment system is temporarily unavailable';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If response isn't JSON, provide a user-friendly message
      }
      
      // Provide more specific error messages based on status
      if (response.status === 404) {
        errorMessage = 'Payment service is not available. The Edge Functions may not be deployed yet.';
      } else if (response.status === 401) {
        errorMessage = 'Payment service authentication failed. The Stripe integration may not be properly configured.';
      } else if (response.status === 500) {
        errorMessage = 'Server error occurred. This may be due to missing Stripe configuration.';
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to payment service. Please check your internet connection or contact the museum directly.');
    }
    throw error;
  }
};