from models.base import declarative_base, BaseModel, Base


from sqlalchemy import Column, Integer, String



class Links(Base):
    __tablename__ = "links"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    long_url = Column(String)


class LinksSchema(BaseModel):
    title: str
    long_url: str

    class Config:
        populate_by_name = True