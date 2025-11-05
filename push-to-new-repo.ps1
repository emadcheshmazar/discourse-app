# Script to push project to a new GitHub repository
# Usage: .\push-to-new-repo.ps1 -NewRepoUrl "https://github.com/yourusername/your-new-repo.git"

param(
    [Parameter(Mandatory=$true)]
    [string]$NewRepoUrl
)

Write-Host "🚀 Starting process to push to new repository..." -ForegroundColor Cyan

# Check if there are uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  You have uncommitted changes. Do you want to commit them first? (y/n)" -ForegroundColor Yellow
    $commit = Read-Host
    if ($commit -eq "y" -or $commit -eq "Y") {
        git add .
        $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
        if ([string]::IsNullOrWhiteSpace($commitMessage)) {
            $commitMessage = "Initial commit"
        }
        git commit -m $commitMessage
        Write-Host "✅ Changes committed" -ForegroundColor Green
    }
}

# Remove old remote
Write-Host "📦 Removing old remote..." -ForegroundColor Cyan
git remote remove origin

# Add new remote
Write-Host "📦 Adding new remote: $NewRepoUrl" -ForegroundColor Cyan
git remote add origin $NewRepoUrl

# Get current branch name
$currentBranch = git branch --show-current
Write-Host "📍 Current branch: $currentBranch" -ForegroundColor Cyan

# Push to new repository
Write-Host "⬆️  Pushing to new repository..." -ForegroundColor Cyan
git push -u origin $currentBranch

Write-Host "✅ Successfully pushed to new repository!" -ForegroundColor Green
Write-Host "🔗 Your new repository URL: $NewRepoUrl" -ForegroundColor Cyan

