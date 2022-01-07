i=0
shopt -s extglob
THISSCRIPT=build.sh
FILE=build0.tar.gz
sudo apt-get install tar

function checkfile {
if [ -f "$FILE" ]; then
	echo "$FILE exists."
	i=$((i+1))
	FILE=build${i}.tar.gz
	checkfile

else
	echo "[CREATE] $FILE, since it does not exist already."
	filename="build${i}.tar.gz"
	j=$((i-1))
    	tar -czvf ${filename} build
	rm -rfv build
	rm -rfv !(build*)

fi
}
checkfile

git add .
git commit -am "Build Files"
git fetch --all
git merge origin/build
git push origin build
