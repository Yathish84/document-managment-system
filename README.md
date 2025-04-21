# DocuQuery - Document Management System

A scalable, high-performance document management system with RAG Q&A capabilities, role-based access control, and comprehensive analytics.

## Features

- **Document Management**: Upload, organize, and manage documents with support for multiple file formats
- **AI-Powered Q&A**: Ask questions about your documents and get accurate answers with source references
- **Role-Based Access Control**: Customize permissions for different team members (admin, editor, viewer)
- **Ingestion Monitoring**: Track document processing in real-time with detailed status updates
- **Performance Optimized**: Achieves 90+ Google PageSpeed Insights score
- **Scalable Architecture**: Designed to handle millions of users and documents

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Authentication**: Custom auth system (can be replaced with Auth.js, Clerk, etc.)
- **Testing**: Jest, React Testing Library
- **Performance**: Web Vitals monitoring, code splitting, image optimization
- **Analytics**: Google Analytics integration with custom event tracking

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/Yathish84/document-managment-system.git
   cd docuquery
   \`\`\`

2. Install dependencies
   \`\`\`bash
   pnpm install
   \`\`\`

3. Set up environment variables
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Edit `.env.local` with your configuration

4. Run the development server
   \`\`\`bash
   pnpm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
docuquery/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Dashboard routes
│   ├── login/            # Authentication routes
│   └── ...
├── components/           # React components
│   ├── ui/               # UI components (shadcn)
│   └── ...               # Feature components
├── lib/                  # Utility functions and services
│   ├── analytics.ts      # Analytics utilities
│   ├── auth-context.tsx  # Authentication context
│   ├── performance.ts    # Performance utilities
│   ├── scalability.ts    # Scalability utilities
│   └── services/         # API services             # Utility tests
└── public/               # Static assets
\`\`\`

## Performance Optimizations

The application is optimized for high performance:

- **Code Splitting**: Components are loaded on demand
- **Image Optimization**: Images are optimized and served in modern formats
- **Font Optimization**: Fonts are preloaded and optimized
- **Caching Strategy**: Static assets are cached with appropriate headers
- **Core Web Vitals**: Monitoring and optimization for LCP, FID, and CLS

## Scalability Considerations

The system is designed to handle large-scale usage:

- **Connection Pooling**: Efficient database connection management
- **Request Batching**: Combines multiple requests to reduce API calls
- **Caching Layer**: In-memory cache for frequently accessed data
- **Optimized Queries**: Database queries are optimized for performance
- **Horizontal Scaling**: Architecture supports horizontal scaling 

## Testing

Run the test suite:

\`\`\`bash
npm test
\`\`\`

Run tests with coverage:

\`\`\`bash
npm test -- --coverage
\`\`\`

## Analytics

The application includes comprehensive analytics tracking:

- **Page Views**: Automatically tracks page views
- **User Actions**: Tracks important user interactions
- **Performance Metrics**: Monitors Core Web Vitals
- **User Properties**: Tracks user roles and preferences