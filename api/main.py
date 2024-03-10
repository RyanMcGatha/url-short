from fastapi import FastAPI, HTTPException, status, Depends, Query
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta

from db import session, engine
from config import settings

from models.base import Base
from models.Links import Links, LinksSchema
from models.users import User, UserSchema, UserAccountSchema
from models.tokens import Token, TokenData, create_access_token
from models.services import create_user, get_user, get_current_user_token
from models.tokens import Token, BlacklistedToken, create_access_token

import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")



def create_tables():
    Base.metadata.create_all(bind=engine)

def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    create_tables()
    return app


app = start_application()



origins = [
    "http://localhost",
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "Root Route"}


@app.post("/links/create")
async def create_link(link_data: LinksSchema):
    link = Links(**link_data.model_dump())
    
    session.add(link)
    session.commit()
    
    return {"message": "new link created"}


@app.get("/links/read/all")
async def read_all():
    links = session.query(Links)
    return links.all()


@app.get("/links/read/{title}")
async def read_title(link_title: str):
    link = session.query(Links).filter(link_title==Links.title)


    return link.one()


@app.put("/links/{title}/update")
async def update_link(link_data: LinksSchema):
    new_data = session.query(Links).filter(Links.title==link_data.title).first()
    if new_data is not None:
        if link_data.long_url:
            new_data.long_url = link_data.long_url
        if link_data.short_url:
            new_data.short_url = link_data.short_url
        if link_data.user_id:
            new_data.user_id = link_data.user_id
        session.add(new_data)
        session.commit()
        return {"Updated Link": link_data.title}
    else:
        return {"message": "Link Updated"}
    


@app.delete("/links/{title}/delete")
async def delete_link(link_title: str):
    link = session.query(Links).filter(Links.title == link_title).first()
    if link is not None:
        session.delete(link)
        session.commit()
        return {"Deleted Link": link_title}
    else:
        return {"message": "Link not found"}
    


@app.post("/register", response_model=UserSchema)
def register(payload: UserAccountSchema): 
    payload.hashed_password = User.hash_password(payload.hashed_password)
    return create_user(user=payload)





@app.post("/login")
async def login(payload: UserAccountSchema):
    try:
      user:  User = get_user(user_name=payload.user_name)

    except:
        raise HTTPException(status_code=404, detail="User not found")
    
    is_validated: bool = user.validate_password(payload.hashed_password)
    
    if not is_validated:
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    
    access_token_expires = timedelta(minutes=120)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")




@app.get('/logout', status_code=200)
def logout(token: Token = Depends(oauth2_scheme)):
    try:
        token = BlacklistedToken(token=token)
        session.add(token)
        session.commit()
    except IntegrityError as e:
        raise settings.CREDENTIALS_EXCEPTION
    return {"details:": "Logged out"}


@app.get('/getUser', status_code=200)
async def get_user_id(current_user: str = Depends(get_current_user_token)):
    return {"email": current_user.email, "id": current_user.id}
