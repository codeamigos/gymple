#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import subprocess

commands = [
    "rm -rf src/app/l10n.bak",
    "cp -r src/app/l10n src/app/l10n.bak",
    "rm -rf trans-tmp extracted-messages",
    "node_modules/.bin/tsc -p . --target ES6 --module es6 --jsx preserve --outDir trans-tmp",
    "node_modules/.bin/babel --plugins react-intl \"trans-tmp/**/*.jsx\"",
]

progress = ""

for command in commands:
    progress += "."
    sys.stdout.write('%s\r' % (progress)),
    sys.stdout.flush()

    proc = subprocess.Popen([ command ], stdout=subprocess.PIPE, shell=True, stderr=subprocess.STDOUT,)
    (out, err) = proc.communicate()

    if "SyntaxError:" in out:
        print "SyntaxError occured. Stopping operation.\n"
        print out
        sys.exit(1)
        break

subprocess.Popen([ "npm run manage:translations" ], shell=True).wait()

sys.exit(0)
