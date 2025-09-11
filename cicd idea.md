# CI/CD Pipeline Architecture

This document outlines the CI/CD pipeline architecture for the Node.js application, which includes:

- A Docker image for running the app
- A GitHub Package for other apps to interact with this app

The pipelines are designed to be split into multiple GitHub Actions workflow files for better organization and maintainability.

## Workflow Files Structure

1. **`.github/workflows/checks.yml`** - Handles validations
2. **`.github/workflows/release.yml`** - Handles automated releases on tag pushes

## On Pull Requests (PR Checks)

**File:** `.github/workflows/checks.yml`

**Trigger:**

- `pull_request` (opened, synchronize, reopened)
- `workflow_dispatch` (manual trigger for re-running checks)

**Jobs:**

- **Lint**: Run linters to check code style and quality.
- **Test**: Run unit tests to ensure code functionality.
- **Semantic Versioning Check**: Verify that the project version has been updated according to semantic versioning rules.

## On Push Tag (Automated Release)

**File:** `.github/workflows/release.yml`

**Trigger:** `push` on tags matching `v*.*.*`

**Jobs:**

- **Version Validation**:
  - Check the tag version against the project version in package.json
  - Determine if version is a pre-release (contains alpha, beta, rc, etc.)
  - Set outputs for whether to tag as "latest"

- **Docker Image** (depends on version-validation):
  - **Build**: Build the Docker image using the Dockerfile
    - Steps:
      - Checkout code
      - Set up Docker Buildx
      - Login to GitHub Container Registry
      - Build and push image with appropriate tags
      - If not pre-release: tag as "latest"
  - **Publish**: Push the image to GitHub Container Registry (ghcr.io)

- **GitHub Package** (depends on version-validation):
  - **Build**: Build the package if needed (npm run build)
    - Steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Build package
  - **Publish**: Publish the package to GitHub Packages
    - Login to GitHub Packages registry
    - Publish with appropriate tags
    - If not pre-release: tag as "latest"

## Implementation Notes

- **Security**: Use GitHub's dependency review, code scanning
- **Caching**: Cache Node.js modules and Docker layers for faster builds
- **Notifications**: Send notifications on failures/successes (Slack, etc.)
- **Environment Protection**: Require approvals for production deployments
- **Branch Protection**: Enforce PR checks before merging to main
- **Secrets Management**: Store registry credentials as GitHub secrets
- **Matrix Builds**: Consider testing on multiple Node.js versions if needed

- Use `concurrency` to cancel in-progress runs on new commits
- Implement proper error handling and cleanup
- Add step summaries and job summaries for better visibility
- Use reusable workflows (`reusable-publish.yml`) for common build and publish steps to reduce duplication
- Monitor workflow performance and optimize slow jobs
