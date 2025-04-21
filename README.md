# DocuQuery - Document Management & Q&A System

DocuQuery is a comprehensive document management system with AI-powered Q&A capabilities. It allows organizations to upload, manage, and query documents with role-based access control.

## Features

- **Document Management**: Upload, organize, and manage documents
- **AI-Powered Q&A**: Ask questions about your documents and get accurate answers
- **Role-Based Access Control**: Admin, Editor, and Viewer roles with appropriate permissions
- **Document Processing**: Monitor document ingestion and processing status
- **User Management**: Manage users and their access levels

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Custom JWT-based authentication
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/docuquery.git
cd docuquery
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
docuquery/
├── app/                  # Next.js app directory
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Authentication pages
│   └── ...
├── components/           # React components
│   ├── ui/               # UI components (shadcn)
│   └── ...
├── lib/                  # Utility functions and services
│   ├── auth-context.tsx  # Authentication context
│   ├── services/         # Service layer
│   └── ...
├── __tests__/            # Test files
├── docs/                 # Documentation
└── ...
\`\`\`

## Authentication

The application uses a custom authentication system with role-based access control:

- **Admin**: Full access to all features
- **Editor**: Can upload and manage documents, but cannot manage users
- **Viewer**: Read-only access to documents and Q&A features

Demo accounts:
- Admin: admin@example.com
- Editor: editor@example.com
- Viewer: viewer@example.com
- Password: any password will work in demo mode

## Document Processing

Documents go through a processing pipeline:
1. Document Upload
2. Text Extraction
3. Chunking
4. Embedding Generation
5. Vector Storage

## Q&A System

The Q&A system uses RAG (Retrieval-Augmented Generation) to answer questions about documents:
1. Question is converted to vector embedding
2. Relevant document chunks are retrieved
3. AI generates answer based on retrieved context
4. Answer is returned with source references

## Testing

Run tests with:

\`\`\`bash
npm test
\`\`\`

For more details, see the [Testing Documentation](docs/testing.md).

## Architecture

For detailed architecture information, see the [Architecture Documentation](docs/architecture.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
