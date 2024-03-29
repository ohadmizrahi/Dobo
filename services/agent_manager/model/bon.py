from pydantic import BaseModel, Field, validator
from typing import List
from item import Item

class Bon(BaseModel):
    business_id: str = Field(..., min_length=1, max_length=12)
    table: str = Field(..., min_length=1, max_length=4)
    items: List[Item] = Field([], min_items=1)

    @validator("table")
    def table_must_be_digit(cls, v):
        if not v.isdigit():
            raise ValueError(f'table must be digit received {v}')
        return v
