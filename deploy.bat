@echo off
echo ============================================
echo  DEPLOYING TO VERCEL
echo ============================================
echo.

echo [1/3] Adding files...
git add .

echo.
echo [2/3] Committing changes...
git commit -m "Fix Vercel deployment - Python import paths"

echo.
echo [3/3] Pushing to remote...
git push

echo.
echo ============================================
echo  DONE! Vercel is deploying now...
echo ============================================
echo.
echo Check deployment status:
echo https://vercel.com/dashboard
echo.
echo After deployment completes, test API:
echo https://your-domain.vercel.app/api/health
echo.
pause
