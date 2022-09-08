#using some setting parsing modified from https://stackoverflow.com/questions/43690336/powershell-to-read-single-value-from-simple-ini-file
$configData = Get-Content -Path 'setup_settings.ini' -Raw | % {$_.replace("\", "\\")} | ConvertFrom-StringData
Write-Host "Trying MariaDB installation directory "$configData.dbInstallPath
$mysqlpath=$configData.dbInstallPath+"\bin\mysql.exe"
$repoDBPath = Split-Path -Parent $MyInvocation.MyCommand.Path

function ExecuteDBScript {
    param(
        $filename
    )
    Start-Process -NoNewWindow -FilePath $mysqlpath -ArgumentList "-u root", ("-p"+$configData.dbRootPassword), ("-e `"source "+$repoDBPath+"\"+$filename+"`"").replace("\", "/") -Wait
}

Write-Host $repoDBPath
if(-not(Test-Path -Path $mysqlpath -PathType Leaf)) {
    Write-Host "MariaDB installation not found, check that setup.ini is correct."
}
else {
    Write-Host "Found installation."
    ExecuteDBScript -filename "schema_dump.sql"
    ExecuteDBScript -filename "user_execute_perms.sql"
    ExecuteDBScript -filename "load_demo_data.sql"
}
Write-Host
Read-Host -Prompt "Press Enter to continue"