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
  - If Fail: Comment on the PR with versioning errors.
    - Ask (with a text field) the user to update the version.
    - Update the PR with the new version.
    - Go back to **Semantic Versioning** check.
  - If Pass: Continue the workflow.
- **Wait for Approval**: Pause the workflow and wait for a manual approval to proceed.
- **Sub-Versioning**: Ask (with a text field) the user to provide a sub-version (alpha, beta, rc, etc.), that's the version to use for the following jobs.
- **Release Notes**: Ask (with a text area (md) field) the user to provide release notes for the new version (sub version (pre release)).
- Now in parallel:
  - **Docker Image**:
    - **Build**: Build the image.
    - **Publish**: Push the image to GitHub Container Registry.
  - **Package**:
    - **Build**: Build the package.
    - **Publish**: Publish the package to this repository's GitHub Packages (as internal (it's a repository in an organization)).
- **Re-Synchronize Jobs**: Wait for the parallel jobs to finish.
- **Create Release**: Create a new Pre-Release in GitHub with the new version (sub version), using the provided release notes.
