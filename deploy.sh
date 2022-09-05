#git branch -D gh-pages
#git checkout -b gh-pages
# remove build from gitignore
npm run build
cp build/index.html build/404.html
mv build docs
git add .
git commit -sS -m "updates"
git push origin gh-pages --force
git checkout main