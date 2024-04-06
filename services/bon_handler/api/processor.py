from abc import ABC, abstractmethod
import random

class Proccessor(ABC):

    @property
    @abstractmethod
    def target(self):
        pass

    @property
    @abstractmethod
    def type(self):
        pass

    @abstractmethod
    async def connect(self):
        pass

    @abstractmethod
    async def process(self, message):
        pass

    def __str__(self) -> str:
        return self.type

class PrintProcessor(Proccessor):
    def __init__(self, target) -> None:
        self._target = target

    @property
    def target(self):
        return self._target
    
    @property
    def type(self):
        return "Print"

    async def connect(self):
        print(f"Connecting to {self.target}...")
    
    async def process(self, message):
        print(f"Printing message: {message}")
        return True



class DisplayProcessor(Proccessor):
    def __init__(self, target) -> None:
        self._target = target

    @property
    def target(self):
        return self._target
    
    @property
    def type(self):
        return "Display"

    async def connect(self):
        print(f"Connecting to {self.target}...")
    
    async def process(self, message):
        print(f"Displaying message: {message}")