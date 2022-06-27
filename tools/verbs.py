#!/usr/bin/env python3

import sys
import json
from typing import List

def read_file(filename: str)->List:
    items = []
    with open(filename, mode='r', encoding = 'utf-8') as file:
        lines = [line.rstrip() for line in file.readlines()]
        for line in lines:
            (inf, imperf_sing, imperf_pl, perf, hielp, to, transl) = line.split()
            items.append({
                "infinitief": inf,
                "translation": f'{to} {transl}',
                "imperfectum": f'{imperf_sing},{imperf_pl}',
                "hulpwerkwoord": hielp.replace('hebben', 'heeft').replace('zijn', 'is'),
                "perfectum": perf
            })
    return items

def print_items(items: List):
    print(json.dumps(items, indent=2))

def main():
    filename = sys.argv[1]
    items = read_file(filename)
    print_items(items)

if __name__ == '__main__':
    main()
