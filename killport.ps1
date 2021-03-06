param ($port)

$foundProcesses = netstat -ano | findstr :$port
$activePortPattern = ":$port\s.+LISTENING\s+\d+$"
$pidNumberPattern = "\d+$"

IF ($foundProcesses | Select-String -Pattern $activePortPattern -Quiet) {
    $matches = $foundProcesses | Select-String -Pattern $activePortPattern
    $firstMatch = $matches.Matches.Get(0).Value

    $pidNumber = [regex]::match($firstMatch, $pidNumberPattern).Value

    taskkill /pid $pidNumber /f
}

#Script arguments: 8080 (port number folosit)
#Command paramaters: -noprofile -executionpolicy bypass -file .\killport.ps1
#working directory trebuie sa fie cel cu proiectul




#https://dzhavat.github.io/2020/04/09/powershell-script-to-kill-a-process-on-windows.html

