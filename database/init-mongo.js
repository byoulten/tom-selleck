db.auth('admin', 'password')

db = db.getSiblingDB('tom-selleck')

db.createUser({
    user: "admin",
    pwd: "password",
    roles: [
        {
            role: "readWrite",
            db: "tom-selleck"
        }
    ]
})