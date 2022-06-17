#!/usr/bin/env python3

import sys
import json
from typing import List

def read_file(filename: str)->List:
    items = []
    with open(filename, mode='r', encoding = 'utf-8') as file:
        lines = [line.rstrip() for line in file.readlines()]
        for line in lines:
            (art, word) = line.split()
            items.append({
                "article": art,
                "word": word
            })
    return items

def print_items(items: List):
    print(json.dumps(items, indent=2))

def main():
    filename = sys.argv[1]
    items = read_file(filename)
    if len(sys.argv)>2 and sys.argv[2] == '--count':
        print(len(items))
    else:
        print_items(items)

if __name__ == '__main__':
    main()
