#!/usr/bin/env python3

import sys
import json

def read_file(filename: str)->list:
    items = []
    with open(filename, mode='r', encoding = 'utf-8') as file:
        lines = [line.rstrip() for line in file.readlines()]
        for line in lines:
            (inf, imperf, hielp_perf, transl, usage_all) = line.split(';')
            (hielp, perf) = hielp_perf.split()
            usage = usage_all.split('.')
            items.append({
                "infinitief": inf.strip(),
                "translation": transl.strip(),
                "imperfectum": imperf.strip(),
                "hulpwerkwoord": hielp.strip(),
                "perfectum": perf.strip(),
                "usage": [usg.strip() for usg in usage]
            })
    return items

def print_items(items: list):
    print(json.dumps(items, indent=2))

def main():
    filename = sys.argv[1]
    items = read_file(filename)
    print_items(items)

if __name__ == '__main__':
    main()
