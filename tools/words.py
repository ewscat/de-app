#!/usr/bin/env python3

import argparse
import os
import json

def read_file(filename: str)->list:
    items = []
    with open(filename, mode='r', encoding='utf-8') as file:
        lines = [line.rstrip() for line in file.readlines()]
        for line in lines:
            (art_word, _, translation) = line.partition(';')
            (art, word) = art_word.split()
            items.append({
                "article": art,
                "word": word.replace('_', ' '),
                "translations": translation.replace(' ', '').split(',')
            })
    return items

def list_files(directory) -> list:
    return [os.path.join(directory, filename)
            for filename in os.listdir(directory)
            if os.path.isfile(os.path.join(directory, filename))]

def print_items(items: list):
    print(json.dumps(items, indent=2))

def list_meta(files: list)->list:
    topics = []
    for file in files:
        items = read_file(file)
        _, tail = os.path.split(file)
        name,_ = tail.split('.')
        topic,_,_ = name.partition('.')
        description = topic.replace('_', ' ').capitalize()
        topics.append({
            "topic": topic,
            "description": description,
            "count": len(items)
        })
    return topics

def write_file(directory: str, filename: str, content: dict):
    with open(os.path.join(directory, filename), 'w', encoding='utf-8') as outfile:
        print(f'Writing {filename}')
        outfile.write(json.dumps(content, indent=2))

def main():
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument('-d', '--directory', type=str,
                            help='Directory with files containing words',
                            default='data/words')
    arg_parser.add_argument('-m', '--meta', type=bool, help='Print meta info',
                            default=False, action=argparse.BooleanOptionalAction)
    arg_parser.add_argument('-p', '--print', type=bool, help='Print to stdout instead of file',
                            default=True, action=argparse.BooleanOptionalAction)
    arg_parser.add_argument('-o', '--output-directory', type=str, help='Directory for output files',
                            default='www/words')
    args = arg_parser.parse_args()

    directory = args.directory
    files = list_files(directory)
    if args.meta:
        topics = list_meta(files)
        if args.print:
            print_items(topics)
        else:
            write_file(args.output_directory, 'meta.json', topics)
        return

    for file in files:
        items = read_file(file)
        if args.print:
            print_items(items)
        else:
            _, tail = os.path.split(file)
            name,_ = tail.split('.')
            write_file(args.output_directory, f'{name}.json', items)

if __name__ == '__main__':
    main()
