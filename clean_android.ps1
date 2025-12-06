Get-ChildItem -Path node_modules -Directory -Recurse -Depth 3 -Filter "android" | ForEach-Object {
    $buildDir = Join-Path $_.FullName "build"
    if (Test-Path $buildDir) {
        Write-Host "Removing $buildDir"
        Remove-Item -Path $buildDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
