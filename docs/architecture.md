# DocuQuery Architecture Documentation

## Overview

DocuQuery is a document management system with AI-powered Q&A capabilities. The application allows users to upload, manage, and query documents with role-based access control.

## System Architecture

The application follows a client-server architecture with the following components:

1. **Frontend**: Next.js application with React components
2. **Backend Services**: API routes and server actions for data operations
3. **Authentication**: Custom authentication system with role-based access control
4. **Document Processing**: Document ingestion pipeline for processing uploaded files
5. **Vector Database**: Storage for document embeddings to enable semantic search
6. **AI Q&A**: RAG (Retrieval-Augmented Generation) system for answering questions about documents

### Architecture Diagram

\`\`\`
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  User Interface │────▶│  Next.js Server │────▶│  Authentication │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │  Service Layer  │
                        │                 │
                        └────────┬────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
                 ▼                               ▼
        ┌─────────────────┐             ┌─────────────────┐
        │                 │             │                 │
        │  Document Store │             │  Vector Store   │
        │                 │             │                 │
        └─────────────────┘             └─────────────────┘
\`\`\`

## Component Structure

The application is organized into the following main components:

### Core Components

1. **Authentication System**
   - `AuthProvider`: Context provider for authentication state
   - `useAuth`: Hook for accessing authentication context
   - `useHasRole`: Hook for role-based access control

2. **Service Layer**
   - User services: CRUD operations for users
   - Document services: CRUD operations for documents
   - Ingestion services: Document processing pipeline
   - Q&A services: RAG-based question answering

3. **UI Components**
   - `DocumentsUI`: Document management interface
   - `IngestionUI`: Document processing monitoring
   - `UsersUI`: User management interface
   
4. **Access Control**
   - `RoleGuard`: Component for protecting routes based on user roles
   - Path-based permissions system

## Authentication Flow

1. User submits login credentials
2. System validates credentials against user database
3. On successful authentication:
   - User object is stored in context
   - User data is persisted in localStorage
   - User is redirected to dashboard
4. Role-based access control restricts UI elements and routes based on user role

## Role-Based Access Control

The system implements three user roles:

1. **Admin**
   - Full access to all features
   - Can manage users and assign roles
   - Can upload, process, and query documents

2. **Editor**
   - Can upload and manage documents
   - Can monitor document processing
   - Can use Q&A features
   - Cannot manage users

3. **Viewer**
   - Read-only access to documents
   - Can use Q&A features
   - Cannot upload or process documents
   - Cannot manage users

## Document Processing Pipeline

When a document is uploaded, it goes through the following processing steps:

1. **Document Upload**: File is uploaded to storage
2. **Text Extraction**: Text is extracted from the document
3. **Chunking**: Document is split into manageable chunks
4. **Embedding Generation**: Vector embeddings are generated for each chunk
5. **Vector Storage**: Embeddings are stored in vector database for retrieval

## Q&A System

The Q&A system uses RAG (Retrieval-Augmented Generation) to answer questions:

1. User submits a question
2. System converts question to vector embedding
3. Vector database is queried to find relevant document chunks
4. Retrieved chunks are used as context for AI model
5. AI generates answer based on retrieved context
6. Answer is returned to user with source references

## Data Flow

1. **User Authentication**:
   - User credentials → Authentication Service → User Context

2. **Document Upload**:
   - Document File → Upload Service → Document Storage → Ingestion Pipeline

3. **Document Query**:
   - User Question → Vector Search → Retrieved Chunks → AI Model → Answer

## Technical Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Authentication**: Custom JWT-based authentication
- **Vector Database**: (Implementation-specific)
- **AI Model**: (Implementation-specific)
