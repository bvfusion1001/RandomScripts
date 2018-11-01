#!/usr/bin/env python3

import os
import xml.etree.ElementTree
import sys

# Accept a path from CLI argument
path = sys.argv[1]

ns = {'default': 'http://soap.sforce.com/2006/04/metadata'}

header = '||API Name||Label||Data Type||Use||LEDD||\n'

with open('fieldTable.txt', 'w+') as outputFile:
    outputFile.write(header)
    for root, dirs, files in os.walk(path):
        for filename in files:
            if (filename.endswith('.xml')):
                full_path = os.path.join(path, filename)
                print(full_path)
                root = xml.etree.ElementTree.parse(full_path).getroot()
                
                full_name = root.find('default:fullName', ns).text
                label = root.find('default:label', ns).text
                field_type = root.find('default:type', ns).text
                
                length_node = root.find('default:length', ns)
                if (length_node is not None):
                    field_type += ' (' + length_node.text + ')'

                row = '|' + full_name + '|' + label + '|' + field_type + '| | |\n'
                outputFile.write(row)
                
