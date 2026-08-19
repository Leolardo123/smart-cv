# CV Customizer

A local-first desktop application designed to help job seekers manage their professional information, create customized resumes, and track job applications across different platforms.

The main idea is to maintain a centralized professional profile and reuse its information to create resumes tailored to specific job opportunities.

## Overview

Instead of maintaining multiple resumes manually, the application allows the user to store their professional information once and create different resume versions from it.

```text
                    Professional Profile
                           │
          ┌────────────────┼────────────────┐
          │                │                │
     Experiences        Projects          Skills
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
                    Job Opportunity
                           │
                           ▼
                  Resume Customization
                           │
                           ▼
                    Job Application
                           │
                           ▼
                  Application Tracking
```

## Main Features

### Professional Profile

Store reusable professional information such as:

* Work experiences
* Projects
* Technical skills
* Education
* Certifications
* Professional links
* GitHub repositories
* Personal websites

Information is stored independently from individual resumes, allowing it to be reused across multiple resume versions.

### Resume Customization

Create resumes specifically targeted at a job opportunity.

The user can choose which information should be included in each resume, allowing different versions to be created for different career goals.

Examples:

* Backend Developer
* Full Stack Developer
* Node.js Developer
* Software Engineer

### Job Management

Store job opportunities and their relevant information.

Possible information includes:

* Job title
* Company
* Location
* Work model
* Job description
* Requirements
* Technologies
* Salary
* Job URL
* Platform
* Publication date

Jobs can be added manually or imported through supported integrations.

### Application Tracking

Track the status of job applications manually or, where technically and legally possible, through platform integrations.

Example application lifecycle:

```text
Saved
  │
  ▼
Applied
  │
  ▼
Recruiter Contacted
  │
  ▼
Interview
  │
  ▼
Technical Test
  │
  ▼
Final Interview
  │
  ├──► Offer
  │
  └──► Rejected
```

The system will maintain a history of status changes for each application.

### Job Platform Integrations

The application is designed around independent integrations, allowing different job platforms to be supported without coupling them to the core application.

Initial focus:

* LinkedIn
* Generic web crawling
* Indeed
* Glassdoor

**LinkedIn will be the first integration used as a proof of concept.**

Each integration should be isolated behind a common interface so additional platforms can be implemented independently.

> Platform integrations must respect the authentication requirements, rate limits, robots policies, APIs, and terms of service applicable to each platform.

## AI-Assisted Features

AI is planned as an optional future feature.

Potential functionality includes:

* Job description analysis
* Keyword extraction
* Resume/job matching
* Missing skill detection
* Resume improvement suggestions
* Experience prioritization
* ATS-oriented suggestions
* Job-specific resume recommendations

For example:

```text
                 Job Description
                        +
                Professional Profile
                        │
                        ▼
                   AI Analysis
                        │
          ┌─────────────┼─────────────┐
          │             │             │
     Relevant       Missing       Suggested
    Experiences      Skills       Keywords
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                Resume Suggestions
```

AI should assist the user rather than fabricate professional experience, qualifications, or achievements.

## Local-First

The core application is designed to work without requiring a hosted backend.

The following features should work locally:

* Profile management
* Experience management
* Project management
* Skills management
* Resume management
* Resume customization
* Job management
* Application tracking
* Application history
* Analytics
* Data import/export

Internet access should only be required for features that depend on external services, such as job platform integrations or optional AI providers.

This approach also allows the application to be distributed as a desktop application without requiring the user to maintain an account or connect to a centralized backend.

## Architecture

The project is being developed as a desktop application using **Tauri** with **Preact** as the UI framework.

```text
┌──────────────────────────────────────────┐
│              Tauri Desktop App           │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │              Preact UI              │  │
│  │                                    │  │
│  │ Profile │ Resume │ Jobs │ Tracking │  │
│  └───────────────────┬────────────────┘  │
│                      │                   │
│  ┌───────────────────▼────────────────┐  │
│  │           Application Core         │  │
│  │                                    │  │
│  │ Profile │ Resume │ Jobs │ Apps     │  │
│  └───────────────────┬────────────────┘  │
│                      │                   │
│  ┌───────────────────▼────────────────┐  │
│  │           Local Data Layer         │  │
│  └────────────────────────────────────┘  │
│                                          │
└──────────────────┬───────────────────────┘
                   │
          ┌────────┴─────────┐
          │                  │
     Job Platforms       AI Providers
          │                  │
    ┌─────┼─────┐            │
    │     │     │            │
LinkedIn Indeed Glassdoor   Future
```

### Technology Stack

| Layer                 | Technology                 |
| --------------------- | -------------------------- |
| Desktop Runtime       | Tauri                      |
| UI                    | Preact                     |
| Frontend Language     | TypeScript                 |
| Local Storage         | TBD                        |
| Resume Generation     | TBD                        |
| External Integrations | Platform-specific adapters |
| AI                    | Optional / Future          |

The exact persistence and resume-generation technologies may evolve during development.

## Design Principles

### Local-first

Core functionality should not depend on a remote server.

### Privacy-focused

Professional information, resumes, and application history should remain on the user's device whenever possible.

### Platform-agnostic

Job platforms should be implemented as independent integrations.

### Extensible

The architecture should make it possible to add:

* New job platforms
* New AI providers
* New resume templates
* Cloud synchronization
* Browser extensions
* Additional export formats

without significantly modifying the core application.

### Reusable Data

Professional information should be stored independently from resumes.

A single experience can therefore be reused in multiple resumes without duplicating the underlying data.

### User-controlled

Automated features should assist the user rather than silently modifying their professional information.

## Roadmap

### Phase 1 — Project Foundation

* [x] Tauri application
* [ ] React UI
* [ ] Project architecture
* [ ] Local persistence
* [ ] Application configuration

### Phase 2 — Professional Profile

* [ ] Professional profile
* [ ] Work experiences
* [ ] Projects
* [ ] Skills
* [ ] Education
* [ ] Certifications
* [ ] Professional links

### Phase 3 — Resume

* [ ] Resume data model
* [ ] Resume templates
* [ ] Resume builder
* [ ] Resume versions
* [ ] Job-specific customization
* [ ] PDF export

### Phase 4 — Job Applications

* [ ] Job registration
* [ ] Application tracking
* [ ] Application statuses
* [ ] Status history
* [ ] Application dashboard
* [ ] Search and filters

### Phase 5 — Integrations

* [ ] Generic job URL parser
* [ ] LinkedIn proof of concept
* [ ] Web crawler architecture
* [ ] Indeed integration
* [ ] Glassdoor integration
* [ ] Automatic application status synchronization

### Phase 6 — AI

* [ ] Job description analysis
* [ ] Keyword extraction
* [ ] Resume/job matching
* [ ] Resume suggestions
* [ ] ATS-oriented analysis

### Phase 7 — Advanced Features

* [ ] Browser extension
* [ ] Optional cloud synchronization
* [ ] Additional job platforms
* [ ] Additional resume templates
* [ ] Additional export formats

## Project Status

**Early Development**

The current implementation focuses on establishing the desktop application foundation with Tauri and Preact.

The first functional milestone will be the local professional profile and resume management system, followed by job application tracking and the LinkedIn integration proof of concept.

## License

TBD
