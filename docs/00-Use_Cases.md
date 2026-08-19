# CV Customization & Job Application Tracker — Use Cases

## 1. Actor Overview

### Primary Actor

**Job Seeker**

The person who manages their professional profile, creates customized resumes, searches for job opportunities, and tracks applications.

### External Actors

* **LinkedIn** — Primary job platform integration.
* **Indeed** — Job platform integration.
* **Glassdoor** — Job platform integration.
* **Other Job Platforms** — Future integrations.
* **Web Crawler** — Generic mechanism for collecting publicly available job postings.
* **AI Service** — Future integration for resume analysis and content suggestions.

---

# 2. Profile Management

## UC-001 — Create Professional Profile

**Actor:** Job Seeker

**Description:**
The user creates their professional profile containing their general professional information.

**Main Flow:**

1. The user opens the profile management section.
2. The user enters personal and professional information.
3. The user saves the profile.
4. The system validates the information.
5. The system stores the profile locally.

**Expected Result:**
A professional profile is available for use when creating resumes and applications.

---

## UC-002 — Manage Work Experience

**Actor:** Job Seeker

**Description:**
The user manages their professional experiences.

**Main Flow:**

1. The user opens the work experience section.
2. The user creates, edits, or removes an experience.
3. The user provides information such as:

   * Company
   * Job title
   * Start date
   * End date
   * Description
   * Responsibilities
   * Technologies
   * Achievements
   * Relevant links
4. The user saves the experience.
5. The system stores the information.

**Expected Result:**
The experience becomes available as reusable content for resume generation.

---

## UC-003 — Manage Projects

**Actor:** Job Seeker

**Description:**
The user manages personal, academic, professional, or open-source projects.

**Main Flow:**

1. The user creates a project.
2. The user provides:

   * Project name
   * Description
   * Technologies
   * Role
   * Achievements
   * GitHub repository
   * Website
   * Other relevant links
3. The user saves the project.
4. The system makes the project available for future resumes.

---

## UC-004 — Manage Skills

**Actor:** Job Seeker

**Description:**
The user manages technical and non-technical skills.

**Possible Information:**

* Skill name
* Category
* Proficiency level
* Years of experience
* Related projects
* Related experiences

**Expected Result:**
Skills can be selected when customizing a resume for a specific position.

---

## UC-005 — Manage Education

**Actor:** Job Seeker

**Description:**
The user manages academic background.

**Possible Information:**

* Institution
* Degree
* Field of study
* Start date
* End date
* Status
* Relevant links

---

## UC-006 — Manage Certifications

**Actor:** Job Seeker

**Description:**
The user manages professional certifications and courses.

**Possible Information:**

* Certification/course name
* Institution
* Issue date
* Expiration date
* Credential ID
* Credential URL

---

# 3. Resume Management

## UC-007 — Create Resume

**Actor:** Job Seeker

**Description:**
The user creates a resume using information stored in their professional profile.

**Main Flow:**

1. The user selects "Create Resume".
2. The user selects the desired information.
3. The user selects a resume template.
4. The system generates the resume.
5. The user reviews the generated resume.
6. The user saves the resume.

---

## UC-008 — Customize Resume for a Job

**Actor:** Job Seeker

**Description:**
The user creates a resume specifically targeted at a job posting.

**Main Flow:**

1. The user selects a job posting.
2. The system displays relevant job information.
3. The user selects a base resume.
4. The user selects relevant experiences, projects, and skills.
5. The user adjusts the resume content.
6. The system generates a customized resume.
7. The user reviews and saves the resume.

**Expected Result:**
A resume specifically targeted at the selected job is created.

---

## UC-009 — Create Resume Version

**Actor:** Job Seeker

**Description:**
The user creates multiple versions of a resume without modifying the original professional profile.

**Example:**

```text
Professional Profile
 ├── Backend Resume
 ├── Full Stack Resume
 ├── Node.js Resume
 └── Software Engineer Resume
```

Each version can contain different experiences, projects, skills, and descriptions.

