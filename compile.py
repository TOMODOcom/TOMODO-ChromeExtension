from os import chdir, remove
from os.path import dirname, abspath
from shutil import copytree, copy2, rmtree
from subprocess import call

chdir(dirname(abspath(__file__)))

try:
    rmtree('./compiled_extension')
except:
    pass

try:
    remove('./extension.zip')
except:
    pass

copytree('./extension', './compiled_extension')
copy2('./production_settings.js', './compiled_extension/settings.js')
call(["zip", "-r", "./extension.zip", "./compiled_extension/"])
