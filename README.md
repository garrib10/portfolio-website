# Brian Garrity Portfolio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-222222?logo=github)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

A modern, responsive portfolio website showcasing my professional experience, software engineering projects, technical skills, certifications, and contact information.

---

## Live Website

**Portfolio**

https://garrib10.github.io/portfolio-website/

---

## Screenshots

### Home Page

![Portfolio Home](assets/screenshots/portfolio-home.png)

### Featured Projects

![Featured Projects](assets/screenshots/portfolio-projects.png)

### About & Contact

![About Section](assets/screenshots/portfolio-about.png)

---

## Overview

This portfolio serves as a central hub for my software engineering work and is continuously updated as I complete new projects and expand my technical skills.

Current highlights include:

- Modern responsive portfolio design
- Light/Dark mode with saved theme preference
- Featured project showcase
- Professional experience
- Technical skills overview
- Resume download
- Contact form
- GitHub and LinkedIn integration

---

## Featured Projects

### FinTrack

A production-deployed personal finance application built with Java, Spring Boot, React, TypeScript, and MySQL featuring:

- Short-lived JWTs with rotating refresh-token sessions and user-scoped financial data
- Transaction management, filtering, sorting, and pagination
- Monthly budgets and custom categories with spending analytics
- Financial analytics and a responsive dashboard
- Profile photos via Cloudinary and uptime monitoring with Better Stack
- 2,300+ automated backend and frontend tests, including MySQL integration tests with Testcontainers
- Swagger/OpenAPI documentation
- Vercel, Railway, and MySQL production deployment

### TaskFlow

A frontend-only Kanban board built with React, TypeScript, and Vite featuring:

- Four-stage workflow with capacity limits and parent-completion guards
- Drag-and-drop and keyboard task movement
- Independent Priority and Manual ordering
- Combined search and filtering
- Linked parent and child tasks with completion progress
- Responsive task details and guarded editing
- Versioned LocalStorage persistence, migration, and recovery
- Automated unit, integration, and browser regression tests with Vitest and Playwright

### Job Search Manager API

A production-ready REST API built with FastAPI, SQLAlchemy, and MySQL featuring:

- JWT authentication
- Company management
- Job application tracking
- Interview scheduling
- Search, filtering, sorting, and pagination
- Automated testing
- Swagger/OpenAPI documentation
- Railway deployment

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Font Awesome

### Services

- Formspree
- GitHub Pages

---

## Project Structure

```text
portfolio-website/
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── logos/
│
├── resume/
│
├── index.html
├── styles.css
├── scripts.js
└── README.md
```

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/garrib10/portfolio-website.git
```

Open the project with Live Server or any static web server.

---

## Security Considerations

This site is hosted using GitHub Pages, which has limitations for configuring certain HTTP security headers (such as CSP, HSTS preload, COOP, and X-Frame-Options). If migrated to a platform such as Vercel or Netlify, these headers can be configured through server or deployment settings.

---

## Future Enhancements

- Add FinTrack full-stack application
- Add Selenium Automation Suite
- Expand featured project showcase
- Additional accessibility improvements
- Performance optimizations

---

## License

MIT