---

## UC-010 — Export Resume

**Actor:** Job Seeker

**Description:**
The user exports a resume into a shareable format.

**Possible Formats:**

* PDF
* DOCX
* Plain text
* Markdown

The initial implementation should prioritize **PDF**.

---

## UC-011 — Import Existing Resume

**Actor:** Job Seeker

**Description:**
The user imports an existing resume to populate or update their professional profile.

**Future Extension:**
An AI/OCR parser can extract information from the document automatically.

---

# 4. Job Management

## UC-012 — Add Job Manually

**Actor:** Job Seeker

**Description:**
The user manually registers a job opportunity.

**Possible Information:**

* Job title
* Company
* Location
* Remote/Hybrid/On-site
* Description
* Requirements
* Technologies
* Salary
* Job URL
* Platform
* Publication date

---

## UC-013 — Import Job Posting

**Actor:** Job Seeker

**Description:**
The user imports a job posting from an external platform.

**Main Flow:**

1. The user provides the job URL.
2. The system identifies the supported platform.
3. The system retrieves the available job information.
4. The system normalizes the data.
5. The system creates a job record.

---

## UC-014 — Collect Jobs Using Web Crawler

**Actor:** Job Seeker / Web Crawler

**Description:**
The system retrieves publicly available job postings from supported sources.

**Main Flow:**

1. The user defines search criteria.
2. The crawler accesses supported sources.
3. The crawler extracts job information.
4. The system normalizes the data.
5. Duplicate jobs are detected.
6. New jobs are stored locally.

**Important Constraint:**
Each platform should have an independent integration because website structure, authentication requirements, rate limits, robots policies, and terms of service may differ.

---

# 5. Job Application Tracking

## UC-015 — Create Job Application

**Actor:** Job Seeker

**Description:**
The user associates an application with a job posting.

**Possible Statuses:**

```text
Saved
Applied
Recruiter Contacted
Interview
Technical Test
Final Interview
Offer
Accepted
Rejected
Withdrawn
Archived
```

---

## UC-016 — Update Application Status

**Actor:** Job Seeker

**Description:**
The user manually updates the status of an application.

**Main Flow:**

1. The user opens an application.
2. The user selects a new status.
3. The system records the status change.
4. The system stores the date of the transition.

**Expected Result:**
The application history contains a complete timeline of status changes.

---

## UC-017 — Track Application History

**Actor:** Job Seeker

**Description:**
The user views the history of an application.

**Example:**

```text
2026-08-01  Applied
2026-08-04  Recruiter Contacted
2026-08-08  Interview
2026-08-12  Technical Test
2026-08-17  Rejected
```

---

## UC-018 — Automatically Detect Application Status

**Actor:** Job Platform Integration

**Description:**
The system attempts to identify changes in an application's status through an external platform.

**Main Flow:**

1. The integration authenticates with the platform when required.
2. The system retrieves available application information.
3. The system identifies the corresponding local application.
4. The system compares the external status with the local status.
5. The system updates the local application when a relevant change is detected.
6. The system records the synchronization event.

**Important:**
Automatic tracking should be implemented as an optional integration and should not be required for the core application.

---

# 6. Platform Integrations

## UC-019 — Connect LinkedIn

**Actor:** Job Seeker

**Description:**
The user connects LinkedIn to enable supported integration features.

**Priority:** MVP / Proof of Concept

**Possible Features:**

* Import job postings
* Open job links
* Associate applications with LinkedIn jobs
* Retrieve publicly available job information
* Future application-status synchronization where technically and legally supported

---

## UC-020 — Connect Indeed

**Actor:** Job Seeker

**Description:**
The user connects or configures an Indeed integration.

**Priority:** Future

---

## UC-021 — Connect Glassdoor

**Actor:** Job Seeker

**Description:**
The user connects or configures a Glassdoor integration.

**Priority:** Future

---

## UC-022 — Manage Platform Integrations

**Actor:** Job Seeker

**Description:**
The user manages external platform integrations.

