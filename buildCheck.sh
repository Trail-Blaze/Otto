i=0

FILE=build.tar.gz
function checkfile {
if [ -f "$FILE" ]; then
	echo "$FILE exists."
	i=$((i+1))
    checkfile

else
	echo "$FILE does not exist."
	tar -czvf build${i}.tar.gz build

fi
}
         
git add .
git commit -am "Build Files"
git fetch --all
git merge origin/build
git push origin build
