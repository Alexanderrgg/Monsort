import bcrypt
password = "swampert"
hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
print(hash.decode("utf-8"))