**Possible Actions:**

* Connect platform
* Disconnect platform
* Enable/disable synchronization
* Test connection
* View synchronization status
* View last synchronization time
* Re-authenticate

---

# 7. Application Analytics

## UC-023 — View Application Dashboard

**Actor:** Job Seeker

**Description:**
The user views an overview of their job search.

**Possible Metrics:**

```text
Total Applications
Applications This Month
Active Applications
Interviews
Offers
Rejected Applications
Response Rate
Interview Rate
Average Time to Response
```

---

## UC-024 — Filter Applications

**Actor:** Job Seeker

**Description:**
The user filters applications based on different attributes.

**Possible Filters:**

* Status
* Company
* Platform
* Date
* Job title
* Technology
* Remote/Hybrid/On-site

---

# 8. AI-Assisted Features

These use cases are intentionally designed as future extensions.

## UC-025 — Analyze Job Description

**Actor:** Job Seeker / AI Service

**Description:**
The system analyzes a job description and extracts relevant information.

**Possible Output:**

```text
Required Skills
Preferred Skills
Technologies
Years of Experience
Responsibilities
Keywords
Seniority
Education Requirements
```

---

## UC-026 — Suggest Resume Customization

**Actor:** Job Seeker / AI Service

**Description:**
The AI analyzes the job description and the user's professional profile to suggest relevant resume modifications.

**Possible Suggestions:**

* Relevant experiences
* Relevant projects
* Skills to highlight
* Keywords to include
* Sections to prioritize
* Potentially irrelevant information to remove

---

## UC-027 — Analyze Resume Against Job

**Actor:** Job Seeker / AI Service

**Description:**
The system compares a resume against a specific job description.

**Possible Output:**

```text
Match Score
Missing Skills
Relevant Experience
Missing Keywords
Potential Improvements
ATS Compatibility Suggestions
```

The system should provide suggestions rather than automatically modifying the user's professional history.

---

# 9. Local Data Management

## UC-028 — Backup Application Data

**Actor:** Job Seeker

**Description:**
The user exports their local application data to a backup file.

---

## UC-029 — Restore Application Data

**Actor:** Job Seeker

**Description:**
The user restores previously exported application data.

---

## UC-030 — Import/Export Data

**Actor:** Job Seeker

**Description:**
The user imports or exports their professional profile, resumes, jobs, and applications.

**Possible Formats:**

* JSON
* CSV
* ZIP archive

---

# 10. Non-Functional Requirements

## NFR-001 — Local-First Architecture

The core application should operate without requiring a remote backend.

All essential data should be stored locally.

---

## NFR-002 — Offline Operation

The following features should work without an internet connection:

* Profile management
* Experience management
* Project management
* Resume creation
* Resume customization
* Resume export
* Application tracking
* Application analytics
* Data import/export

Internet access should only be required for external integrations and optional AI services.

---

## NFR-003 — Platform Integration Isolation

Each external platform integration should be isolated behind a common interface.

Example:

```text
JobPlatform
    ├── LinkedInAdapter
    ├── IndeedAdapter
    ├── GlassdoorAdapter
    └── GenericWebCrawlerAdapter
```

This allows new platforms to be added without modifying the core application.

---

## NFR-004 — Data Privacy

Professional profile data, resumes, application history, and credentials should remain locally stored whenever possible.

External services should only receive the minimum data required to perform the requested operation.

---

## NFR-005 — Extensibility

The system should allow future integration with:

* AI providers
* Additional job platforms
* Cloud synchronization
* Browser extensions
* Mobile applications
* Resume templates
* External storage providers

---

# 11. MVP Scope

The initial MVP should focus on:

1. Professional profile management
2. Work experience management
3. Project management
4. Skill management
5. Resume generation
6. Resume customization
7. PDF export
8. Manual job registration
9. Manual application tracking
10. LinkedIn job integration / proof of concept
11. Local database
12. Import/export backup

AI, Indeed, Glassdoor, automated application tracking, and cloud synchronization should be treated as future iterations.
