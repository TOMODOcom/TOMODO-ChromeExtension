from os import chdir, remove
from os.path import dirname, abspath
from shutil import copytree, copy2, rmtree
from subprocess import call
from sys import argv

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

if 'dev' in argv:
    settings_file = './dev_settings.js'
else:
    settings_file = './production_settings.js'

copy2(settings_file, './compiled_extension/settings.js')

call(["zip", "-r", "./extension.zip", "./compiled_extension/"])
