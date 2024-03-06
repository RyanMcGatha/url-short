from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from models import base, Links, services
from models.Links import Links, LinksSchema
from db import session, engine
from models.base import Base
from models.users import User, UserSchema, UserAccountSchema
from models.services import create_user, get_user
from config import settings

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
    link = Links(title=link_data.title, long_url=link_data.long_url, short_url=link_data.short_url, user_id=link_data.user_id)
    
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
      user:  User = get_user(email=payload.email)

    except:
        raise HTTPException(status_code=404, detail="User not found")
    
    is_validated: bool = user.validate_password(payload.hashed_password)
    
    if not is_validated:
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    return {"message": "Logged in successfully"}



