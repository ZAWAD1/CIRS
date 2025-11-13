@echo off
echo ======================================
echo 🔄 Pulling latest changes from Dev...
echo ======================================
git checkout Dev
git pull origin Dev

echo ======================================
echo 🔀 Merging Dev into jimam-frontend...
echo ======================================
git checkout jimam-frontend
git merge Dev

echo ======================================
echo 🚀 Pushing updated jimam-frontend to origin...
echo ======================================
git push origin jimam-frontend

echo ✅ Done! Your branch is now up to date.
pause
