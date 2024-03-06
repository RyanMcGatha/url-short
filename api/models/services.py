from fastapi import HTTPException, status, Query
from models.users import User, UserSchema, UserAccountSchema

from db import session
from config import settings

def create_user(user: UserAccountSchema):
    db_user = User(**user.model_dump())
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def get_user(email: str):
    user = session.query(User).filter(User.email == email).first()
    return user