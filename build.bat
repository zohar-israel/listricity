call electron-packager D:\source\workspace\ listricity --platform=win32 --arch=x64 --version=0.35.6 --icon=icon.ico --overwrite=true --ignore="index_files|win32" --out=D:\build
call rcedit D:\build\listricity-win32-x64\listricity.exe --set-icon "D:\source\workspace\icon.ico"
cd D:\build
del listricity.7z
call "c:\Program Files\7-Zip\7z.exe" a -t7z listricity.7z listricity-win32-x64
call "c:\Program Files\7-Zip\7z.exe" a -t7z listricity.7z listricity.lnk
call copy /b 7zSd_all.sfx + config.txt + listricity.7z listricity_install.exe /Y
call rcedit D:\build\listricity_install.exe --set-icon "D:\source\workspace\icon.ico"