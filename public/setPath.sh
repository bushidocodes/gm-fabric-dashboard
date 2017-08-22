#!/bin/bash
# A script to configure GM Fabric Dashboard deployment options

# If parameter is undo, ask for confirmation and restore backup.
if [[ "$1" == "undo" ]]; then
    echo "It looks like you want to revert to a clean backup"
    read -p "Are you sure? " -n 1 -r
    echo    # (optional) move to a new line
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp -rf index.html.old index.html
    fi
    exit 1
fi

# Check for required parameters
[[ -z "$1" ]] && { echo "No runtime was entered." ; exit 1; }
[[ -z "$2" ]] && { echo "No service name was entered." ; exit 1; }
[[ -z "$3" ]] && { echo "No back URL was entered." ; exit 1; }
[[ -z "$4" ]] && { echo "No metrics URL was entered." ; exit 1; }

RUNTIME=$(printf "%q" "$1")
SERVICE_NAME=$(printf "%q" "$2")
BACK_BUTTON_URL=$(printf "%q" "$3")
METRICS_ENDPOINT=$(printf "%q" "$4")

[ -z "$5"  -a  "$RUNTIME" == "JVM" ] && { echo "No threads URL was entered." ; exit 1; }

THREADS_ENDPOINT=$(printf "%q" "$5")

  echo 'The following settings will be written to the index.html head'
  echo '============================================================='
  echo 'Runtime: ' "$RUNTIME"
  echo 'Service Name: ' "$SERVICE_NAME"
  echo 'Back Button URL: ' "$BACK_BUTTON_URL"
  echo 'Metrics Endpoint: ' "$METRICS_ENDPOINT"
  if [[ "$RUNTIME" == "JVM" ]]; then
      echo 'Threads Endpoint: ' "$THREADS_ENDPOINT"
  fi

read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ "$REPLY" =~ ^[Yy]$ ]]; then
    # If the backup doesn't exist, copy the index just in case
    if [[ -f './index.html.old' ]]; then
        echo 'Backup already detected.'
    else
        echo 'Backing up clean index.html'
        cp -rf index.html index.html.old
    fi
    # Filter the old index, writing to index.html
    cat index.html.old | sed -E 's%__RUNTIME__[/]?%'$RUNTIME'%g' | sed -E 's%__SERVICE_NAME__[/]?%'$SERVICE_NAME'%g' | sed -E 's%__BACK_BUTTON_URL__[/]?%'$BACK_BUTTON_URL'%g' | sed -E 's%__METRICS_ENDPOINT__[/]?%'$METRICS_ENDPOINT'%g' | sed -E 's%__THREADS_ENDPOINT__[/]?%'$THREADS_ENDPOINT'%g' >index.html
fi
