#!/bin/bash
# A script to set the template string __BASE_URL__

# Capture path of JS Bundle
pattern="static/js/main.*.js"
JS_BUNDLE=( $pattern )
echo $JS_BUNDLE

# If parameter is undo, ask for confirmation and restore backup.
if [ "$1" == "undo" ]; then
    echo "It looks like you want to revert to a clean backup"
    read -p "Are you sure? " -n 1 -r
    echo    # (optional) move to a new line
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp -rf index.html.old index.html
        cp -rf $JS_BUNDLE.old $JS_BUNDLE
    fi
    exit 1
fi

# Check for required parameters
RUNTIME=$(printf "%q" "$1")

[[ -z "$1" ]] && { echo "No runtime was entered." ; exit 1; }
[[ -z "$2" ]] && { echo "No service name was entered." ; exit 1; }
[[ -z "$3" ]] && { echo "No back URL was entered." ; exit 1; }
[[ -z "$4" ]] && { echo "No metrics URL was entered." ; exit 1; }
# Check for threadsURL if runtime if JVM
[[ "$1" == "JVM" ]  && [ -z "$5" ]] && { echo "No threads URL was entered." ; exit 1; }

echo "{$1}"
  echo 'It looks like you want to deploy the dashboard to' $BASEURL
  echo 'The app uses a RegExp to replace /gmadmin/ with the following:'
  echo 'For JVM, /admin/metrics.json and /admin/threads'
  echo 'For Golang, /admin/metrics'

read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # If the backup doesn't exist, copy the index just in case
    if [ -f './index.html.old' ]; then
        echo 'Backup already detected.'
    else
        echo 'Backing up clean index.html'
        cp -rf index.html index.html.old
        cp -rf $JS_BUNDLE $JS_BUNDLE.old
    fi
    # Filter the old index, writing to index.html
    echo 'Changing __BASE_URL__ to' $BASEURL
    cat index.html.old | sed -E 's%__BASE_URL__[/]?%'$BASEURL'%g' >index.html
    cat $JS_BUNDLE.old | sed -E 's%__BASE_URL__[/]?%'$BASEURL'%g' >$JS_BUNDLE
fi
