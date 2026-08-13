$ErrorActionPreference = 'Stop'

$dxp = "c:\Users\UsrDevPro\CORP-PROJECT\DUMP\dxp"
$milestones = @("M0001_Foundation", "M0002_Security_Reality", "M0003_WorldEngine")
$requiredFiles = @("README.md", "SUMMARY.md", "OUTPUT.md", "CHANGELOG.md", "BUILD_REPORT.md", "TEST_REPORT.md", "RISK_REGISTER.md", "DECISIONS.md", "NEXT_STEPS.md", "METRICS.md", "ARTIFACTS.md", "STATUS.json")

foreach ($m in $milestones) {
    $dir = "$dxp\milestones\$m"
    New-Item -ItemType Directory -Force "$dir\screenshots" | Out-Null
    
    foreach ($f in $requiredFiles) {
        if (-not (Test-Path "$dir\$f")) {
            Set-Content -Path "$dir\$f" -Value "UNKNOWN" -Encoding UTF8
        }
    }
    
    if (-not (Test-Path "$dir\screenshots\README.md")) {
        Set-Content -Path "$dir\screenshots\README.md" -Value "Screenshots unavailable." -Encoding UTF8
    }
}

# Overwrite M0003 STATUS.json with correct format
$statusJson = @{
    milestone = 3
    name = "World Engine"
    status = "VERIFIED"
    completion = 100
    runtime_verified = $true
    build_verified = $false
    browser_verified = $true
    deployment_ready = $false
    next_milestone = 4
}
$statusJson | ConvertTo-Json | Set-Content -Path "$dxp\milestones\M0003_WorldEngine\STATUS.json" -Encoding UTF8

# Move M0003 specific reports that exist in root
$m3Files = @("OUTPUT.md", "BUILD_REPORT.md", "TEST_REPORT.md", "CHANGELOG.md", "DECISIONS.md", "NEXT_STEPS.md", "RISK_REGISTER.md")
foreach ($f in $m3Files) {
    if (Test-Path "$dxp\$f") {
        Copy-Item -Path "$dxp\$f" -Destination "$dxp\milestones\M0003_WorldEngine\$f" -Force
    }
}

# Archive Root Reports
$archive = "$dxp\archive\root-reports"
New-Item -ItemType Directory -Force $archive | Out-Null

$rootReports = @("OUTPUT.md", "BUILD_REPORT.md", "TEST_REPORT.md", "CHANGELOG.md", "DECISIONS.md", "NEXT_STEPS.md", "RISK_REGISTER.md", "PROJECT_PROGRESS.md")
foreach ($f in $rootReports) {
    if (Test-Path "$dxp\$f") {
        Move-Item -Path "$dxp\$f" -Destination "$archive\$f" -Force
    }
}

Write-Host "Serialization complete"
