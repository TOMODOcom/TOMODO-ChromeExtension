#! /usr/bin/python

from json import load, dump
from os import chdir, remove, getcwd, popen, system
from os.path import dirname, abspath
from shutil import copytree, copy2, rmtree
from subprocess import call
from sys import argv

def increment_version(version):
    v = version.split(".")
    v = map(int, v)
    v.reverse()
    for index, digit in enumerate(v):
        v[index]+=1
        if v[index] == 100:
            v[index] = 0
        else:
            break
    v.reverse()
    v = map(str, v)
    v = reduce(lambda x, y: x+'.'+y, v)
    return v

chdir(dirname(abspath(__file__)))

with open('./extension/manifest.json') as fp:
    manifest = load(fp)

manifest['version'] = increment_version(manifest['version'])

with open('./extension/manifest.json') as fp:
    dump(manifest, open('./extension/manifest.json', 'w'), indent = 4)

print 'compiling version: %s' % manifest['version']

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

print(getcwd()+'/zipit')
system(getcwd()+'/zipit')

