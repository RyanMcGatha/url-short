from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from models import base, Links
from models.Links import Links, LinksSchema
from db import session

app = FastAPI()

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