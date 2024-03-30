from pydantic import BaseModel, Field
from typing import List

class Order(BaseModel):
    name: str = Field(..., min_length=1, max_length=10)
    changes: List[str] = Field([])
