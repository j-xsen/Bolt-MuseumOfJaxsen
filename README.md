# Museum of Jaxsen

A modern museum website built with React, TypeScript, and Tailwind CSS, featuring dynamic content management through Contentful and secure donation processing via Stripe.

## Features

- **Dynamic Content**: Art pieces are fetched from Contentful CMS
- **Responsive Design**: Optimized for all device sizes with proper aspect ratios
- **Search & Filter**: Find artworks by title, artist, or category
- **High Resolution Images**: Toggle between standard and high-resolution artwork views
- **Secure Donations**: Stripe-powered donation system supporting artists and the museum
- **Email Receipts**: Optional email receipts for donations
- **Modern UI**: Clean, professional design with smooth animations

## Setup

### Prerequisites

- Node.js 18+ 
- A Contentful account and space
- A Supabase project (for serverless functions)
- A Stripe account (for payment processing)

### Contentful Setup

Your Contentful space should have a content type called `art` with the following fields:

- `title` (Symbol) - The artwork title
- `date` (Date) - Creation date of the artwork
- `media` (Symbol, optional) - Medium/category of the artwork
- `lowRez` (Asset Link) - Standard resolution image
- `hiRez` (Asset Link) - High resolution image
- `ratio` (Number) - Aspect ratio of the artwork (width/height)

### Supabase Setup

1. Create a new Supabase project
2. The Edge Functions for Stripe payment processing are included in this repository
3. Deploy the functions using the Supabase CLI or through the dashboard

### Stripe Setup

1. Create a Stripe account
2. Get your publishable and secret keys from the Stripe dashboard
3. For production, use live keys; for development, use test keys

### Environment Variables

Create a `.env` file in the root directory:

```env
# Contentful Configuration
VITE_CONTENTFUL_SPACE_ID=your_contentful_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token

# Supabase Configuration (for Stripe Edge Functions)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

### Installation

```bash
npm install
npm run dev
```

## Donation System

The donation system is powered by Stripe and includes:

- **Secure Processing**: All payments are processed securely through Stripe
- **Flexible Amounts**: Preset amounts ($5, $10, $25, $50, $100) or custom amounts
- **Email Receipts**: Optional email receipts sent automatically
- **Real-time Processing**: Immediate payment confirmation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Metadata Tracking**: Donations include artwork and artist information

### Testing Donations

Use Stripe's test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any 3-digit CVC

## Content Management

All art pieces are managed through Contentful. To add new artworks:

1. Log into your Contentful dashboard
2. Create a new entry using the `art` content type
3. Fill in all required fields:
   - Upload both low and high resolution images
   - Calculate and enter the aspect ratio (width ÷ height)
   - Set the creation date
   - Specify the medium if desired
4. Publish the entry
5. The website will automatically fetch and display the new artwork

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Architecture

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Contentful
- **Payment Processing**: Stripe
- **Serverless Functions**: Supabase Edge Functions
- **Icons**: Lucide React
- **Build Tool**: Vite

## Security

- All payment processing is handled securely by Stripe
- No sensitive payment information is stored locally
- Environment variables protect API keys
- CORS headers properly configured for Edge Functions

## Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Deploy Supabase Edge Functions for payment processing
4. Ensure all environment variables are set in production

The application uses a custom hook (`useArtPieces`) to manage Contentful data fetching with loading states and error handling. All artworks are attributed to Jaxsen, the founder of Jaxsenville, with generated descriptions that reflect the museum's opening exhibition narrative.

## Features

### Dynamic Image Handling
- Automatically uses proper aspect ratios from Contentful
- Toggle between standard and high-resolution images
- Responsive image display across all devices

### Content Generation
- Automatic artwork descriptions that fit the museum narrative
- Dimension calculations based on aspect ratios
- Category mapping from media field

### Donation System
- Support for both preset and custom donation amounts
- Secure payment processing with Stripe
- Optional email receipts
- Real-time payment status updates
- Comprehensive error handling