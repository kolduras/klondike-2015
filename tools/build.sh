#!/bin/bash

PATSUB_REPLACE=$(shopt | grep patsub_replacement);

if [ -n "$PATSUB_REPLACE" ]
then 
    shopt -u patsub_replacement
fi

if [ ! -f "$1" ]
then
    echo "Source file $1 does not exists"
    exit
fi

if [ -d "$2" ]
then
    rm -fr $2/*
else
    mkdir $2
fi

SOURCE_DIR="$(dirname $1)"
SOURCE_NAME=${1#$SOURCE_DIR/}
EXT=${SOURCE_NAME##*.}
SOURCE_NAME=${SOURCE_NAME%.*}


TARGET_MIN=$2/$SOURCE_NAME-min.$EXT

./tools/minify.sh --in=$1 --out=$TARGET_MIN

TARGET_CODE=$(<$TARGET_MIN);
TARGET_SHIM=$(<$SOURCE_DIR/shim.html);

echo "${TARGET_SHIM//__SCRIPT__/$TARGET_CODE}" > $2/$SOURCE_NAME.html

rm $TARGET_MIN;
