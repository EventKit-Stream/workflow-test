# Workflow Ideas

The jobs start automatically unless specified otherwise.
All jobs can be started manually from the Actions tab.

## On PRs

- **Lint**: Run linters to check code style and quality.
  - If Fail: Comment on the PR with linting errors, and block merging.
  - If Pass: Continue the workflow.
- **Test**: Run unit tests to ensure code functionality.
  - If Fail: Comment on the PR with test errors, and block merging.
  - If Pass: Continue the workflow.
- **Semantic Versioning**: Check if the project version has been updated according to semantic versioning rules.

## On Push to Main Branch (Build)

- Check if version is a pre-release (contains alpha, beta, rc, etc.):
  - If Yes: Do not include "latest" tag when publishing the Docker image and the Package.
  - If No: Include "latest" tag when publishing the Docker image and the Package.

In Parallel:

- **Docker Image**:
  - **Build**: Build the image.
  - **Publish**: Push the image to GitHub Container Registry.
- **Package**:
  - **Build**: Build the package.
  - **Publish**: Publish the package to this orgs's Packages (as internal (it's a repository in an organization)).

## On Push Tag (v*.*.*)

- Check Version:
  - Check the tag version against the project version.
  - If Fail: Comment on the PR with version mismatch errors, and block merging.