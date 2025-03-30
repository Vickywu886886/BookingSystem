from app import app, db
from models.user import User

with app.app_context():
    print("\nAll users in database:")
    users = User.query.all()
    for user in users:
        print(f"User: {user.username}")
        print(f"Role: {user.role}")
        print(f"Status: {user.status}")
        print(f"Password hash: {user.password[:30]}...")
        print("-" * 50) 