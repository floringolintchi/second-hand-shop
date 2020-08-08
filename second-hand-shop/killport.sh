#!/bin/bash
#port=$(netstat -ano | findstr :8080)
#echo $port
#taskkill /PID "$port" /F
#echo "Press any key to continue"
#while [ true ] ; do
#read -t 3 -n 1
#if [ $? = 0 ] ; then
#exit ;
#else
#echo "waiting for the keypress"
#fi
#done

#param ($port)
#
#$foundProcesses = netstat -ano | findstr :$port
#$activePortPattern = ":$port\s.+LISTENING\s+\d+$"
#$pidNumberPattern = "\d+$"
#
#IF ($foundProcesses | Select-String -Pattern $activePortPattern -Quiet) {
#  $matches = $foundProcesses | Select-String -Pattern $activePortPattern
#  $firstMatch = $matches.Matches.Get(0).Value
#
#  $pidNumber = [regex]::match($firstMatch, $pidNumberPattern).Value
#
#  taskkill /pid $pidNumber /f
#}