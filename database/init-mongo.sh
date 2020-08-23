#!/bin/bash
set -e

mongo <<EOF
use $MONGODB_INITDB_DATABASE

db.createUser({
    user: '$MONGODB_INITDB_ROOT_USERNAME',
    pwd: '$MONGODB_INITDB_ROOT_PASSWORD',
    roles: [
        {
            role: "readWrite",
            db: '$MONGODB_INITDB_DATABASE'
        }
    ]
})

db.users.insert({
    email: '$APP_INITDB_EMAIL',
    username: '$APP_INITDB_USERNAME',
    password: '$APP_INITDB_PASSWORD'
})
EOF