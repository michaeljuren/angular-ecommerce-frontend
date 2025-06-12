# Angular E-commerce Platform

[![Angular](https://img.shields.io/badge/Angular-19.0.7-red.svg)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](#)

An e-commerce web application built with Angular 19, featuring a modern responsive design, robust architecture, and seamless user experience. This platform provides a complete online shopping solution with advanced features for both customers and administrators.

## 🌟 Features

### 🛍️ Customer Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Product Catalog** - Advanced search, filtering, and sorting capabilities
- **Shopping Cart** - Persistent cart with real-time updates
- **User Authentication** - Secure registration and login system
- **Order Management** - Complete order tracking and history
- **Payment Integration** - Multiple payment gateway support

### 🏗️ Technical Features
- **Modular Architecture** - Scalable component-based structure
- **State Management** - Efficient data flow with NgRx (optional)
- **Lazy Loading** - Optimized performance with route-based code splitting
- **Progressive Web App** - PWA capabilities for enhanced user experience
- **Internationalization** - Multi-language support ready
- **Accessibility** - WCAG 2.1 AA compliant

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 19.0.7+ | Frontend framework |
| **TypeScript** | 5.0+ | Programming language |
| **Angular CLI** | 19.0.7+ | Development tooling |
| **RxJS** | Latest | Reactive programming |
| **Angular Material** | Latest | UI component library |
| **Auth0 Angular** | Latest | Authentication service |

## 📋 Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) - Comes with Node.js
- **Angular CLI** (v19.0.7+) - Install globally: `npm install -g @angular/cli`
- **Git** - [Download](https://git-scm.com/)

### System Requirements

| OS | Minimum | Recommended |
|----|---------|-------------|
| **Windows** | 10 (64-bit) | 11 (64-bit) |
| **macOS** | 10.15 | 12.0+ |
| **Linux** | Ubuntu 18.04+ | Ubuntu 20.04+ |

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/michaeljuren/angular-ecommerce-frontend.git
cd angular-ecommerce
```

### 2. Install Dependencies

```bash
# Install project dependencies
npm install

# Optional: Install Angular CLI globally if not already installed
npm install -g @angular/cli@19.0.7
```

### 3. Environment Configuration

Create environment files for different stages:

```bash
# Development environment
cp src/environments/environment.template.ts src/environments/environment.ts

# Production environment  
cp src/environments/environment.template.ts src/environments/environment.prod.ts
```

Update the environment files with your configuration:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'Angular E-commerce',
  version: '1.0.0',
  auth0: {
    domain: 'YOUR_AUTH0_DOMAIN',
    clientId: 'YOUR_AUTH0_CLIENT_ID',
    audience: 'YOUR_AUTH0_WEB_LINK',
    redirectUri: 'YOUR_AUTH0_REDIRECT_URI'
  }
};
```

### 4. Auth0 Configuration

Install Auth0 Angular SDK:

```bash
npm install @auth0/auth0-angular
```

Configure Auth0 in your `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Auth0 Setup Steps:**
1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new Single Page Application
3. Configure allowed callback URLs: `http://localhost:4200/login`
4. Configure allowed logout URLs: `http://localhost:4200`
5. Update your environment files with the Auth0 domain and client ID

### 5. Start Development Server

```bash
ng serve
```

🎉 Open your browser and navigate to `http://localhost:4200/`

The application will automatically reload when you make changes to the source files.

## 🔧 Development

### Code Scaffolding

Generate new components, services, and other Angular schematics:

```bash
# Generate a new component
ng generate component components/product-card

# Generate a new service
ng generate service services/product

# Generate a new module
ng generate module modules/checkout --routing

# Generate a new guard
ng generate guard guards/auth

# View all available schematics
ng generate --help
```

### Development Scripts

```bash
# Start development server
npm start

# Start with specific port
ng serve --port 4300

# Start with production configuration
ng serve --configuration production

# Start with SSL
ng serve --ssl
```

## 🏗️ Building

### Development Build

```bash
ng build
```

### Production Build

```bash
# Build for production
ng build --configuration production

# Build with additional optimizations
ng build --prod --aot --build-optimizer
```

Build artifacts are stored in the `dist/` directory and include:
- Minified and optimized JavaScript bundles
- Compressed CSS files
- Optimized assets and images
- Service worker files (if PWA enabled)

## 📁 Project Structure

```
angular-ecommerce/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Route components
│   │   ├── services/           # Business logic services
│   │   ├── common/             # TypeScript interfaces/models
│   │   └── validators/         # Input validation logic
│   ├── assets/
│   │   └── images/             # Image assets
│   ├── environments/           # Environment configurations
│   ├── styles.scss             # Global styles
│   ├── index.html              # Main HTML file
│   └── main.ts                 # Application bootstrap
├── node_modules/               # Dependencies
├── angular.json                # Angular CLI config
├── package.json                # npm dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

## 🔧 Configuration

### Angular CLI Configuration

Key configuration options in `angular.json`:

```json
{
  "projects": {
    "angular-ecommerce": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        }
      }
    }
  }
}
```

### TypeScript Configuration

Customize TypeScript settings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true
  }
}
```

## 🚀 Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

```bash
# Build for production
ng build --configuration production

# Deploy the dist/ folder to your hosting service
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/angular-ecommerce /usr/share/nginx/html
EXPOSE 80
```

### CI/CD Pipeline

Example GitHub Actions workflow:

```yaml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: ng test --browsers ChromeHeadless --watch=false
      - run: ng build --configuration production
```

## 🤝 Contributing

I welcome contributions from the community!

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes following our coding standards
4. **Add** tests for new functionality
5. **Run** the test suite: `npm test`
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to the branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Additional Resources

- [Angular Documentation](https://angular.dev/docs)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---
*Star ⭐ this repository if you find it helpful!*
